import React from "react";
import Button from "../compontents/Button";

export default function Notfound() {
  return (
    <div className="notfound-page">
      <h1>404 Page Not Found</h1>
      <img
        src="../assets/images/folder.png"
        alt="error image"
        className="error-image"
      />
      <Button
        name="Go Back"
        color="#fff"
        backgroundColor="#1E90FF"
        onClick={() => window.history.back()}
      />
    </div>
  );
}
