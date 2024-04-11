import React, { useState } from "react";
import Card from "../components/Card";
import { nanoid } from "nanoid";

function EducationCard({
  showEducationForm,
  toggleShowEducationForm,
  schools,
  form,
}) {
  return (
    <Card
      className="card--education"
      icon="icon-education.svg"
      title="Education"
    >
      <div className="card-setting">
        {!showEducationForm && schools}
        {showEducationForm && form}

        <button onClick={toggleShowEducationForm}>Education +</button>
      </div>
    </Card>
  );
}

function EducationCardForm({
  educationFormDetails,
  handleChangeEducationForm,
  handleEducationSave,
  toggleShowEducationForm,
  handleDelete,
}) {
  return (
    <form>
      <label htmlFor="school">
        <p>School</p>
        <input
          type="text"
          name="school"
          id="school"
          onChange={(event) => handleChangeEducationForm(event)}
          value={educationFormDetails.school}
        />
      </label>

      <label htmlFor="degree">
        <p>Degree</p>
        <input
          type="text"
          name="degree"
          id="degree"
          onChange={(event) => handleChangeEducationForm(event)}
          value={educationFormDetails.degree}
        />
      </label>

      <div className="form--dates">
        <label htmlFor="startDate">
          <p>Start date</p>
          <input
            type="text"
            name="startDate"
            id="startDate"
            onChange={(event) => handleChangeEducationForm(event)}
            value={educationFormDetails.startDate}
          />
        </label>

        <label htmlFor="endDate">
          <p>End date</p>
          <input
            type="text"
            name="endDate"
            id="endDate"
            onChange={(event) => handleChangeEducationForm(event)}
            value={educationFormDetails.endDate}
          />
        </label>
      </div>

      <label htmlFor="location">
        <p>Location</p>
        <input
          type="text"
          name="location"
          id="location"
          onChange={(event) => handleChangeEducationForm(event)}
          value={educationFormDetails.location}
        />
      </label>

      <div className="form-setting">
        <button onClick={toggleShowEducationForm}>Cancel</button>
        <button
          onClick={(event) => {
            handleEducationSave(event);
            toggleShowEducationForm();
          }}
        >
          Save
        </button>
        <button
          onClick={(event) => {
            handleDelete(event, educationFormDetails.id);
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
}

export default function Settings() {
  function handleSubmit(event) {
    event.preventDefault();
  }

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

  const [educationDetails, setEducationDetails] = useState([]);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [educationFormDetails, setEducationFormDetails] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  function handleChangeEducation(event) {
    const { name, value } = event.target;
    setEducationDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

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
      setEducationDetails((prevState) => [...prevState, newEducationDetails]);
    }

    // TODO: if new, push directly. otherwise, overwrite existing
  }

  function handleChangeEducationForm(event) {
    const { name, value } = event.target;
    setEducationFormDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
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
            <button>
              <img
                className="list-button hide-button"
                src="./src/assets/icon-hide.svg"
                alt="Hide Button"
              />
            </button>
          </li>
        );
      })}
    </ul>
  );

  let form = (
    <EducationCardForm
      educationFormDetails={educationFormDetails}
      handleChangeEducationForm={handleChangeEducationForm}
      handleEducationSave={handleEducationSave}
      toggleShowEducationForm={toggleShowEducationForm}
      deleteEducationDetail={deleteEducationDetail}
      handleDelete={handleDelete}
    />
  );

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
          <form onSubmit={(event) => handleSubmit(event)}>
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
        <Card
          className="card--education"
          icon="icon-education.svg"
          title="Education"
        >
          {!showEducationForm && educationElements}
          {showEducationForm && form}
          <div className="card-setting">
            <button
              onClick={() => {
                toggleShowEducationForm();
                emptyEducationForm();
              }}
            >
              Education +
            </button>
          </div>
        </Card>

        {/* Experience Details */}
        <Card
          className="card--experience"
          icon="icon-experience.svg"
          title="Experience"
        ></Card>
      </div>
    </div>
  );
}
