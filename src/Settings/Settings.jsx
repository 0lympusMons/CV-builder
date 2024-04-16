import React, { useState } from "react";
import Card from "../components/Card";
import { nanoid } from "nanoid";

import { EducationCard, EducationCardForm } from "./Education/EducationCard";
import ExperienceCard from "./Experience/ExperienceCard";
export default function Settings() {
  // * Personal
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  function handleChangePersonal(event) {
    const { value, name } = event.target;
    setPersonalDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  // * Education

  const [educationDetails, setEducationDetails] = useState([]);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [educationFormDetails, setEducationFormDetails] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  function toggleShowEducationForm() {
    setShowEducationForm((prevState) => !prevState);
  }

  function emptyEducationForm() {
    setEducationFormDetails({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
  }

  function handleChangeEducationForm(event) {
    const { name, value } = event.target;
    setEducationFormDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function handleEducationSave(event) {
    event.preventDefault();

    let newEducationDetails = educationFormDetails;
    let detailHasID = newEducationDetails.id === undefined ? false : true;

    if (detailHasID) {
      const existingIndex = educationDetails.findIndex(
        (item) => item.id === newEducationDetails.id
      );
      const updatedEducationDetails = [...educationDetails];
      updatedEducationDetails[existingIndex] = newEducationDetails;
      setEducationDetails(updatedEducationDetails);
    } else {
      newEducationDetails.id = nanoid();
      newEducationDetails.hidden = false;
      setEducationDetails((prevState) => [...prevState, newEducationDetails]);
    }
  }

  function handleDelete(event, id) {
    event.preventDefault();
    toggleShowEducationForm();
    console.log("deleting ", id);
    deleteEducationDetail(id);
  }

  function deleteEducationDetail(id) {
    setEducationDetails((prevState) => prevState.filter((e) => e.id !== id));
  }

  function editEducationDetail(id) {
    setEducationFormDetails(educationDetails.find((e) => e.id === id));
    toggleShowEducationForm();
  }

  function toggleHiddenEducaton(id) {
    setEducationDetails((prevState) => {
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

  // List of schools
  let educationElements = (
    <ul className="education--schools">
      {educationDetails.map((object) => {
        return (
          <li key={object.id}>
            {object.school}

            <button
              onClick={() => {
                deleteEducationDetail(object.id);
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
                editEducationDetail(object.id);
              }}
            >
              <img
                className="list-button edit-button"
                src="./src/assets/icon-edit.svg"
                alt="Edit Button"
              />
            </button>
            <button onClick={() => toggleHiddenEducaton(object.id)}>
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

  let educationForm = (
    <EducationCardForm
      educationFormDetails={educationFormDetails}
      handleChangeEducationForm={handleChangeEducationForm}
      handleEducationSave={handleEducationSave}
      toggleShowEducationForm={toggleShowEducationForm}
      deleteEducationDetail={deleteEducationDetail}
      handleDelete={handleDelete}
    />
  );

  const [experienceArray, setExperienceArray] = useState([]);

  return (
    <div className="sidebar">
      <div className="form-setting">
        <div className="form-setting--controls">
          <button>Clear</button>
          <button>Load Template</button>
        </div>
        {/* Personal Details */}
        <Card
          className="card--person"
          icon="icon-person.svg"
          title="Personal Details"
        >
          <form onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="fullName">
              <p>Full name</p>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={personalDetails.fullName}
                onChange={(event) => handleChangePersonal(event)}
              />
            </label>

            <label htmlFor="address">
              <p>Address</p>
              <input
                type="text"
                name="address"
                id="address"
                value={personalDetails.address}
                onChange={(event) => handleChangePersonal(event)}
              />
            </label>

            <label htmlFor="email">
              <p>Email</p>
              <input
                type="email"
                name="email"
                id="email"
                value={personalDetails.email}
                onChange={(event) => handleChangePersonal(event)}
              />
            </label>

            <label htmlFor="phoneNumber">
              <p>Phone number</p>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                value={personalDetails.phoneNumber}
                onChange={(event) => handleChangePersonal(event)}
              />
            </label>
          </form>
        </Card>
        {/* Education Details */}
        <EducationCard
          showEducationForm={showEducationForm}
          emptyEducationForm={emptyEducationForm}
          toggleShowEducationForm={toggleShowEducationForm}
          schools={educationElements}
          form={educationForm}
        />

        {/* Experience Details */}
        <ExperienceCard
          experienceArray={experienceArray}
          setExperienceArray={setExperienceArray}
        />
      </div>
    </div>
  );
}
