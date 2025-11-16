import { createContext, useContext, useReducer } from "react";
import supabase from "../services/supabase";

// the admins
// const adminsLogin = [
//   {
//     name: "Vaanii",
//     email: "frederickvaanii1@gmail.com",
//     password: "vaanii@123",
//   },
//   {
//     name: "Favor",
//     email: "favor@gmail.com",
//     password: "favor@123",
//   },
//   {
//     name: "Fatu",
//     email: "fatu@gmail.com",
//     password: "fatu@123",
//   },
//   {
//     name: "Humble",
//     email: "humble@gmail.com",
//     password: "humble@123",
//   },
//   {
//     name: "Agustine",
//     email: "agustine@gmail.com",
//     password: "agustine@123",
//   },
//   {
//     name: "Preston",
//     email: "preston@gmail.com",
//     password: "agustine@123",
//   },
//   {
//     name: "Charles",
//     email: "charles@gmail.com",
//     password: "charles@123",
//   },
// ];

//the auth context
const AuthContext = createContext();

function AuthProvider({ children }) {
  //initial states
  const initialState = {
    admin: null,
    isAuthenticated: false,
    error: null,
  };
  // reducer
  function reducer(state, action) {
    switch (action.type) {
      //when the admin is logged in
      case "login":
        return {
          ...state,
          admin: action.payload,
          isAuthenticated: true,
          error: null,
        };
      //when the admin is logged out
      case "logout":
        return { ...state, admin: null, isAuthenticated: false, error: null };
      //if the authentication failed
      case "rejected":
        return { ...state, isAuthenticated: false, error: action.payload };
      //default case
      default:
        throw new Error("Unknown action");
    }
  }
  //state and the dispatch
  const [{ admin, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //login
  async function login({ email, password }) {
    //to log in adimin with supabase
    let { data: admin, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        data: {
          username: "Vaanii",
        },
      },
    });

    console.log(admin);

    if (error) {
      console.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
      throw new Error("Username or Password is incorrect");
    }
    console.log(admin);
    dispatch({ type: "login", payload: admin });
  }
  //fake login
  // function login(email, password) {
  //   //if the email and password is correct
  //   adminsLogin.map(function (admin) {
  //     if (email === admin.email && password === admin.password)
  //       dispatch({ type: "login", payload: admin });
  //   });
  // }
  //logout
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{ admin, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
