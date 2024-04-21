import React, { createContext, useState } from "react";
import Settings from "./Settings/Settings";
import PDFView from "./components/PDFView";
import "./App.css";

const initialState = {
  personalDetails: {
    fullName: "",
    address: "",
    email: "",
    phoneNumber: "",
  },
  educationArray: [],
  experienceArray: [],
};

const AppContext = createContext(initialState);

function AppProvider({ children }) {
  const [state, setState] = useState(initialState);

  const setPersonalDetails = (updatedDetails) => {
    setState((prevState) => ({
      ...prevState,
      personalDetails: { ...prevState.personalDetails, ...updatedDetails },
    }));
  };

  const setEducationArray = (updatedArray) => {
    setState((prevState) => ({ ...prevState, educationArray: updatedArray }));
  };

  const setExperienceArray = (updatedArray) => {
    setState((prevState) => ({ ...prevState, experienceArray: updatedArray }));
  };

  const value = {
    ...state,
    setPersonalDetails,
    setEducationArray,
    setExperienceArray,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function App() {
  return (
    <>
      <AppProvider>
        <>
          <header>CV Builder</header>
          <main>
            <Settings />
            <PDFView />
          </main>
        </>
      </AppProvider>
      <footer></footer>
    </>
  );
}

export { AppContext };
export default App;
