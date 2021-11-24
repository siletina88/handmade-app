import React, { useEffect } from "react";

import { ModalClassic } from "../components";

const UserVerificationSuccess = () => {
  const showModal = true;
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <ModalClassic
        trigger={showModal}
        message='Uspjesno ste verfikovali vasu email adresu. Uskoro cete biti preusmjereni na stranicu za prijavu!'
        heading='Nalog je verifikovan'
        timeout='5000'
        redirectTo='/login'
        type='success'
      ></ModalClassic>
    </>
  );
};

export default UserVerificationSuccess;
