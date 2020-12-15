let Strategy = require('passport-jwt').Strategy;

let User = require('../models/ModelUser');

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['Authorization'];
    }
    return token;
};

opts = {}
opts.secretOrKey = 'verySecretKey';
opts.jwtFromRequest = cookieExtractor;

module.exports = (passport) => {
    passport.use(
        new Strategy(opts, async(payload, done) => {
            try {
                let user = await User.findOne({ 'username': payload.username });
                if (user) {
                    user.DateOfRegistration = user.DateOfRegistration.toLocaleDateString();
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (e) {
                console.log(e);
            }
        })
    );
}