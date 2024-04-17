import React from "react";
import Card from "../../components/Card";

export default function PersonalCard(personalDetails, setPersonalDetails) {

  function handleChange(event) {
    const { value, name } = event.target;
    setPersonalDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
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
