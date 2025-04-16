import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap"; // Import GSAP for animations
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel CSS
import Wheel2 from "./Wheel2";
import d2bVideo from "../assets/d2b_vid_2.mov";
import burnout from "../assets/burnout.mov";
import ai_driven from "../assets/ai_driven.png";
import digital_twin from "../assets/digital.png";
import ofline_care from "../assets/ofline_care.png";
import ofline_mov from "../assets/ofline_care2.mov";
import blockchain from "../assets/blockchain.mov";
import blockchain_image from "../assets/blockchain.png";
import {
  IoIosInformationCircle,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";

import "../styles/OurTech2.css";

// Define segmentContents before using it in state initialization
const segmentContents = {
  "top-left": {
    video: d2bVideo,
    image: digital_twin,
    content: {
      title: "Delayed Urgent Care",
      description:
        "1 in 4 ER patients experience <strong>delayed care.</strong> <br/> For cases like heart attacks, <strong><u>each minute counts.</u></strong>",
    },
    source:
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11099802/#:~:text=Overall%2C%20the%20median%20door%2Dto,MCS%20device%20use%20were%20small.",
  },
  "top-right": {
    video: blockchain,
    image: blockchain_image,
    content: {
      title: "Rising Threats to Patient Data",
      description:
        "Since 2020, <strong> 700+ annual breaches </strong> have exposed <strong> hundreds of millions </strong> of patient records—one alone affected <strong> 100 million</strong>.",
    },
    source:
      "https://www.definitivehc.com/resources/healthcare-insights/most-common-healthcare-data-breaches#:~:text=How%20many%20healthcare%20data%20breaches,year%20was%20already%20nearly%20100",
  },
  "bottom-left": {
    video: burnout,
    image: ai_driven,
    content: {
      title: "Administrative Burden",
      description:
        "<strong>46% of rheumatologists report burnout</strong>, with administrative burden being a primary contributor to emotional exhaustion and reduced clinical efficiency.",
    },
    source: "https://pubmed.ncbi.nlm.nih.gov/32238512/",
  },
  "bottom-right": {
    video: ofline_mov,
    image: ofline_care,
    content: {
      title: "Rural Primary Care Shortage",
      description:
        "Rural areas face a growing shortage of primary care physicians, with only <strong> 65 per 100,000 residents</strong>.",
    },
    source:
      "https://www.estprs.com/2020/02/13/telehealth-and-americas-rural-communities/?utm_source=chatgpt.com",
  },
  center: {
    content: {
      title: "Our Vision",
      description:
        "At Carol, we recognize the pressing challenges in today's healthcare system and are committed to implementing targeted solutions to enhance patient care and provider efficiency.",
    },
  },
};

// -----------------------------
// MediaCarousel Component using react-responsive-carousel
// -----------------------------
const MediaCarousel = ({ video, image }) => {
  const slides = [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (video) {
    slides.push({ type: "video", src: video });
  }
  if (image) {
    slides.push({ type: "image", src: image });
  }

  if (slides.length === 0) return null;

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      swipeable
      interval={5000}
      transitionTime={1000}
      stopOnHover={false}
      onChange={handleSlideChange}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="control-arrow control-prev"
          >
            <IoIosArrowBack className="custom-arrow-icon" />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="control-arrow control-next"
          >
            <IoIosArrowForward className="custom-arrow-icon" />
          </button>
        )
      }
    >
      {slides.map((slide, index) => (
        <div
          key={`media-slide-${index}`}
          className="flex items-center justify-center lg:h-[600px] h-auto max-h-[70vh]"
        >
          {slide.type === "video" ? (
            // Using a key based on activeIndex forces the video to remount when cycling back
            <video
              key={`video-${index}-${
                activeIndex === index ? "active" : "inactive"
              }`}
              src={slide.src}
              autoPlay
              muted
              className="object-contain w-full max-h-[70vh]"
              style={{ maxWidth: "100%" }}
            />
          ) : (
            <div className="flex border-2 border-gray-200 rounded-3xl w-fit lg:h-full xl:h-fit h-fit p-5">
              <img
                className="object-contain"
                src={slide.src}
                alt={`slide-${index}`}
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          )}
        </div>
      ))}
    </Carousel>
  );
};

