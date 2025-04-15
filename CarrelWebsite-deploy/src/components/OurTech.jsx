import React from "react";
import Wheel from "./Wheel";
const OurVision = () => {
  return (
    <section
      id="our-vision"
      className="flex lg:flex-row flex-col w-screen h-fit justify-around items-center"
    >
      <div className="flex flex-col items-center justify-center w-full p-5 gap-3">
        <h1 className="title lg:text-6xl text-4xl"> Our Technology </h1>
        <p className="text text-center">
          Empowering Next-Generation Healthcare with AI, Automation, Digital
          Twins and Blockchain
        </p>
      </div>
      <Wheel />
    </section>
  );
};

export default OurVision;
