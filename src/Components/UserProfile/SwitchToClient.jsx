import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";

const SwitchToClient = () => {
  const role = localStorage.getItem("role");
  const [switchSuccessful, setSwitchSuccessful] = useState(false);
  const [becomeClientSuccess, setBecomeClientSuccess] = useState(false);
  const [alreadyAclient, setAlreadyAclient] = useState(false);
  const [askToSwitch, setAskToSwitch] = useState(false);
  const wurl = "https://chair-ismatic-backend.onrender.com";
  const email = localStorage.getItem("loggedInUserEmail");

  useEffect(() => {
    const checkIsClient = async () => {
      try {
        const response = await axios.get(wurl + `/user/checkIsClient/${email}`);
        if (response.data.isClient) {
          setAlreadyAclient(true);
        } else {
          setAskToSwitch(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIsClient();
  }, [email]);

  const switchToClient = async () => {
    try {
      const response = await axios.put(wurl + `/user/updateIsClient/${email}`);

      if (response.data.message === "is_client updated successfully") {
        localStorage.setItem("role", "customer");
        setSwitchSuccessful(true);
        setAskToSwitch(false);
        setAlreadyAclient(false);
      } else {
        setAlreadyAclient(true);
        setAskToSwitch(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const becomeClient = async () => {
    try {
      const response = await axios.get(wurl + `/user/checkIsClient/${email}`);

      if (!response.data.isClient) {
        await axios.put(wurl + `/user/updateIsClient/${email}`);
        localStorage.setItem("role", "customer");
        setBecomeClientSuccess(true);
        setAskToSwitch(false);
        setAlreadyAclient(false);
      } else {
        setAskToSwitch(true);
        setAlreadyAclient(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setSwitchSuccessful(false);
    setBecomeClientSuccess(false);
    setAlreadyAclient(false);
  };
  const handleProceed = () => {
  localStorage.removeItem("cart");
  window.location.reload();
  };

  return (
    <div>
      <p className="userTitle"> Switch To Client </p>
      {askToSwitch && (
        <p className="">You are not a client. Do you want to switch?</p>
      )}
      {alreadyAclient && role == "client" && (
        <p className="">You are already a client! No need to switch.</p>
      )}
      {askToSwitch && (
        <button
          type="button"
          className="saveBtns updateBtn"
          onClick={switchToClient}
        >
          Switch To Client
        </button>
      )}
      {!alreadyAclient && (
        <>
          {" "}
          <p className="">Not A Client? Become One</p>
          <button
            type="button"
            className="saveBtns updateBtn"
            onClick={becomeClient}
          >
            Become A Client
          </button>
        </>
      )}
      {switchSuccessful && (
        <Modal
          modalText="Switched To Client Successfully!"
          buttonText="Ok"
          closeModal={handleProceed}
        />
      )}
      {becomeClientSuccess && (
        <Modal
          modalText="You are Now A Client Successfully!"
          buttonText="Ok"
          closeModal={handleProceed}
        />
      )}
      {alreadyAclient && (
        <Modal
          modalText="You are Already A Client! Please Switch!"
          buttonText="Ok"
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default SwitchToClient;
