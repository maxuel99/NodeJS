import passport from "passport";
import passportGithu2 from 'passport-github2';
import { request, RequestHandler } from "express";

import config from "../../config";

const githubStategy = new passportGithu2.Strategy(
    {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        callbackURL: config.GITHUB_CALLBACK_URL,
    },
    function (
        accessToken: string,
        refreshToken: string,
        profile: { [key: string]: string; },
        done: (error: null, user: Express.User) => void
    ) {
        const user: Express.User = {
            username: profile.username,
        };

        done(null, user);
    }
);

passport.use(githubStategy);

passport.serializeUser<Express.User>((user, done) => done(null, user));

passport.deserializeUser<Express.User>((user, done) => done(null, user));

const checkAuthorization: RequestHandler = (
    request,
    response,
    next
) => {
    if (request.isAuthenticated()) {
        return next();
    }

    response.status(401).end();
}

export { passport, checkAuthorization };