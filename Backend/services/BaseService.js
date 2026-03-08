class BaseService {
  constructor(model) {
    this.model = model;
  }

  _active = (condition = {}) => ({ ...condition, isDeleted: { $ne: true } });

  _buildTree = async (nodes, parentField) =>
    Promise.all(
      nodes.map(async (node) => {
        const children = await this.model.find(
          this._active({ [parentField]: node._id }),
        );

        return {
          ...node.toObject(),
          child: children.length
            ? await this._buildTree(children, parentField)
            : [],
        };
      }),
    );

  findAll = async (condition = {}) => this.model.find(this._active(condition));

  findAllWithSort = async (condition = {}, sort = {}) =>
    this.model.find(this._active(condition)).sort(sort);

  findAllRecursive = async (parentField) => {
    const parent = await this.model.find(this._active({ [parentField]: null }));
    return this._buildTree(parent, parentField);
  };

  findAllRecursiveByCondition = async (condition, parentField) => {
    try {
      const parent = await this.model.find(this._active(condition));
      return this._buildTree(parent, parentField);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  findAllDeleted = async () => this.model.find({ isDeleted: true });

  findAllWithPagination = async (condition, { page = 1, limit = 10, sort }) => {
    const data = await this.model.find(this._active(condition)).sort(sort);
    const total = data.length;
    const pages = Math.ceil(total / limit);
    return {
      data: data.slice((page - 1) * limit, page * limit),
      metaData: { pages, total, currentPage: page },
    };
  };

  findAllAndPopulate = async (condition, populate) =>
    this.model.find(this._active(condition)).populate(populate);

  findById = async (id) => this.model.findById(id);

  findByIdPopulate = async (id, populate) =>
    this.model.findById(id).populate(populate);

  findOneByCondition = async (condition) =>
    this.model.findOne(this._active(condition));

  findOneByConditionAndPopulate = async (condition, populate) =>
    this.model.findOne(this._active(condition)).populate(populate);

  hardDelete = async (condition) => this.model.findOneAndDelete(condition);

  softDelete = async (condition, user) =>
    this.model.findOneAndUpdate(
      condition,
      { isDeleted: true, deletedBy: user },
      { new: true },
    );

  softDeleteRecursive = async (parentField, condition, user) => {
    try {
      const parent = await this.model.findOneAndUpdate(
        condition,
        { isDeleted: true, deletedBy: user },
        { new: true },
      );

      const getChildren = async (parentId) => {
        const children = await this.model.find({ [parentField]: parentId });
        return Promise.all(
          children.map(async (child) => {
            await this.model.findByIdAndUpdate(child._id, {
              isDeleted: true,
              deletedBy: user,
            });

            return {
              ...child.toObject(),
              child: await getChildren(child._id),
            };
          }),
        );
      };

      return getChildren(parent._id);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  hardDeleteMany = async (condition) => this.model.deleteMany(condition);

  update = async (condition, data, returnNew = true) =>
    this.model.findOneAndUpdate(condition, data, {
      new: returnNew,
      runValidators: true,
    });

  updateBySoftDelete = async (condition, data, req) => {
    await this.model.findOneAndUpdate(condition, {
      isDeleted: true,
      deletedBy: req.admin?.userName,
    });
    return this.createObject(data);
  };

  updateAll = async (condition, data) => this.model.updateMany(condition, data);

  restoreSoftDelete = async (condition) =>
    this.model.findOneAndUpdate(
      condition,
      { isDeleted: false, deletedBy: "" },
      { new: true },
    );

  createObject = async (data) => new this.model(data).save();
}

module.exports = BaseService;
