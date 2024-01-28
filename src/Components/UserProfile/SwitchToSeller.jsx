import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";

const SwitchToSeller = () => {
  const role = sessionStorage.getItem("role");
  const [switchSuccessful, setSwitchSuccessful] = useState(false);
  const [becomeClientSuccess, setBecomeClientSuccess] = useState(false);
  const [alreadyAVendor, setAlreadyAVendor] = useState(false);
  const [askToSwitch, setAskToSwitch] = useState(false);
  const wurl = "https://chair-ismatic-backend.onrender.com";
  const email = sessionStorage.getItem("loggedInUserEmail");

  useEffect(() => {
    const checkIsVendor = async () => {
      try {
        const response = await axios.get(wurl + `/user/checkIsVendor/${email}`);
        if (response.data.isClient) {
          setAlreadyAVendor(true);
        } else {
          setAskToSwitch(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIsVendor();
  }, [email]);

  const switchToClient = async () => {
    try {
      const response = await axios.put(wurl + `/user/updateIsVendor/${email}`);

      if (response.data.message === "is_client updated successfully") {
        sessionStorage.setItem("role", "vendor");
        setSwitchSuccessful(true);
        setAskToSwitch(false);
        setAlreadyAVendor(false);
      } else {
        setAlreadyAVendor(true);
        setAskToSwitch(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const becomeClient = async () => {
    try {
      const response = await axios.get(wurl + `/user/checkIsVendor/${email}`);

      if (!response.data.isClient) {
        await axios.put(wurl + `/user/updateIsVendor/${email}`);
        sessionStorage.setItem("role", "vendor");
        setBecomeClientSuccess(true);
        setAskToSwitch(false);
        setAlreadyAVendor(false);
      } else {
        setAskToSwitch(true);
        setAlreadyAVendor(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setSwitchSuccessful(false);
    setBecomeClientSuccess(false);
    setAlreadyAVendor(false);
  };
  const handleProceed = () => {
  sessionStorage.removeItem("cart");
  window.location.reload();
  };
  return (
    <div>
      <p className="userTitle"> Switch To Vendor </p>
      {askToSwitch && (
        <p className="">You are not a vendor. Do you want to switch?</p>
      )}
      {alreadyAVendor && role == "vendor" && (
        <p className="">You are already a vendor! No need to switch.</p>
      )}
      {askToSwitch && (
        <button
          type="button"
          className="saveBtns updateBtn"
          onClick={switchToClient}
        >
          Switch To vendor
        </button>
      )}
      {!alreadyAVendor && (
        <>
          {" "}
          <p className="">Not A vendor? Become One</p>
          <button
            type="button"
            className="saveBtns updateBtn"
            onClick={becomeClient}
          >
            Become A Vendor
          </button>
        </>
      )}
      {switchSuccessful && (
        <Modal
          modalText="Switched To Vendor Successfully!"
          buttonText="Ok"
          closeModal={handleProceed}
        />
      )}
      {becomeClientSuccess && (
        <Modal
          modalText="You are Now A Vendor Successfully!"
          buttonText="Ok"
          closeModal={handleProceed}
        />
      )}
      {alreadyAVendor && (
        <Modal
          modalText="You are Already A Vendor! Please Switch!"
          buttonText="Ok"
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default SwitchToSeller;
