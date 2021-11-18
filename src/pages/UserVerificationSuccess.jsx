import React, { useEffect } from "react";

import ModalSuccess from "../components/ModalSuccess";

import Slider from "../components/Slider";

const UserVerificationSuccess = () => {
  const showModal = true;
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <ModalSuccess
        trigger={showModal}
        message='Uspjesno ste verfikovali vasu email adresu. Uskoro cete biti preusmjereni na stranicu za prijavu!'
        heading='Nalog je verifikovan'
        timeout='5000'
        redirectTo='/login'
        type='success'
      ></ModalSuccess>
    </>
  );
};

export default UserVerificationSuccess;
