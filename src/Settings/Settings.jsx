import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import EducationCard from "./Education/EducationCard";
import ExperienceCard from "./Experience/ExperienceCard";
import PersonalCard from "./Personal/PersonalCard";
import ClearConfirmationModal from "../components/ClearConfirmationModal";

export default function Settings() {
  const [showClearModal, setShowModal] = useState(false);

  const {
    personalDetails,
    educationArray,
    experienceArray,
    setPersonalDetails,
    setEducationArray,
    setExperienceArray,
  } = useContext(AppContext);

  function toggleShowModal() {
    setShowModal((prevState) => !prevState);
  }
  function clearEverything() {
    setPersonalDetails({
      fullName: "",
      address: "",
      email: "",
      phoneNumber: "",
    });

    setEducationArray([]);

    setExperienceArray([]);
  }

  function loadTemplate() {
    setPersonalDetails({
      fullName: "Ynoh Madula",
      address: "Drayton Valley, AB",
      email: "madula.dodge2002@gmail.com",
      phoneNumber: "+1 123-456-7890",
    });

    setEducationArray([
      {
        school: "USTP",
        startDate: "August 2023",
        endDate: "January 2024",
        degree: "BS in Information Technology",
        location: "Panaon, Philippines",
        id: "ustp1",
        hidden: false,
      },
      {
        school: "MSUIIT",
        startDate: "August 2021",
        endDate: "February 2023",
        degree: "BS in Information Technology",
        location: "Iligan City, Philippines",
        id: "msu-iit1",
        hidden: false,
      },
    ]);

    setExperienceArray([
      {
        company: "Petro-Canada",
        position: "Cashier",
        startDate: "March 2024",
        endDate: "Present",
        location: "Drayton Valley, Alberta, Canada",
        description:
          "Responsible for serving customers, maintaining the cleanliness of the store, and managing the stock of the products.",
        id: "petro-canada1",
        hidden: false,
      },
    ]);
  }
  return (
    <>
      {showClearModal && (
        <ClearConfirmationModal
          clearEverything={clearEverything}
          toggleShowModal={toggleShowModal}
        />
      )}
      <div className="sidebar">
        <div className="form-setting">
          <div className="form-setting--controls">
            <button onClick={toggleShowModal}>Clear</button>
            <button onClick={loadTemplate}>Load Template</button>
          </div>
          <PersonalCard personalDetails={personalDetails} />

          <EducationCard educationArray={educationArray} />

          <ExperienceCard experienceArray={experienceArray} />
        </div>
      </div>
    </>
  );
}
