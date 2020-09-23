const rateLimit = require('express-rate-limit');

const likesAndDislikesLimit = rateLimit({
  windowMs: 168 * 60 * 60 * 1000,
  max: 2,
  message: { message: 'You already rated this item.' },
});
exports.likesAndDislikesLimit = likesAndDislikesLimit;
