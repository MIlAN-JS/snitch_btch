import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import passport from "passport"
import config from "./config"

passport.use(new GoogleStrategy({
    clientID : config.GOOGle_CLIENT_ID,
    clientSecret : config.GOOGLE_CLIENT_SECRET,
    callbackURL : config.GOOGLE_CALLBACK_URL
},

async (accessToken, refreshToken, profile, done) => {
  try {

   
 

   return done(null, profile);

  } catch (error) {
    done(error, null);
  }
}

))



export default passport