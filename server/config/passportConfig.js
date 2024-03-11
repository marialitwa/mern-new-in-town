import { ExtractJwt, Strategy as JwtStrategy} from "passport-jwt"
import UserModel from "../models/userModel.js";
import "dotenv/config";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET_KEY,
    // secretOrKey corresponding to variable secretOrPrivateKey inside tokenOperations.js in utils folder
};

const jwtStrategy = new JwtStrategy(options, async function (
    
    jwt_payload,
    done
  ) {
    try {
    
      const user = await UserModel.findOne({ _id: jwt_payload.sub });
      console.log("User", user);
      
      if (!user) {
        console.log("Token invalid");
        return done(null, false);
      }

      if (user) {
        console.log("User found");
        return done(null, user);
      }

    } catch (error) {
      console.log("Something bad happened");
      return done(error, false);
    }
  });
  
  export default jwtStrategy;