// © 2026 Omid Teimory. All rights reserved.
// Signature: OmidTeimory-2026
const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);

module.exports = asyncHandler;
