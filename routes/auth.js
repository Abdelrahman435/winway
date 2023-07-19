const router = require("express").Router();
const passport = require('passport');

router.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error: false,
            message: "successfully loged in",
            user: req.user,
        });
    }else{
        res.status(403).json({error: true, message: "not authed"});
    }
});


router.get("/login/failed", (req,res)=>{
    res.status(401).json({
        error: true,
        message: "log in failure",
    })
});


router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/signup/gmail",
        failureRedirect: "/login/failed",
    })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

module.exports = router