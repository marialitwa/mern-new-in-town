import UserModel from "../models/userModel.js";
import encryptPassword from "../utils/encryptPassword.js";

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

async function signup(request, response) {
  // Before writing the function logic I can test it with response.send("string") in Postman
  // response.send("testing")
  // console.log(request.body);
  const { email, password, username } = request.body;

  // Here I can validate separated/individually for email and password to display a specifique message
  if (!email || !password)
    return response.status(400).json({ error: "All fields must be included" });

  try {

    // If all credentioals are provided we check if user is already in database
    const registeredUser = await UserModel.findOne({ email: email })
    console.log("registered User", registeredUser)

    // User respectivly email already exists
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

export { test, getAllUsers, findUserByEmail, signup };
