import React from "react";
import Leader from "./Leader";
import story from "../assets/our-story.jpg";
const Story = () => {
  return (
    <section
      id="story"
      className="flex w-full h-full flex-col items-center justify-center"
    >
      <div className="w-screen h-full flex items-center justify-center gap-10 p-10">
        <div className="flex lg:flex-row flex-col h-full items-center justify-center gap-10">
          <div className="flex w-full lg:w-1/2 h-auto p-2 justify-center items-center overflow-hidden">
            <img src={story} alt="story" className="object-cover rounded-3xl " />
          </div>
          <div className="flex flex-col lg:w-1/2 w-full h-auto gap-5 items-center justify-center">
            <h1 className="title text-4xl font-bold text-center">Our Story</h1>
            <p className="text text-center lg:px-10 px-0">
              Our story began with recognizing inefficiencies in modern day care
              delivery, particularly the cognitive burden on physicians
              constantly reorienting to each new patient. Conversations with
              clinic owners and observations in high-stress settings like the ER
              revealed how fragmented, static data slows care and limits
              meaningful engagement. This led us to focus on clinician
              priming—providing timely, context-rich information to improve
              decision-making for both clinicians and teams. Looking ahead, we
              aim to leverage world models to capture and predict the evolving
              medical environment, enabling real-time, proactive care. Our
              vision spans global health systems and includes expanding access
              in remote settings through edge-based solutions, building a more
              connected, efficient, private, and equitable future for
              healthcare.
            </p>
          </div>
        </div>
      </div>
      <Leader />
    </section>
  );
};

export default Story;
