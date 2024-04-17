import React from "react";
import Card from "../../components/Card";

export function EducationCard({
  showEducationForm,
  emptyEducationForm,
  toggleShowEducationForm,
  schools,
  form,
}) {
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
      {!showEducationForm && schools}
      {showEducationForm && form}
      <div className="card-setting">
        <button
          style={buttonStyle}
          onClick={() => {
            toggleShowEducationForm();
            emptyEducationForm();
          }}
        >
          Education
          <span style={iconStyle}>+</span>
        </button>
      </div>
    </Card>
  );
}

export function EducationCardForm({
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
