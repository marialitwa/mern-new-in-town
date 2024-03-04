import jwt from "jsonwebtoken";

function generateToken(userId) {

    // Inside payload we include "REGISTERED" claims only short version, such as "sub", "iss"
    const payload = {
        sub: userId
    }

    // secretOrPrivateKey is our own password needed to generate and later to validate the token
    // NOTE Hide tha password inside an .env variable! Make it a complicated one!
    // TODO Create .env password!
    const secretOrPrivateKey = "mySuperSecretPassword"

    // In signOptions we can include the "longer version of private claims" and other custom claims
    const signOptions = {
        expiresIn: "2 days"
    }

    const jsonWebToken = jwt.sign(payload, secretOrPrivateKey, signOptions)

    return jsonWebToken;
}

export { generateToken };