import { AppContext } from "../App";
import EducationCard from "./Education/EducationCard";
import ExperienceCard from "./Experience/ExperienceCard";
import PersonalCard from "./Personal/PersonalCard";
export default function Settings() {
  const {
    personalDetails,
    educationArray,
    experienceArray,
    setPersonalDetails,
    setEducationArray,
    setExperienceArray,
  } = useContext(AppContext);
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
  return (
      {showClearModal && (
        <ClearConfirmationModal
          clearEverything={clearEverything}
          toggleShowModal={}
        />
      )}
            <button onClick={toggleShowModal}>Clear</button>
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
