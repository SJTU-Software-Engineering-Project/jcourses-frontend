import React, { useState } from "react";
import "../styles/StarRating.css";

function StarRating({rating, setRating, hover, setHover, validate, setValidate})  {
  return (
    <div >
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => {setRating(index); setValidate(true)}}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })} {!validate &&<label style={{color:"red", fontWeight:"bold"}}>Required!</label>}
    </div>
  );
};

export default StarRating;