import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import supabase from "../services/supabase";

//Base URL
// const BASE_URL = "http://localhost:9000";
//the houses context
const HousesContext = createContext();

//the initisl states
const initialState = {
  houses: [],
  isLoading: false,
  currentHouse: {},
  error: "",
  isMapClicked: false,
  isEditButtonClicked: false,
};

//reducer function
function reducer(state, action) {
  // all the logic
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "houses/loaded":
      //return all the current states and set isLoading to false and set houses to action.payload
      return {
        ...state,
        isLoading: false,
        houses: action.payload,
      };
    case "house/loaded":
      return {
        ...state,
        isLoading: false,
        currentHouse: action.payload,
      };
    case "house/created":
      return {
        ...state,
        isLoading: false,
        houses: [...state.houses, action.payload],
        //current house set the newly created house
        currentHouse: action.payload,
      };
    case "map/clicked":
      return {
        ...state,
        isEditButtonClicked: false,
        isMapClicked: true,
      };
    case "edit/clicked":
      return {
        ...state,
        isMapClicked: false,
        isEditButtonClicked: true,
      };
    case "house/edited":
      //find the house and update it
      const updateHouses = state.houses.map((house) =>
        house.id === action.payload.id ? action.payload : house
      );
      return {
        ...state,
        isLoading: false,
        houses: updateHouses,
        //current house set the newly edited house
        currentHouse: action.payload,
      };
    case "house/deleted":
      return {
        ...state,
        isLoading: false,
        houses: state.houses.filter((house) => house.id !== action.payload),
        currentHouse: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

//the provider
function HousesProvider({ children }) {
  //the state and dispatch function out of the use reducer hook passing in the reducer and initialState
  const [
    {
      houses,
      isLoading,
      currentHouse,
      error,
      isMapClicked,
      isEditButtonClicked,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  //load data on initial render
  useEffect(function () {
    async function fetchHouses() {
      //when the houses data is loading
      dispatch({ type: "loading" });

      try {
        // //fetch the api
        // const res = await fetch(`${BASE_URL}/houses`);
        // //the data
        // const data = await res.json();
        // console.log(data);
        //create query from the supabase client
        const { data: houses, error } = await supabase
          .from("houses")
          .select("*");

        if (error) {
          console.error(error);
          throw new Error("Houses could not be loaded");
        }
        //the houses data
        dispatch({ type: "houses/loaded", payload: houses });
        //the error
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the houses",
        });
      }
    }
    fetchHouses();
  }, []);

  //get the current house
  const getHouse = useCallback(
    async function getHouse(id) {
      //if the house is already the current house
      if (Number(id) === currentHouse.id) return;
      console.log(Number(id), currentHouse.id);
      //when the houses data is loading
      dispatch({ type: "loading" });
      try {
        // //fetch the api
        // const res = await fetch(`${BASE_URL}/houses/${id}`);
        // //the data
        // const data = await res.json();
        const { data: house, error } = await supabase
          .from("houses")
          .select("*")
          .eq("id", id)
          .single();
        //load data
        // const { data: allHouses } = await supabase.from("houses").select("*");
        if (error) {
          console.error(error);
          throw new Error("House could not be loaded");
        }
        // //the houses data
        // dispatch({ type: "houses/loaded", payload: allHouses });
        //the house state
        dispatch({ type: "house/loaded", payload: house });

        //the error
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the house...",
        });
      }
    },
    [currentHouse.id]
  );

  //add  new house
  async function createHouse(newHouse) {
    //when the houses data is loading
    dispatch({ type: "loading" });

    try {
      //fetch the api
      // const res = await fetch(`${BASE_URL}/houses`, {
      //   method: "POST",
      //   body: JSON.stringify(newHouse),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      //the data
      //const data = await res.json();
      //add data
      const { data: house, error } = await supabase
        .from("houses")
        .insert([newHouse])
        .select();

      //load data
      // const { data: houses } = await supabase.from("houses").select("*");

      if (error) {
        console.error(error);
        throw new Error("House could not be created" + error.message);
      }
      // //the houses data
      // dispatch({ type: "houses/loaded", payload: houses });
      // dispatch({ type: "not/loading" });
      //add the house to the state
      dispatch({ type: "house/created", payload: house[0] });
      //the error
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the house...",
      });
    }
  }
  //addbotton clicked
  function mapIsClicked() {
    dispatch({ type: "map/clicked" });
  }
  //edit botton clicked
  function editedButtonIsClicked() {
    dispatch({ type: "edit/clicked" });
  }
  //edit house
  async function editHouse(id, editedHouse) {
    //when the houses data is loading
    dispatch({ type: "loading" });
    try {
      //fetch the api
      // const res = await fetch(`${BASE_URL}/houses/${id}`, {
      //   method: "PUT",
      //   body: JSON.stringify(editedHouse),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // //the data
      // const data = await res.json();
      const { data, error } = await supabase
        .from("houses") // Replace with your table name
        .update(editedHouse)
        .eq("id", id)
        .select()
        .single();
      //load data
      // const { data: houses } = await supabase.from("houses").select("*");
      if (error) {
        console.error(error);
        throw new Error("Houses could not be loaded: " + error);
      }
      // //refresh the houses data
      // dispatch({ type: "houses/loaded", payload: houses });
      // dispatch({ type: "not/loading" });
      //edit the house
      dispatch({ type: "house/edited", payload: data });
      //the error
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error editing the house...",
      });
    }
  }

  //delete house
  async function deleteHouse(id) {
    //when the houses data is loading
    dispatch({ type: "loading" });
    try {
      // //fetch the api
      // await fetch(`${BASE_URL}/houses/${id}`, {
      //   method: "DELETE",
      // });
      // //delete the house with the id by filtering the list
      // dispatch({ type: "house/deleted", payload: id });

      const { error } = await supabase.from("houses").delete().eq("id", id);

      if (error) {
        console.error(error);
        throw new Error("Houses could not be loaded");
      }

      dispatch({ type: "house/deleted", payload: id });

      //the error
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the house...",
      });
    }
  }

  return (
    <HousesContext.Provider
      value={{
        houses,
        isLoading,
        currentHouse,
        getHouse,
        createHouse,
        editHouse,
        deleteHouse,
        isMapClicked,
        mapIsClicked,
        isEditButtonClicked,
        editedButtonIsClicked,
        error,
      }}
    >
      {children}
    </HousesContext.Provider>
  );
}

//custon hook to cunsumed the data
function useHouses() {
  //consume the context
  const context = useContext(HousesContext);

  if (context === undefined)
    throw new Error("HousesContext was used outside of HousesProvider");

  return context;
}

export { HousesProvider, useHouses };
