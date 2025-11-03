import React from "react";
import Button from "../compontents/Button";
import folderImg from "../assets/images/folder.png"; 

export default function Notfound() {
  return (
    <div className="notfound-page">
      <h1 className="notfound-title">404 Page Not Found</h1>
      <img src={folderImg} alt="error image" className="error-image" />
      <Button
        name="Go Back"
        color="#fff"
        backgroundColor="#1E90FF"
        onClick={() => window.history.back()}
      />
    </div>
  );
}
