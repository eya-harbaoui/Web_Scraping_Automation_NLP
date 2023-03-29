const GoogleStrategy = require("passport-google-oauth20").Strategy;
//passport-google-0auth20 module is a passport strategy for authenticating with google
//Googlestrategy constructor in passport-google-0auth20 is a module who takes a config object with information about the Google app you are using for authentication, including a client ID and client secret
//After the user enters their credentials and grants permission for your app to access their account, Google will redirect them back to your app with an authorization code.
//Your app can then exchange this code for an access token, which can be used to retrieve information about the user's Google account. Passport handles this process for you, making it easy to integrate Google authentication into your Node.js app.
const passport = require("passport");

passport.use(
    new GoogleStrategy({
            clientID: process.env.clientID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        function(accessToken, refreshToken, profile, callback) {
            callback(null, profile);
        }
    )
);
//we are using cookies so we need to serialize and desirialize user

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
/*why ?:because
serialize and deserialize are used to store and retrieve user info in the session
serialize =When a user logs in, their user object is typically too large to be stored directly in the session. Instead, passport.serializeUser() is used to extract a unique identifier from the user object and store it in the session.
passport.deserializeUser()= is used to retrieve the user's information from the session based on the unique identifier stored by passport.serializeUser().
Without these functions, Passport would need to store the entire user object in the session, which would be less efficient and less secure.*/