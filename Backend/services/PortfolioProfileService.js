const BaseService = require("./BaseService");
const { PortfolioProfile } = require("../models");

class PortfolioProfileService extends BaseService {
  constructor() {
    super(PortfolioProfile);
  }

  _serializeProfile = (profile) => ({
    id: String(profile._id),
    fullName: profile.fullName,
    jobTitle: profile.jobTitle,
    headline: profile.headline,
    shortBio: profile.shortBio,
    longBio: profile.longBio,
    heroBadge: profile.heroBadge,
    availabilityText: profile.availabilityText,
    currentFocus: profile.currentFocus,
    location: profile.location,
    address: profile.address,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
    portfolioUrl: profile.portfolioUrl,
    primaryStack: profile.primaryStack,
    openToWork: profile.openToWork,
    portraitImage: profile.portraitImage,
    logoImage: profile.logoImage,
    heroSkills: profile.heroSkills || [],
    spokenLanguages: profile.spokenLanguages || [],
    socialLinks: profile.socialLinks || [],
    highlights: profile.highlights || [],
    aboutCards: profile.aboutCards || [],
    aboutParagraphs: profile.aboutParagraphs || [],
    navigationLinks: profile.navigationLinks || [],
    footerText: profile.footerText,
    homePrimaryCtaLabel: profile.homePrimaryCtaLabel,
    homePrimaryCtaUrl: profile.homePrimaryCtaUrl,
    homeSecondaryCtaLabel: profile.homeSecondaryCtaLabel,
    homeSecondaryCtaUrl: profile.homeSecondaryCtaUrl,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  });

  listProfiles = async () => {
    const profiles = await this.model
      .find(this._active({}))
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    return profiles.map(this._serializeProfile);
  };

  getPublicProfile = async () => {
    const profile = await this.model
      .findOne(this._active({}))
      .sort({ updatedAt: -1, createdAt: -1 })
      .lean();

    return profile ? this._serializeProfile(profile) : null;
  };

  getProfileById = async (id) => {
    const profile = await this.model.findOne(this._active({ _id: id })).lean();
    return profile ? this._serializeProfile(profile) : null;
  };

  createProfile = async (payload) => {
    const profile = await this.createObject(payload);
    return this._serializeProfile(profile.toObject());
  };

  updateProfileById = async (id, payload) => {
    const profile = await this.update(this._active({ _id: id }), payload);
    return profile ? this._serializeProfile(profile.toObject()) : null;
  };

  deleteProfileById = async (id) => {
    const profile = await this.softDelete({ _id: id }, "system");
    return profile ? this._serializeProfile(profile.toObject()) : null;
  };
}

module.exports = new PortfolioProfileService();
