const BaseService = require("./BaseService");
const { PortfolioProfile } = require("../models");

const DEFAULT_PROFILE_IMAGE =
  "https://avatars.githubusercontent.com/u/218600127?v=4";

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
    headerBannerText: profile.headerBannerText,
    headerAvailabilityText: profile.headerAvailabilityText,
    headerContactCtaLabel: profile.headerContactCtaLabel,
    availabilityText: profile.availabilityText,
    currentFocus: profile.currentFocus,
    homeEyebrow: profile.homeEyebrow,
    homeTitle: profile.homeTitle,
    homeDescription: profile.homeDescription,
    homeAvailabilityNote: profile.homeAvailabilityNote,
    homeSupportText: profile.homeSupportText,
    homeFeaturedTitle: profile.homeFeaturedTitle,
    homeFeaturedDescription: profile.homeFeaturedDescription,
    homeStrengthsTitle: profile.homeStrengthsTitle,
    homeStrengthsText: profile.homeStrengthsText,
    homeNextStepTitle: profile.homeNextStepTitle,
    homeNextStepText: profile.homeNextStepText,
    homeSectionEyebrow: profile.homeSectionEyebrow,
    homeSectionTitle: profile.homeSectionTitle,
    homeSectionDescription: profile.homeSectionDescription,
    homeSectionItems: profile.homeSectionItems || [],
    homeInfoCards: profile.homeInfoCards || [],
    homeWorkflowTitle: profile.homeWorkflowTitle,
    homeWorkflowDescription: profile.homeWorkflowDescription,
    homeStatusTitle: profile.homeStatusTitle,
    homeStatusDescription: profile.homeStatusDescription,
    location: profile.location,
    address: profile.address,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
    portfolioUrl: profile.portfolioUrl,
    primaryStack: profile.primaryStack,
    openToWork: profile.openToWork,
    portraitImage: DEFAULT_PROFILE_IMAGE,
    logoImage: DEFAULT_PROFILE_IMAGE,
    heroSkills: profile.heroSkills || [],
    spokenLanguages: profile.spokenLanguages || [],
    socialLinks: profile.socialLinks || [],
    highlights: profile.highlights || [],
    aboutCards: profile.aboutCards || [],
    aboutParagraphs: profile.aboutParagraphs || [],
    aboutIntroTitle: profile.aboutIntroTitle,
    aboutIntroDescription: profile.aboutIntroDescription,
    aboutSectionTitle: profile.aboutSectionTitle,
    aboutProcessEyebrow: profile.aboutProcessEyebrow,
    aboutProcessTitle: profile.aboutProcessTitle,
    aboutProcessDescription: profile.aboutProcessDescription,
    navigationLinks: profile.navigationLinks || [],
    footerText: profile.footerText,
    homePrimaryCtaLabel: profile.homePrimaryCtaLabel,
    homePrimaryCtaUrl: profile.homePrimaryCtaUrl,
    homeSecondaryCtaLabel: profile.homeSecondaryCtaLabel,
    homeSecondaryCtaUrl: profile.homeSecondaryCtaUrl,
    contactIntroEyebrow: profile.contactIntroEyebrow,
    contactIntroTitle: profile.contactIntroTitle,
    contactIntroDescription: profile.contactIntroDescription,
    contactFormTitle: profile.contactFormTitle,
    contactPanelTitle: profile.contactPanelTitle,
    contactPanelDescription: profile.contactPanelDescription,
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
