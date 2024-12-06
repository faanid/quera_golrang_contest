import React, { useEffect, useRef, useState } from "react";

function Modal() {
  const [isModalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalVisible]);

  return (
    <>
      <button data-testid="btn" onClick={openModal}>
        OPEN
      </button>
      {isModalVisible && (
        <div
          data-testid="modal"
          ref={modalRef}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <h2>CLICK OUTSIDE OF ME</h2>
        </div>
      )}
    </>
  );
}

export default Modal;
