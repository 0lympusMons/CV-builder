import React, { useState, useContext } from "react";
import Card from "../../components/Card";
import { nanoid } from "nanoid";
import { AppContext } from "../../App";

export default function EducationCard({ educationArray }) {
  /**********************************
   ***************hooks**************
   ********************************* */

  const { setEducationArray } = useContext(AppContext);

  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [formDetails, setFormDetails] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  /**********************************
   ***************functions**************
   ********************************* */

  function toggleShowForm() {
    setShowExperienceForm((prevState) => !prevState);
  }
  function saveForm(event) {
    event.preventDefault();

    let newEducation = formDetails;
    let dataExists = newEducation.id === undefined ? false : true;

    if (dataExists) {
      const existingIndex = educationArray.findIndex(
        (data) => data.id === newEducation.id
      );
      const updatedformDetails = [...educationArray];
      updatedformDetails[existingIndex] = newEducation;
      setEducationArray(updatedformDetails);
    } else {
      newEducation.id = nanoid();
      newEducation.hidden = false;
      setEducationArray([...educationArray, newEducation]);
    }
  }

  function deleteData(id) {
    const updatedArray = educationArray.filter((data) => data.id !== id);
    setEducationArray(updatedArray);
  }

  function emptyForm() {
    setFormDetails({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function toggleHideData(id) {
    const updatedArray = [...educationArray];
    updatedArray.map((e) => {
      if (e.id === id) {
        e.hidden = !e.hidden;
      }
      return e;
    });
    setEducationArray(updatedArray);
  }

  /**********************************
   ***************element**************
   ********************************* */

  const EducationElements = (
    <ul className="education--schools">
      {educationArray.map((object) => {
        return (
          <li key={object.id}>
            <p className="company-school--name">{object.school}</p>

            <div className="buttons">
              <button
                onClick={() => {
                  deleteData(object.id);
                }}
              >
                <img
                  className="list-button delete-button"
                  src="/icon-delete.svg"
                  alt="Delete Button"
                />
              </button>

              <button
                onClick={() => {
                  setFormDetails(object);
                  toggleShowForm();
                }}
              >
                <img
                  className="list-button edit-button"
                  src="/icon-edit.svg"
                  alt="Edit Button"
                />
              </button>
              <button onClick={() => toggleHideData(object.id)}>
                <img
                  className="list-button hide-button"
                  src={`/icon-${object.hidden ? "unhide" : "hide"}.svg`}
                  alt="Hide Button"
                />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );

  /**********************************
   ***************styles**************
   ********************************* */

  const buttonStyle = {
    fontWeight: "700",
    fontSize: "1rem",
    letterSpacing: "-0.01em",
    color: "#000000",
    border: "none",
    background: "none",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    gap: ".5rem",
    height: "1.25rem",
  };

  const iconStyle = {
    fontSize: "2rem",
    fontWeight: "500",
  };

  return (
    <Card
      className="card--education"
      icon="icon-education.svg"
      title="Education"
    >
      {!showExperienceForm && EducationElements}
      {(showExperienceForm && (
        <EducationForm
          formDetails={formDetails}
          saveForm={saveForm}
          handleFormChange={handleFormChange}
          toggleShowForm={toggleShowForm}
          deleteData={deleteData}
        />
      )) || (
        <div className="card-setting">
          <button
            style={buttonStyle}
            onClick={() => {
              toggleShowForm();
              emptyForm();
            }}
          >
            Education
            <span style={iconStyle}>+</span>
          </button>
        </div>
      )}
    </Card>
  );
}

export function EducationForm({
  formDetails,
  saveForm,
  deleteData,
  toggleShowForm,
  handleFormChange,
}) {
  return (
    <form>
      <label htmlFor="school">
        <p>School</p>
        <input
          type="text"
          name="school"
          id="school"
          onChange={(event) => handleFormChange(event)}
          value={formDetails.school}
        />
      </label>

      <label htmlFor="degree">
        <p>Degree</p>
        <input
          type="text"
          name="degree"
          id="degree"
          onChange={(event) => handleFormChange(event)}
          value={formDetails.degree}
        />
      </label>

      <div className="form--dates">
        <label htmlFor="startDate">
          <p>Start date</p>
          <input
            type="text"
            name="startDate"
            id="startDate"
            onChange={(event) => handleFormChange(event)}
            value={formDetails.startDate}
          />
        </label>

        <label htmlFor="endDate">
          <p>End date</p>
          <input
            type="text"
            name="endDate"
            id="endDate"
            onChange={(event) => handleFormChange(event)}
            value={formDetails.endDate}
          />
        </label>
      </div>

      <label htmlFor="location">
        <p>Location</p>
        <input
          type="text"
          name="location"
          id="location"
          onChange={(event) => handleFormChange(event)}
          value={formDetails.location}
        />
      </label>

      <div className="form-setting">
        <button onClick={toggleShowForm}>Cancel</button>
        <button
          onClick={(event) => {
            saveForm(event);
            toggleShowForm();
          }}
        >
          Save
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            toggleShowForm();
            deleteData(formDetails.id);
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
