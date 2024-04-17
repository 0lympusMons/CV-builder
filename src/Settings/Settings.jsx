import React, { useState } from "react";
import Card from "../components/Card";

import EducationCard from "./Education/EducationCard";
import ExperienceCard from "./Experience/ExperienceCard";
import PersonalCard from "./Personal/PersonalCard";
export default function Settings() {

  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const [educationDetails, setEducationDetails] = useState([]);

  const [experienceArray, setExperienceArray] = useState([]);

  return (
    <div className="sidebar">
      <div className="form-setting">
        <div className="form-setting--controls">
          <button>Clear</button>
          <button>Load Template</button>
        </div>
        <PersonalCard
          personalDetails={personalDetails}
          setPersonalDetails={setPersonalDetails}
        />

        <EducationCard
          educationArray={educationDetails}
          setEducationArray={setEducationDetails}
        />

        <ExperienceCard
          experienceArray={experienceArray}
          setExperienceArray={setExperienceArray}
        />
      </div>
    </div>
  );
}
