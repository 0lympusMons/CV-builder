import React, { useState } from "react";
import Card from "../../components/Card";
import { nanoid } from "nanoid";

export default function ExperienceCard({
  experienceArray,
  setExperienceArray,
}) {
  /**********************************
   ***************hooks**************
   ********************************* */

  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [formDetails, setFormDetails] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  /**********************************
   ***************functions**************
   ********************************* */

  function toggleShowForm() {
    setShowExperienceForm((prevState) => !prevState);
  }
  function saveForm(event) {
    event.preventDefault();

    let newExperience = formDetails;
    let dataExists = newExperience.id === undefined ? false : true;

    if (dataExists) {
      const existingIndex = experienceArray.findIndex(
        (data) => data.id === newExperience.id
      );
      const updatedformDetails = [...experienceArray];
      updatedformDetails[existingIndex] = newExperience;
      setExperienceArray(updatedformDetails);
    } else {
      newExperience.id = nanoid();
      newExperience.hidden = false;
      setExperienceArray((prevState) => [...prevState, newExperience]);
    }
  }

  function deleteData(id) {
    setExperienceArray((prevState) =>
      prevState.filter((data) => data.id !== id)
    );
  }

  function emptyForm() {
    setFormDetails({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function toggleHideData(id) {
    setExperienceArray((prevState) => {
      let newState = [...prevState];
      newState.map((e) => {
        if (e.id === id) {
          e.hidden = !e.hidden;
        }
        return e;
      });
      return newState;
    });
  }

  /**********************************
   ***************element**************
   ********************************* */

  let ExperienceElements = (
    <ul className="education--companys">
      {experienceArray.map((object) => {
        return (
          <li key={object.id}>
            {object.company}

            <button
              onClick={() => {
                deleteData(object.id);
              }}
            >
              <img
                className="list-button delete-button"
                src="./src/assets/icon-delete.svg"
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
                src="./src/assets/icon-edit.svg"
                alt="Edit Button"
              />
            </button>
            <button onClick={() => toggleHideData(object.id)}>
              <img
                className="list-button hide-button"
                src={`../src/assets/icon-${
                  object.hidden ? "unhide" : "hide"
                }.svg`}
                alt="Hide Button"
              />
            </button>
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
      className="card--experience"
      icon="icon-experience.svg"
      title="Experience"
    >
      {!showExperienceForm && ExperienceElements}
      {(showExperienceForm && (
        <ExperienceForm
          formDetails={formDetails}
          setFormDetails={setFormDetails}
          saveForm={saveForm}
          emptyForm={emptyForm}
          toggleShowForm={toggleShowForm}
          deleteData={deleteData}
          handleFormChange={handleFormChange}
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
            Experience
            <span style={iconStyle}>+</span>
          </button>
        </div>
      )}
    </Card>
  );
}

function ExperienceForm({
  formDetails,
  saveForm,
  deleteData,
  toggleShowForm,
  handleFormChange,
}) {
  return (
    <form>
      <label htmlFor="company">
        <p>Company name</p>
        <input
          type="text"
          name="company"
          id="company"
          onChange={(event) => handleFormChange(event)}
          value={formDetails.company}
        />
      </label>

      <label htmlFor="position">
        <p>Position title</p>
        <input
          type="text"
          name="position"
          id="position"
          onChange={(event) => handleFormChange(event)}
          value={formDetails.position}
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

      <label htmlFor="description">
        <p>Description</p>
        <input
          type="text"
          name="description"
          id="description"
          onChange={(event) => handleFormChange(event)}
          value={formDetails.description}
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
