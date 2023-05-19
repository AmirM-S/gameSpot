
module.exports = function(req, res, next) {
    if (req.user && req.user.isAdmin) {
        req.admin = true
    } else {
        req.admin = false
    }
    next();
};