import { useState, useEffect } from "react";
import { Doctor } from "./@types/doctors";
import "./App.css";

export default function App() {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors/all");
        // console.log(response);

        if (!response.ok) {
          throw new Error("Network response is not ok");
        }

        const data = await response.json();
        // console.log("Data", data.allDoctors);

        const foundDoctors = data.allDoctors as Doctor[];
        // console.log(foundDoctors.allDoctors[0].name);

        setAllDoctors(foundDoctors);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchAllDoctors();
  }, []);

  return (
    <>
      <h1>Here is my doctors list:</h1>
      {allDoctors.map((doctor) => (
        <div key={doctor._id}>
          <p>{doctor.name}</p>
        </div>
      ))}
    </>
  );
}

// GET COLLECTION NAMES
// db.getCollectionNames()

// ================================================================================================
// import "./App.css";
// import { useEffect, useRef, useState } from "react";
// import { User } from "./@types/users.tsx";
// import { ResponseNotOk } from "./@types/index.ts";

// function App() {
//   const [allUsers, setAllUsers] = useState<User[]>([]);
//   const [foundUser, setFoundUser] = useState<User | null>(null);

//   const inputValue = useRef("");

//   const handleClick = async () => {
//     if (!inputValue.current)
//       return alert("Please write something in the text field");
//     // ABOVE: Validation on Frontend: check that this is an email + Validation in backend
//     // in userController function that whatever you are getting is also an email
//     // Important: always check on frontend and backend
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/users/find/${inputValue.current}`
//       );
//       if (!response.ok) {
//         const result = (await response.json()) as ResponseNotOk;
//         return console.log(result);
//       }
//       const result = (await response.json()) as User;
//       setFoundUser(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const fetchAllUsers = () => {
//       fetch("http://localhost:5000/api/users/all")
//         .then((response) => response.json())
//         .then((response) => {
//           const foundUsers = response as User[];
//           setAllUsers(foundUsers);
//         })
//         .catch((error) => console.error(error));
//     };
//     fetchAllUsers();
//   }, []);

//   return (
//     <div>
//       <h2>Here are all users:</h2>
//       {allUsers.map((user) => {
//         return (
//           <div key={user._id}>
//             <p>{user.email}</p>
//           </div>
//         );
//       })}
//       <label>Find a user: </label>
//       <input
//         className="bg-gray-100 rounded p-2 m-2 border-black border-solid border-2"
//         type="text"
//         onChange={(event) => (inputValue.current = event.target.value)}
//       />
//       <button
//         className="bg-gray-100 rounded p-2 m-2 border-black border-solid border-2"
//         onClick={handleClick}
//       >
//         Find User
//       </button>
//       {foundUser && (
//         <div>
//           <p>{foundUser.email}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
