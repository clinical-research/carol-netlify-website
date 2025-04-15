import React from "react";
import robot from "../assets/robot-hand.png";
import virtual from "../assets/virtual-reality.png";
import digital from "../assets/digital-twin.png";

const Future = () => {
  // Array of technology data
  const technologies = [
    {
      title: "Digital Twins",
      description:
        "For personalized medicine, predictive care, and real-time simulations.",
      image: digital,
      color: "bg-red-400",
      textColor: "text-black",
      readyText: "Coming Soon",
    },
    {
      title: "AI-Powered Robotics",
      description:
        "For surgical precision, patient monitoring, and hospital automation.",
      image: robot,
      color: "bg-yellow-300",
      textColor: "text-black",
      readyText: "Coming Soon",
    },
    {
      title: "Augmented & Virtual Reality",
      description:
        "To transform medical training, surgical planning, and patient education.",
      image: virtual,
      color: "bg-pink-300",
      textColor: "text-black",
      readyText: "Coming Soon",
    },
  ];

  return (
    <div className="flex flex-col items-center bg-gray-200 h-fit w-screen p-5">
      <h1 className="title mb-10">Next-Generation Innovations</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full p-10 justify-items-center lg:gap-3 gap-y-10">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className={`flex flex-col ${tech.color} shadow-2xl hover:shadow-3xl transition-all 
            duration-300 transform hover:scale-105 p-5 items-start border-2 overflow-hidden 
            lg:justify-between justify-center rounded-3xl h-full w-full max-w-[450px] max-h-[650px]`}
          >
            <div className="mb-3">
              <img
                src={tech.image}
                alt={tech.title}
                className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] lg:w-[280px] lg:h-[280px] object-contain mb-4"
              />
              <h1
                className={`text-3xl md:text-4xl lg:text-5xl font-bold ${tech.textColor}`}
              >
                {tech.title}
              </h1>
            </div>

            <div className="w-full flex-grow flex flex-col justify-end">
              <div className="border-t border-black w-full my-3"></div>
              <p
                className={`text-base md:text-lg lg:text-xl ${tech.textColor}`}
              >
                {tech.description}
              </p>
              <div className="border-t border-black w-full my-3"></div>

              <div className="flex justify-between items-center">
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
                  {tech.readyText}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Future;
