import { useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "40px 40px",
    width: "400px",
    height: "400px",
    position: "relative",
    boxShadow: "0 3px 10px rgb(0 0 0 / 20%)",
  },
};

Modal.setAppElement("#addMovie");

const AddNewModal = ({ open, closeModal }) => {
  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add New Movie"
    >
      <div
        className="absolute cursor-pointer right-4 top-2 font-bold text-2xl"
        onClick={closeModal}
      >
        x
      </div>
      <div></div>
    </Modal>
  );
};
// }

export default AddNewModal;
