import UserModel from "../models/userModel.js";
import { encryptPassword, verifyPassword } from "../utils/passwordOperations.js";
import { generateToken } from "../utils/tokenOperations.js";

const test = (request, response) => {
  response.send("testing successful");
};
// function test(request, response) {
//     response.send("testing successful")
// }

const getAllUsers = async (request, response) => {
  try {
    //Find all users and return only the "email" of the users object in my frontend
    // const allUsers = await UserModel.find({}).select("email");
    // Alternative: Find all users and return everything of my object except "-password"
    const allUsers = await UserModel.find({}).select("-password").populate({ path: "created_cards"});

    response.status(200).json(allUsers);
    // alternativ:
    // response.status(200).json({
    //     status: "Successful",
    //     number: allUsers.length,
    //     users: allUsers
    // });
  } catch (error) {
    // console.error will be displayed only in the backend terminal
    console.error("Error", error);
    // response needed to see error also in Frontend
    response.status(500).json({ error: "Server error" });
  }
};

const findUserByEmail = async (request, response) => {
  console.log(request.params);
  // params gibt die Parameter raus, die in der URL der HTTP-Anfrage enthalten sind.
  // In diesem Fall email, was in ich userRoutes festlege => userRouter.get("/find/:email", findUserByEmail);
  try {
    const foundUser = await UserModel.findOne({
      email: request.params.email,
    }).select("-password");
    // .select("-password") => when you send back the response do not include password

    if (!foundUser) {
      return response.status(404).json({ error: "No user found" });
    }
    response.status(200).json(foundUser);
  } catch (error) {
    console.error("Error", error);
    response.status(500).json({ error: "Server error" });
  }
};


// FUNCTION TO REGISTER A NEW USER =======================

async function signup(request, response) {
  // Before writing the function logic I can test it with response.send("string") in Postman
  // response.send("testing")
  // console.log(request.body);

  // TODO Express Validator: Package to validate forms in the backend. Research Validation Chain.
  // Example: 
  // app.post(
  //   '/newsletter',
  //   // For the `email` field in `req.body`...
  //   body('email')
  //     // ...mark the field as optional
  //     .optional()
  //     // ...and when it's present, trim its value, then validate it as an email address
  //     .trim()
  //     .isEmail(),
  //   maybeSubscribeToNewsletter,
  // );

  
  const { email, password, username } = request.body;

  // Here I can validate separated/individually for email and password to display a specifique message
  if (!email || !password)
    return response.status(400).json({ error: "All fields must be included" });

  try {

    // If all credentioals are provided we check if user is already in database
    const registeredUser = await UserModel.findOne({ email: email })
    console.log("registered User", registeredUser)

    // User respectively email already exists
    if (registeredUser) {
      response.status(400).json({ error: "Email already registered." });
    }

    // No user with same email exists in our database:
    if (!registeredUser) {

      // encrypt password
      try {
        const hashedPassword = await encryptPassword(password);

        if (!hashedPassword) {
          response.status(500).json({ message: "Problem encoding password"})
        }

        // Create new User
        if (hashedPassword) {
          const newUser = await UserModel.create({ 
            email: email, 
            password: hashedPassword, 
            username: username 
          });

      // Here I can send whatever I need to my frontend
      if (newUser) {
        response.status(201).json({
          message: "Valid user registration",
          user: {
            username: newUser.username,
            email: newUser.email,
          }
        });

      } else {
        response.status(400).json({error: "User could not be created" })
      }
        }
      } catch (error) {
        console.log("Error", error)
      }
    }

  } catch (error) {
    console.error(error);
    // response.status(500).json({ error: error.message })
    if (error.code === 11000)
      response.status(400).json({ error: "Email already registered." });
    response.status(500).json({ error: "Something went wrong" });
  }
};

async function login(request, response) {

console.log('Request Body', request.body)
  // 1. Check that required fields are coming in the request.body
  if (!request.body.password || !request.body.email ) {
    // console.log("No credentials")
    response.status(500).json({ 
        message: "Required fields for email and/or password are missing", 
        error: true, 
        data: null
      });
        return 

  }
  // Test clg with Postman sending email and password
  // console.log("Credentials", request.body)

  // 2. Check if any user with the same email exists in the database
  try {
    const existingUser = await UserModel.findOne({ email: request.body.email })
    // Test clg with Postman sending email and password
    console.log('existingUser', existingUser)

    // Option 2.A: There is no user in our database:
    if (!existingUser) {
      response.status(500).json({ 
        message: "User is not registered", 
        error: true, 
        data: null
      })
    }

    // Option 2.B: Email exists in the database:
    if (existingUser) {
      // 2.B.1: Verify Password:
      const isPasswordCorrect = await verifyPassword(request.body.password, existingUser.password)

      // Option 2.C.1: Passwords do not match
    if (!isPasswordCorrect) {
      response.status(500).json({
        message: "Wrong password. Please try again", 
        error: true, 
        data: null
      })
    }
    // Option 2.C.2: Passwords DO match
    if (isPasswordCorrect) {

      // D: Generate token
      const token = generateToken(existingUser._id)

      // D.1. : Token is NOT generated:
      if (!token) {
        response.status(500).json({ 
          message: "Something went wrong generating the token.",
          error: true,
          data: null,
        })
      }

      // D.2. : Token is generated
      if (token) {

        // sending these infos from backend to frontend
        const user = {
          username: existingUser.username,
          email: existingUser.email,
          // userimage: existingUser.userimage,
          created_cards: existingUser.created_cards
        };

        response.status(200).json({ 
          message: "User successfully logged in",
          error: false,
          data: {
            user: user,
            token
          }
        })
      }
    }
    }

  } catch (error) {
    console.log('ERROR', error)
    response.status(500).json({
      message: "Something went wrong",
      error: true,
      data: null,
    })
      
    } 
  }

export { test, getAllUsers, findUserByEmail, signup, login };
