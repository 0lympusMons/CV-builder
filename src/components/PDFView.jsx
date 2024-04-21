import generatePDF, { Resolution, Margin } from "react-to-pdf";
import React, { useContext } from "react";
import { AppContext } from "../App";
import "./PDFView.css";

const options = {
  // default is `save`
  method: "open",
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.HIGH,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    // margin: Margin.SMALL,
    // default is 'A4'
    format: "letter",
    // default is 'portrait'
    orientation: "portrait",
  },

  canvas: {
    // default is 'image/jpeg' for better size performance
    // mimeType: "image/png",
    mimeType: "image/jpeg",
    qualityRatio: 1,
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true,
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: true,
    },
  },
};

// you can use a function to return the target element besides using React refs
const getTargetElement = () => document.getElementById("content-id");

function Component() {
  const { personalDetails, educationArray, experienceArray } =
    useContext(AppContext);

  const experienceIsEmpty =
    experienceArray.length === 0 || !experienceArray.some((data) => !data.hidden);
  let experienceElements = experienceArray.map((data, index) => {
    if (data.hidden === false) {
      return (
        <li key={index}>
          <div className="name-date">
            <p>{data.company}</p>
            <p>
              {data.startDate} - {data.endDate}
            </p>
          </div>

          <div className="position-degree--location">
            <p>{data.position}</p>
            <p>{data.location}</p>
          </div>

          <div className="description">{data.description}</div>
        </li>
      );
    }
  });

  const educationIsEmpty =
    educationArray.length === 0 || !educationArray.some((data) => !data.hidden);
  let educationElements = educationArray.map((data, index) => {
    if (data.hidden === false) {
      return (
        <li key={index}>
          <div className="name-date">
            <p>{data.school}</p>
            <p>
              {data.startDate} - {data.endDate}
            </p>
          </div>

          <div className="position-degree--location">
            <p>{data.degree}</p>
            <p>{data.location}</p>
          </div>
        </li>
      );
    }
  });
  return (
    <div id="pdf-view">
      <div id="content-id">
        <div>
          <h1>{personalDetails.fullName}</h1>
          <ul className="contact-info">
            <li>
              <h3>{personalDetails.email}</h3>
            </li>
            <li>
              <h3>{personalDetails.phoneNumber}</h3>
            </li>
            <li>
              <h3>{personalDetails.address}</h3>
            </li>
          </ul>
        </div>

        {!experienceIsEmpty && (
          <div className="work-experience experience">
            <h2>WORK EXPERIENCE</h2>
            <hr />
            <ul className="work-experience__array array">
              {experienceElements}
            </ul>
          </div>
        )}

        {!educationIsEmpty && (
          <div className="education-experience experience">
            <h2>EDUCATION</h2>
            <hr />
            <ul className="education__array array">{educationElements}</ul>
          </div>
        )}
      </div>

      <button id="download-button"
        onClick={async function () {
          await generatePDF(getTargetElement, options);
        }}
      >
        Download PDF
      </button>
    </div>
  );
}

export default Component;
