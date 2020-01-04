import passport from "passport";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { Strategy as fbStrategy } from "passport-facebook";
import config from "config";

passport.use(
	new fbStrategy(
		{
			clientID: config.get("facebook").clientId,
			clientSecret: config.get("facebook").clientSecret,
			callbackURL: config.get("facebook").callbackURL,
			profileFields: ["id", "emails", "displayName", "photos", "name"],
		},
		(accessToken, refreshToken, profile, done) => {
			const email = profile["_json"].email;
			const name = profile["_json"].name;
			return done(null, { email, name });
		},
	),
);

passport.use(
	new googleStrategy(
		{
			callbackURL: "/auth/google/callback",
			clientID: config.get("google").clientId,
			clientSecret: config.get("google").clientSecret,
		},
		async (accessToken, refreshToken, profile, done) => {
			const email = profile["_json"].email;
			const name = profile["_json"].name;
			return done(null, { email, name });
		},
	),
);
