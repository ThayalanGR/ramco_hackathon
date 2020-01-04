const express = require('express')
const app = express()
const passport = require('passport')
const fbStrategy = require('passport-facebook').Strategy
const config = require('config')

app.use(passport.initialize())

passport.use(new fbStrategy({
    clientID: config.get("facebook").clientId,
    clientSecret: config.get("facebook").clientSecret,
    callbackURL: config.get("facebook").callbackURL,
    profileFields: ['id', 'emails','displayName', 'photos', 'name']
},
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    }
))

app.get("/auth/facebook", passport.authenticate("facebook",{ scope : ['email'] }));

app.get("/auth/facebook/callback", passport.authenticate("facebook", {session: false}), (req, res)=>{

})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Server started"));