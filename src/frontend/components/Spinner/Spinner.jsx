import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="loader">
      {/* <ClipLoader color="#52bfd9" size={100} /> */}
      {/* <HashLoader color="#36d7b7" size={100} /> */}
      {/* <SyncLoader color="#36d7b7" size={100} /> */}
      {/* <RingLoader color="#be123c" size={100} /> */}

      <PulseLoader color="#e11d48" size={25} />
    </div>
  );
};

export default Spinner;
