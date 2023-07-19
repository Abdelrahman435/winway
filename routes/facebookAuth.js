const router = require("express").Router();
const passport = require('passport');

router.get('/', passport.authenticate('facebook', {
    successRedirect: "/signup/facebook",
    failureRedirect: "/login/failed",
})
);

router.get("/login/failed", (req,res)=>{
    res.status(401).json({
        error: true,
        message: "log in failure",
    })
});


module.exports = router;