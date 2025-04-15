import React, { useState } from "react";
import defaultImage from "../assets/default.png";
import Junaid from "../assets/junaid.png";

const Leader = () => {
  // Add state to track which leader card is active (clicked)
  const [activeLeader, setActiveLeader] = useState(null);

  // Array of leaders data for easy addition of new leaders
  const leaders = [
    {
      id: 1,
      name: "Dr. Alhassan Yasin",
      position: "Chief Executive Officer",
      image: defaultImage,
      bio: "Experienced leader with a passion for innovation and strategic growth.",
    },
    {
      id: 2,
      name: "Junaid Ahmed",
      position: "Chief Technology Officer",
      image: Junaid,
      bio: "I'm a professor at Johns Hopkins focused on NLP-driven AI. With a background in bioinformatics and bioengineering, my research spans industry and academia, from graph PDE-based biological networks to currently building clinical world models.",
    },
    {
      id: 3,
      name: "Dr Alhussain Yasin",
      position: "Chief Medical Officer",
      image: defaultImage,
      bio: "Experienced leader with a passion for innovation and strategic growth.",
    },
    // Add more leaders here in the same format
    // Example:
    // {
    //   id: 2,
    //   name: "Another Person",
    //   position: "Chief Technology Officer",
    //   image: anotherPersonImage  // Don't forget to import this at the top
    // },
  ];

  return (
    <section id="leader" className="flex flex-col w-screen h-full lg:p-20 p-10">
      <div className="flex flex-col w-full justify-center items-center mb-15">
        <h1 className="title mb-2">Our Leadership</h1>
        <p className="text lg:text-2xl md:text-lg sm:text-md xs:text-sm text-center lg:px-30 md:px-10 px-5">
          Our leadership team comprises esteemed professors from Johns Hopkins
          University with deep expertise spanning AI, physics, engineering, and
          biology. With decades of combined research experience, they've led
          groundbreaking projects for institutions in the aerospace and medical
          device industries.
        </p>
      </div>
      <div className="flex w-full justify-center flex-wrap gap-10">
        {leaders.map((leader) => (
          <div
            key={leader.id}
            className={`flex w-[550px] justify-center rounded-4xl overflow-hidden transition-all duration-300 relative group shadow-md 
              ${
                activeLeader === leader.id
                  ? "scale-105 shadow-2xl"
                  : "hover:scale-105 hover:shadow-2xl"
              }`}
            onClick={() =>
              setActiveLeader(activeLeader === leader.id ? null : leader.id)
            }
          >
            <img
              src={leader.image}
              alt={leader.name}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay - changes on hover or click */}
            <div
              className={`absolute inset-0 transition-all duration-300 
              ${
                activeLeader === leader.id
                  ? "bg-gradient-to-b from-blue-500/60 to-black/70"
                  : "bg-black/20 group-hover:bg-gradient-to-b group-hover:from-blue-500/60 group-hover:to-black/70"
              }`}
            ></div>

            {/* Bio text that appears on hover or click */}
            <div
              className={`absolute top-0 left-0 lg:text-left text-center w-full p-6 text-white transition-opacity duration-300
              ${
                activeLeader === leader.id
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <p className="md:text-lg text-sm">{leader.bio}</p>
            </div>

            {/* Name and position info */}
            <div className="flex flex-col items-end h-full bg-transparent justify-end absolute bottom-0 right-0 w-full text-white p-4 text-right">
              <h3 className="md:text-2xl text-xl font-bold">{leader.name}</h3>
              <p className="md:text-md text-sm">{leader.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Leader;
