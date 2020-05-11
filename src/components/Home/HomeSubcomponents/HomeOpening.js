import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { GoPrimitiveDot } from 'react-icons/go';


function HomeOpening() {
  return (
    <div id="home-opening">
      <h1>
        hey there, you
        <span> look</span>
        in
        <span> smart!</span>
      </h1>
      <h1>
        how about, start
        <span> cook</span>
        in
        <span> smart?</span>
      </h1>
      <p className="desktop">Find out how</p>
      <p className="tablet">Swipe left and find out how</p>
      <div className="dot-indicators">
        <GoPrimitiveDot className="dot active" />
        <GoPrimitiveDot className="dot" />
        <GoPrimitiveDot className="dot" />
      </div>
      <a href="#home-ingredients"><IoIosArrowForward className="nxt-icon" /></a>
    </div>
  );
}

export default HomeOpening;