// -----------------------------
// OurTech2 Component
// -----------------------------
const OurTech2 = () => {
  // Initialize the segment content state
  const [selectedSegment, setSelectedSegment] = useState(
    segmentContents.center
  );
  // Add state to track which tooltip is visible
  const [visibleTooltip, setVisibleTooltip] = useState(null);
  // Add state to track the currently active segment key
  const [activeSegmentKey, setActiveSegmentKey] = useState("center");

  // Create a ref to target the content container
  const contentRef = useRef(null);

  // Handle segment clicks
  const handleSegmentClick = (data) => {
    console.log("Segment clicked:", data);
    const segmentKey = data.segment || "center";

    // If clicking the same segment that's already active, reset to center
    if (segmentKey === activeSegmentKey && segmentKey !== "center") {
      setSelectedSegment(segmentContents.center);
      setActiveSegmentKey("center");
    } else {
      // Otherwise, set to the clicked segment
      setSelectedSegment(segmentContents[segmentKey] || segmentContents.center);
      setActiveSegmentKey(segmentKey);
    }

    // Close any open tooltip when changing segments
    setVisibleTooltip(null);
  };

  // Handle information icon click
  const handleInfoClick = (e, segmentKey) => {
    // Always prevent default to handle navigation manually
    e.stopPropagation();
    e.preventDefault();

    // For mobile devices
    if (window.innerWidth < 1024) {
      if (visibleTooltip === segmentKey) {
        // Second click - navigate to source
        setVisibleTooltip(null);
        window.open(selectedSegment.source, "_blank");
      } else {
        // First click - show tooltip
        setVisibleTooltip(segmentKey);
      }
    } else {
      // Desktop behavior - direct navigation
      window.open(selectedSegment.source, "_blank");
    }
  };

  // Animate the content whenever selectedSegment changes
  useEffect(() => {
    // Animate the entire content container from opacity 0 to 1
    gsap.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power1.inOut" }
    );

    // Close tooltip when segment changes
    setVisibleTooltip(null);
  }, [selectedSegment]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only close if clicking outside tooltip area
      if (visibleTooltip && !e.target.closest(".info-icon-container")) {
        setVisibleTooltip(null);
      }
    };

    if (visibleTooltip) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [visibleTooltip]);

  return (
    <section
      id="our-vision"
      className="flex xl:flex-row flex-col w-screen h-fit items-center p-10"
    >
      {/* Content container with text and carousel */}
      <div
        className="flex flex-col items-center justify-center w-full h-full p-5 order-2"
        ref={contentRef}
      >
        {/* Media Carousel: video slide will show first, followed by the image slide */}
        {(selectedSegment.video || selectedSegment.image) && (
          <div className="w-full mb-5">
            <MediaCarousel
              video={selectedSegment.video}
              image={selectedSegment.image}
            />
          </div>
        )}

        <div className="flex flex-col items-center w-full h-full gap-3">
          <h1 className="title font-bold text-center lg:text-5xl text-2xl flex items-center justify-center gap-2">
            {selectedSegment.content.title}
            {selectedSegment.source && (
              <div className="relative info-icon-container">
                <span
                  className="flex items-center justify-center lg:text-[22px] text-[15px] cursor-pointer lg:mt-2 mt-1"
                  onClick={(e) =>
                    handleInfoClick(e, selectedSegment.content.title)
                  }
                >
                  <IoIosInformationCircle />
                </span>
                {visibleTooltip === selectedSegment.content.title && (
                  <div
                    className="absolute left-0 transform -translate-x-1/2 -top-30 bg-black text-white p-3 rounded-md text-sm z-10 w-64 text-center opacity-45 lg:hidden cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(selectedSegment.source, "_blank");
                      setVisibleTooltip(null);
                    }}
                  >
                    Go to Source - {selectedSegment.source}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-3 h-3 bg-black "></div>
                  </div>
                )}
              </div>
            )}
          </h1>
          <p className="text text-center lg:text-3xl text-xl">
            <span
              dangerouslySetInnerHTML={{
                __html: selectedSegment.content.description,
              }}
            />
          </p>
        </div>
      </div>

      <div className="flex h-full w-full items-center justify-center order-1">
        <Wheel2 onSegmentClick={handleSegmentClick} />
      </div>
    </section>
  );
};

export default OurTech2;
