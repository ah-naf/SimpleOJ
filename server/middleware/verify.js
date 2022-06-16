module.exports = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  else return res.status(403).json("You are not authenticated");
};
