import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div
      style={{
        // width: "100px",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        // margin: "auto",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ClipLoader color="#52bfd9" size={100} />
    </div>
  );
};

export default Spinner;
