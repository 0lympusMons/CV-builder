import React, { useContext } from "react";
import Card from "../../components/Card";
import App, { AppContext } from "../../App";

export default function PersonalCard({ personalDetails }) {
  const { setPersonalDetails } = useContext(AppContext);
  console.log(personalDetails);
  function handleChange(event) {
    const { value, name } = event.target;
    setPersonalDetails({ [name]: value });
  }

  return (
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
            onChange={(event) => handleChange(event)}
          />
        </label>

        <label htmlFor="address">
          <p>Address</p>
          <input
            type="text"
            name="address"
            id="address"
            value={personalDetails.address}
            onChange={(event) => handleChange(event)}
          />
        </label>

        <label htmlFor="email">
          <p>Email</p>
          <input
            type="email"
            name="email"
            id="email"
            value={personalDetails.email}
            onChange={(event) => handleChange(event)}
          />
        </label>

        <label htmlFor="phoneNumber">
          <p>Phone number</p>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={personalDetails.phoneNumber}
            onChange={(event) => handleChange(event)}
          />
        </label>
      </form>
    </Card>
  );
}
