const rateLimit = require('express-rate-limit');

const likesAndDislikesLimit = rateLimit({
  windowMs: 168 * 60 * 60 * 1000,
  max: 1,
  message: { message: 'You already rated this item.' },
  keyGenerator(req /* , res */) {
    return `${req.ip}-${req.body.id}`;
  },
});
exports.likesAndDislikesLimit = likesAndDislikesLimit;
