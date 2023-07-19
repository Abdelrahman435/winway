const passport = require('passport');

async function success (req,res){
    if(req.user){
        await res.status(200).json({
            error: false,
            message: "successfully loged in",
            user: req.user,
        });
    }else{
        await res.status(403).json({error: true, message: "not authed"});
    }
}

async function fail (req,res){
    await res.status(401).json({
        error: true,
        message: "log in failure",
    })
}

async function callback(){
    await passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
    })
}

async function auth(){
    await passport.authenticate("google", ["profile", "email"])
}

async function logout(){
    async (req,res)=>{
        await req.logout();
        await res.redirect(process.env.CLIENT_URL);
    }
}


module.exports = {success, fail, callback, auth, logout};