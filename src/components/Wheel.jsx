import React, { useState } from "react";
import "../styles/Wheel.css";
import logo from "../assets/logo.png";

const Wheel = () => {
  const [centerContent, setCenterContent] = useState({
    title: "carol",
    logo: logo,
    description: ["Advanced Healthcare 4.0 with AI and Automation"],
  });

  // Track which segment is selected
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Content for each segment
  const segmentContents = {
    topLeft: {
      description: [
        "Blockchain integration ensures data security, transparency, and trust. With immutable patient records and verifiable data sources, our system supports fair, bias-free medical decisions across the healthcare continuum.",
      ],
    },
    topRight: {
      description: [
        "Carol’s world models intend to leverage digital twin technology to simulate and predict patient health outcomes, optimizing treatments and care pathways. These dynamic models offer personalized, unbiased healthcare by integrating medical history, real-time data, and predictive insights.",
      ],
    },
    bottomLeft: {
      description: [
        "Our AI-driven Digital Patient Management System uses voice commands and generative AI to streamline documentation, generate actionable insights, and reduce clinician workload. By embedding bias detection and correction mechanisms, we ensure equitable and data-informed decision-making.",
      ],
    },
    bottomRight: {
      description: [
        "Carol’s fine tuned AI models generate predictive insights that inform proactive care. By analyzing vast datasets within world models, our AI systems detect patterns and recommend treatments while identifying and mitigating potential biases.",
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
      // If clicking the already selected segment, deselect it
      setSelectedSegment(null);
      setCenterContent(segmentContents.default);
    } else {
      // Otherwise, select this segment and update center content
      setSelectedSegment(segment);
      setCenterContent(content);
    }
  };

  // Reset to default
  const handleCenterClick = () => {
    setSelectedSegment(null);
    setCenterContent(segmentContents.default);
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

    // Apply opacity to non-selected segments
    const opacityClass =
      selectedSegment && selectedSegment !== segment ? "opacity-30" : "";

    // Add active class for the selected segment
    const activeClass =
      selectedSegment === segment ? "scale-[1.03] shadow-inner" : "";

    return `${baseClass} ${colorClass} ${hoverClass} ${opacityClass} ${activeClass}`;
  };

  return (
    <div className="wheel-container">
      <div className="wheel">
        {/* Four segments - placed before the center circle in the DOM */}
        <div
          className={getSegmentClass("top-left")}
          onClick={() =>
            handleSegmentClick("top-left", segmentContents.topLeft)
          }
        >
          <div className="segment-content">
            <h3>Digital Twins and World Models for Holistic Healthcare</h3>
          </div>
        </div>

        <div
          className={getSegmentClass("top-right")}
          onClick={() =>
            handleSegmentClick("top-right", segmentContents.topRight)
          }
        >
          <div className="segment-content">
            <h3>Blockchain Enabled Security and Data Integrity</h3>
          </div>
        </div>

        <div
          className={getSegmentClass("bottom-left")}
          onClick={() =>
            handleSegmentClick("bottom-left", segmentContents.bottomLeft)
          }
        >
          <div className="segment-content">
            <h3>AI Driven Digital Patient Management System</h3>
          </div>
        </div>

        <div
          className={getSegmentClass("bottom-right")}
          onClick={() =>
            handleSegmentClick("bottom-right", segmentContents.bottomRight)
          }
        >
          <div className="segment-content">
            <h3>AI for Predictive Insights</h3>
          </div>
        </div>

        {/* Center circle - moved after segments to ensure it's on top */}
        <div
          className="center-circle transition-all duration-300 hover:border-blue-500 hover:shadow-xl cursor-pointer z-10"
          onClick={handleCenterClick}
        >
          <h2 className="text-3xl">{centerContent.title}</h2>
          {centerContent.description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wheel;
