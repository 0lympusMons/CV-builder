import React from "react";

export default function ClearConfirmationModal({
  clearEverything,
  toggleShowModal,
}) {
  return (
    <div id="modal-background">
      <div id="clear-modal">
        <p>Are you sure you want to clear all of your progress?</p>
        <div className="buttons">
          <button
            className="clear-button"
            onClick={() => {
              clearEverything();
              toggleShowModal();
            }}
          >
            Clear
          </button>
          <button className="no-button" onClick={toggleShowModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
