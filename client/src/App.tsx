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
/////////////////////
/////////////////////
/////////////////////

import "./App.css";

function App() {
  return <h1>Hallo</h1>;
}

export default App;
