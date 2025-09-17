import React from 'react'
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
   return (
     <div className="footer">
       <div className="footer-icons">
         <button className="footer-button">
           <FaFacebook />
         </button>
         <button className="footer-button">
           <FaTwitter />
         </button>
         <button className="footer-button">
           <FaInstagram />
         </button>
       </div>
       <p className="footer-text">@copy right 2025</p>
       <p className="footer-text">Bongeka Bhungane</p>
     </div>
   );
}
