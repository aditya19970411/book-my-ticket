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

Modal.setAppElement("#detailModals");

const DetailsModal = ({ open, closeModal, id, city }) => {
  const [details, setdetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const { details } = await fetch(`/api/movies/${id}/${city}`, {
        method: "GET",
      }).then((result) => result.json());
      setdetails(details);
    };

    fetchDetails();
  }, [id, city]);

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        className="absolute cursor-pointer right-4 top-2 font-bold text-2xl"
        onClick={closeModal}
      >
        x
      </div>
      <div className="flex flex-col">
        <div className="flex mb-4 flex-col">
          <span className="font-semibold">Theatre Name - </span>
          <span>{details?.theatre}</span>
        </div>
        <div className="flex mb-4 flex-col">
          <span className="font-semibold">Timings -</span>
          <div className="flex flex-col">
            {details?.timings?.map((detail, index) => (
              <span key={"time" + "-" + index.toString()}>{detail.time}</span>
            ))}
          </div>
        </div>
        <div className="flex mb-4 flex-col">
          <span className="font-semibold">Location -</span>
          <span>{details?.location}</span>
        </div>
        <div className="flex mb-4 flex-col">
          <span className="font-semibold">Price - </span>
          <div className="flex flex-col">
            {details?.timings?.map((detail, index) => (
              <span key={"price" + "-" + index.toString()}>{detail.price}</span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
// }

export default DetailsModal;
