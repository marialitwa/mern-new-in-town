import { isValidObjectId } from "mongoose";
import UserModel from "../models/userModel.js";
import {
  encryptPassword,
  verifyPassword,
} from "../utils/passwordOperations.js";
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
    const allUsers = await UserModel.find({})
      .select("-password")
      .populate({ path: "created_cards" });

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

  const { email, password, userName } = request.body;
  console.log('request.body', request.body)

  // Here I can validate separated/individually for email and password to display a specifique message
  if (!email || !password)
    return response.status(400).json({ error: "All fields must be included" });

  try {
    // If all credentials are provided we check if user is already in database
    const registeredUser = await UserModel.findOne({ email: email });
    console.log("registered User", registeredUser);

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
          response.status(500).json({ message: "Problem encoding password" });
        }

        // Create new User
        if (hashedPassword) {
          const newUser = await UserModel.create({
            email: email,
            password: hashedPassword,
            userName: userName,
          });

          // Here I can send whatever I need to my frontend
          if (newUser) {
            response.status(201).json({
              message: "Valid user registration",
              user: {
                userName: newUser.userName,
                email: newUser.email,
              },
            });
          } else {
            response.status(400).json({ error: "User could not be created" });
          }
        }
      } catch (error) {
        console.log("Error", error);
      }
    }
  } catch (error) {
    console.error(error);
    // response.status(500).json({ error: error.message })
    if (error.code === 11000)
      response.status(400).json({ error: "Email already registered." });
    response.status(500).json({ error: "Something went wrong" });
  }
}

async function login(request, response) {
  console.log("Request Body", request.body);
  // 1. Check that required fields are coming in the request.body
  if (!request.body.password || !request.body.email) {
    // console.log("No credentials")
    response.status(500).json({
      message: "Required fields for email and/or password are missing",
      error: true,
      data: null,
    });
    return;
  }
  // Test clg with Postman sending email and password
  // console.log("Credentials", request.body)

  // 2. Check if any user with the same email exists in the database
  try {
    const existingUser = await UserModel.findOne({ email: request.body.email });
    // Test clg with Postman sending email and password
    console.log("existingUser", existingUser);

    // Option 2.A: There is no user in our database:
    if (!existingUser) {
      response.status(500).json({
        message: "User is not registered",
        error: true,
        data: null,
      });
    }

    // Option 2.B: Email exists in the database:
    if (existingUser) {
      // 2.B.1: Verify Password:
      const isPasswordCorrect = await verifyPassword(
        request.body.password,
        existingUser.password
      );

      // Option 2.C.1: Passwords do not match
      if (!isPasswordCorrect) {
        response.status(500).json({
          message: "Wrong password. Please try again",
          error: true,
          data: null,
        });
      }
      // Option 2.C.2: Passwords DO match
      if (isPasswordCorrect) {
        // D: Generate token
        const token = generateToken(existingUser._id);

        // D.1. : Token is NOT generated:
        if (!token) {
          response.status(500).json({
            message: "Something went wrong generating the token.",
            error: true,
            data: null,
          });
        }

        // D.2. : Token is generated
        if (token) {
          // sending these infos from backend to frontend
          const user = {
            userName: existingUser.userName,
            email: existingUser.email,
            // userimage: existingUser.userimage,
            created_cards: existingUser.created_cards,
          };

          response.status(200).json({
            message: "User successfully logged in",
            error: false,
            data: {
              user: user,
              token,
            },
          });
        }
      }
    }
  } catch (error) {
    console.log("ERROR", error);
    response.status(500).json({
      message: "Something went wrong",
      error: true,
      data: null,
    });
  }
}

async function getProfile(request, response) {
  // Use Postman for sending and testing the route. Check request in Postman: Get user profile inside MERN Project Coda Academy.
  // This console.log will be visible in the server terminal after sending it through Postman
  console.log("Profile from user");
  // console.log("Request", request);

  const { user } = request;
  // const user = request.user

  if (!user) {
    response.status(500).json({
      message: "Please login first",
      error: true,
      data: null,
    });
  }

  if (user) {
    response.status(200).json({
      message: "Request successful",
      error: false,
      data: {
        // user: {
        //   userName: user.userName,
        //   email: user.email,
        //   userImage: user.userImage,
        // },
        userName: user.userName,
        email: user.email,
        // userImage: user.userImage,
      },
    });
  }
}

async function updateUser(request, response) {
  // console.log("request.body", JSON.parse(request.body.values));
  console.log("body", request.body)

  // const updateValues = JSON.parse(request.body.values);
  const updateValues =request.body
  // const { id } = request.query
  // console.log('request.params', request.params)
  console.log("request.user", request.user);
  const valid = isValidObjectId(request.user._id);

  if (!valid) return response.status(400).json({ error: "Invalid User ID" });

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      request.user._id,
      updateValues,
      { new: true }
    );

    console.log("updatedUser", updatedUser);
    if (!updatedUser)
      return response.status(404).json({ error: "User not found." });

    // else
    response.status(200).json({
      message:"user updated correctly",
      user:{
        email: updatedUser.email,
        userName:updatedUser.userName,
        created_cards:updatedUser.created_cards
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Something went wrong." });
  }
}

export { test, getAllUsers, signup, login, getProfile, updateUser };
