import React, { useState } from "react";
import "../styles/Wheel2.css";
import logo from "../assets/logo.png";

// Note: Accept the onSegmentClick prop from the parent
const Wheel2 = ({ onSegmentClick }) => {
  const [centerContent, setCenterContent] = useState({
    title: "carol",
    logo: logo,
    description: ["Advanced Healthcare 4.0 with AI and Automation"],
  });

  // Track which segment is selected
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Content for each segment
  const segmentContents = {
    "top-left": {
      title:
        "Digital Twins <br/> and World Models <br/> for Holistic Healthcare",
      description: [
        "Carol's world models use digital twins to simulate patient outcomes and optimize care. By integrating history, real-time data, and predictions, they enable timely risk assessment and protocol adherence.",
      ],
    },
    "top-right": {
      title: "Blockchain Enabled Security, Privacy, and Data Integrity",
      description: [
        "Blockchain integration ensures data security, transparency, and trust. With immutable patient records and verifiable data sources, our system supports fair, bias-free medical decisions across the healthcare continuum.",
      ],
    },
    "bottom-left": {
      title: "AI Driven Digital <br/> Patient Management System",
      description: [
        "Our AI-driven Digital Patient Management System primes clinicians through pre-generated text to speech patient summaries and leverages voice commands and generative AI to streamline documentation, generate actionable insights, and reduce clinician workload. By embedding bias detection and correction mechanisms, we ensure equitable and data-informed decision-making.",
      ],
    },
    "bottom-right": {
      title: "Offline Digital Care",
      description: [
        "Carol's Internet of Medical Things enabled applications will strive to reach underserved populations, improving access to care regardless of location or insurance status.",
      ],
    },
    default: {
      title: "carol",
      logo: logo,
      description: ["Advanced Healthcare 4.0 with AI and Automation"],
    },
  };

  // Handle segment click
  const handleSegmentClick = (segment, content) => {
    if (selectedSegment === segment) {
      // Deselect the segment
      setSelectedSegment(null);
      setCenterContent(segmentContents.default);
      // Send message to parent: segment deselected
      if (onSegmentClick) {
        onSegmentClick({
          segment,
          action: "deselected",
          content: segmentContents.default,
        });
      }
    } else if (selectedSegment === null) {
      // Only select a new segment if no segment is currently selected
      setSelectedSegment(segment);
      setCenterContent(content);
      // Send message to parent: segment selected
      if (onSegmentClick) {
        onSegmentClick({
          segment,
          action: "selected",
          content: content,
        });
      }
    } else {
      // If another segment is already selected, reset to center first
      setSelectedSegment(null);
      setCenterContent(segmentContents.default);
      // Notify parent of reset
      if (onSegmentClick) {
        onSegmentClick({
          segment: "center",
          action: "reset",
          content: segmentContents.default,
        });
      }
    }
  };

  // Reset to default
  const handleCenterClick = () => {
    setSelectedSegment(null);
    setCenterContent(segmentContents.default);
    // Optionally, you might want to notify the parent when the center is clicked, too.
    if (onSegmentClick) {
      onSegmentClick({
        segment: "center",
        action: "reset",
        content: segmentContents.default,
      });
    }
  };

  // Generate segment class based on selection state
  const getSegmentClass = (segment) => {
    const baseClass = `segment ${segment} transition-all duration-300`;
    const hoverClass = "hover:shadow-inner hover:scale-[1.03] cursor-pointer";
    const colorClass = {
      "top-left": "hover:bg-blue-200",
      "top-right": "hover:bg-green-200",
      "bottom-left": "hover:bg-yellow-200",
      "bottom-right": "hover:bg-red-200",
    }[segment];

    // Apply opacity to all segments when any segment is selected
    const opacityClass = selectedSegment ? "opacity-30" : "";

    // Add active class for the selected segment including move-to-center animation
    const activeClass =
      selectedSegment === segment
        ? "scale-[1.03] shadow-inner move-to-center"
        : "";

    return `${baseClass} ${colorClass} ${hoverClass} ${opacityClass} ${activeClass}`;
  };

  return (
    <div className="wheel-container">
      <div className="wheel">
        {/* Four segments */}
        <div
          className={getSegmentClass("top-left")}
          onClick={() =>
            handleSegmentClick("top-left", segmentContents["top-left"])
          }
        >
          <div className="segment-content">
            <h3>Digital Twins and World Models for Holistic Healthcare</h3>
          </div>
        </div>

        <div
          className={getSegmentClass("top-right")}
          onClick={() =>
            handleSegmentClick("top-right", segmentContents["top-right"])
          }
        >
          <div className="segment-content">
            <h3>Blockchain Enabled Security and Data Integrity</h3>
          </div>
        </div>

        <div
          className={getSegmentClass("bottom-left")}
          onClick={() =>
            handleSegmentClick("bottom-left", segmentContents["bottom-left"])
          }
        >
          <div className="segment-content">
            <h3>AI Driven Digital Patient Management System</h3>
          </div>
        </div>

        <div
          className={getSegmentClass("bottom-right")}
          onClick={() =>
            handleSegmentClick("bottom-right", segmentContents["bottom-right"])
          }
        >
          <div className="segment-content">
            <h3>Offline Digital Care</h3>
          </div>
        </div>

        {/* Center circle */}
        <div
          className="center-circle transition-all duration-300 hover:border-blue-500 hover:shadow-xl cursor-pointer z-10"
          onClick={handleCenterClick}
        >
          <h2 className="text-3xl">
            {<span dangerouslySetInnerHTML={{ __html: centerContent.title }} />}
          </h2>
          {centerContent.description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wheel2;
