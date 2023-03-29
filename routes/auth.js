const router = require("express").Router();
const passport = require("passport");
//creating failure route case of Sucess Redirect
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,

        })
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});
//creating failure route case of failure Redirect

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        //In this case, the callback function sets the HTTP status code to 401 (Unauthorized) and sends a JSON response with an error message.
        error: true,
        message: "Log in Failure",
    });
});

router.get(
    "/google/callback",
    passport.authenticate("google", {
        sucessRedirect: process.env.CLEINT_URL,
        failureRedirect: "/login/failed",
        //path redirection in 2 cases 
    })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router;