import React, { useState } from "react";
import Card from "../../components/Card";
import { nanoid } from "nanoid";

export default function ExperienceCard({
  experienceArray,
  setExperienceArray,
}) {
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [formDetails, setFormDetails] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

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

  function toggleHideExperience(id) {}

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
            <button onClick={() => toggleHideExperience(object.id)}>
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
  return (
    <Card
      className="card--experience"
      icon="icon-experience.svg"
      title="Experience"
    >
      {!showExperienceForm && ExperienceElements}
      {showExperienceForm && (
        <ExperienceForm
          formDetails={formDetails}
          setFormDetails={setFormDetails}
          saveForm={saveForm}
          emptyForm={emptyForm}
          toggleShowForm={toggleShowForm}
          deleteData={deleteData}
          handleFormChange={handleFormChange}
        />
      )}
      <div className="card-setting">
        <button
          onClick={() => {
            toggleShowForm();
            emptyForm();
          }}
        >
          Experience +
        </button>
      </div>
    </Card>
  );
}

function ExperienceForm({
  formDetails,
  setFormDetails,
  saveForm,
  emptyForm,
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
