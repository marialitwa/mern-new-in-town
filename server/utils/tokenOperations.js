import jwt from "jsonwebtoken";
import "dotenv/config";


function generateToken(userId) {

    // Inside payload we include "REGISTERED" claims only short version, such as "sub", "iss"
    const payload = {
        sub: userId
    }

    // secretOrPrivateKey is our own password needed to generate and later to validate the token
    // NOTE Hide tha password inside an .env variable! Make it a complicated one!
    // TODO Create .env password!
    // const secretOrPrivateKey = "mySuperSecretPassword"
    const secretOrPrivateKey = process.env.TOKEN_SECRET_KEY;
    console.log(secretOrPrivateKey);



    // In signOptions we can include the "longer version of private claims" and other custom claims
    const signOptions = {
        expiresIn: "2 days"
    }

    const jsonWebToken = jwt.sign(payload, secretOrPrivateKey, signOptions)

    return jsonWebToken;
}

export { generateToken };