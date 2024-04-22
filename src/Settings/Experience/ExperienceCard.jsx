import React, { useState, useContext } from "react";
import Card from "../../components/Card";
import { nanoid } from "nanoid";
import { AppContext } from "../../App";

export default function ExperienceCard({ experienceArray }) {
  /**********************************
   ***************hooks**************
   ********************************* */
  const { setExperienceArray } = useContext(AppContext);

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

    let newEducation = formDetails;
    let dataExists = newEducation.id === undefined ? false : true;

    if (dataExists) {
      const existingIndex = experienceArray.findIndex(
        (data) => data.id === newEducation.id
      );
      const updatedformDetails = [...experienceArray];
      updatedformDetails[existingIndex] = newEducation;
      setExperienceArray(updatedformDetails);
    } else {
      newEducation.id = nanoid();
      newEducation.hidden = false;
      setExperienceArray([...experienceArray, newEducation]);
    }
  }

  function deleteData(id) {
    const updatedArray = experienceArray.filter((data) => data.id !== id);
    setExperienceArray(updatedArray);
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
    const updatedArray = [...experienceArray];
    updatedArray.map((e) => {
      if (e.id === id) {
        e.hidden = !e.hidden;
      }
      return e;
    });
    setExperienceArray(updatedArray);
  }

  /**********************************
   ***************element**************
   ********************************* */

  let ExperienceElements = (
    <ul className="experience--companies">
      {experienceArray.map((object) => {
        return (
          <li key={object.id}>
            <p className="company-school--name">{object.company}</p>
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
                  src={`./icon-${object.hidden ? "unhide" : "hide"}.svg`}
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
