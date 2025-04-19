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
    problemContent: {
      title: "Delayed Urgent Care",
      description:
        "1 in 4 ER patients experience <strong>delayed care.</strong> <br/> For cases like heart attacks, <strong><u>each minute counts.</u></strong>",
    },
    solutionContent: {
      title: "Delayed Urgent Care",
      description:
        "Carol seeks to deploy real-time digital coordination tools across ER teams, cardiology, and cath labs to minimize treatment delays and streamline urgent decision-making.",
    },
    source:
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11099802/#:~:text=Overall%2C%20the%20median%20door%2Dto,MCS%20device%20use%20were%20small.",
  },
  "top-right": {
    video: blockchain,
    image: blockchain_image,
    problemContent: {
      title: "Rising Threats to Patient Data",
      description:
        "Since 2020, <strong>700+ annual breaches</strong> have exposed <strong>hundreds of millions</strong> of patient records—one alone affected <strong>100 million</strong>.",
    },
    solutionContent: {
      title: "Blockchain",
      description:
        "Carol secures patient data through blockchain and zero-trust systems, ensuring privacy and trust at every level.",
    },
    source:
      "https://www.definitivehc.com/resources/healthcare-insights/most-common-healthcare-data-breaches#:~:text=How%20many%20healthcare%20data%20breaches,year%20was%20already%20nearly%20100",
  },
  "bottom-left": {
    video: burnout,
    image: ai_driven,
    problemContent: {
      title: "Administrative Burden",
      description:
        "<strong>46% of rheumatologists report burnout</strong>, with administrative burden being a primary contributor to emotional exhaustion and reduced clinical efficiency.",
    },
    solutionContent: {
      title: "Automated Clinical Documentation",
      description:
        "Carol will offer AI-powered annotated transcription and documentation tools that automatically capture and summarize clinical interactions—freeing providers to focus on critical patient care.",
    },
    source: "https://pubmed.ncbi.nlm.nih.gov/32238512/",
  },
  "bottom-right": {
    video: ofline_mov,
    image: ofline_care,
    problemContent: {
      title: "Rural Primary Care Shortage",
      description:
        "Rural areas face a growing shortage of primary care physicians, with only <strong>65 per 100,000 residents</strong>.",
    },
    solutionContent: {
      title: "Telemedicine",
      description:
        "Carol will leverage standardized digital protocols and clinical decision support to ensure uniform, bias-free treatment across all demographics.",
    },
    source:
      "https://www.estprs.com/2020/02/13/telehealth-and-americas-rural-communities/?utm_source=chatgpt.com",
  },
  center: {
    problemContent: {
      title: "Our Vision",
      description:
        "At Carol, we recognize the pressing challenges in today's healthcare system and are committed to implementing targeted solutions to enhance patient care and provider efficiency.",
    },
  },
};

// -----------------------------
// MediaCarousel Component using react-responsive-carousel
// -----------------------------
const MediaCarousel = ({ video, image, problemContent, solutionContent }) => {
  const slides = [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (video) {
    slides.push({ type: "video", src: video, content: problemContent });
  }
  if (image) {
    slides.push({ type: "image", src: image, content: solutionContent });
  }

  if (slides.length === 0) return null;

  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container xl:w-full w-screen p-10 h-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        swipeable
        interval={8000}
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
            className="flex flex-col items-center justify-center w-full h-full"
          >
            {slide.type === "video" ? (
              <video
                key={`video-${index}-${
                  activeIndex === index ? "active" : "inactive"
                }`}
                src={slide.src}
                autoPlay
                muted
                playsInline
                className="object-contain w-full max-w-[800px] max-h-[800px]"
              />
            ) : (
              <img
                className="object-contain rounded-2xl w-full max-w-[800px] max-h-[800px]"
                src={slide.src}
                alt={`slide-${index}`}
              />
            )}

            {slide.content && (
              <div className="mt-4 p-2 w-full">
                <h2 className="title font-bold text-center">
                  {slide.content.title}
                </h2>
                <p className="text text-center lg:text-2xl text-base mt-1 p-5">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: slide.content.description,
                    }}
                  />
                </p>
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </div>
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
    const segmentKey = data.segment || "center";

    if (segmentKey === activeSegmentKey && segmentKey !== "center") {
      setSelectedSegment(segmentContents.center);
      setActiveSegmentKey("center");
    } else {
      setSelectedSegment(segmentContents[segmentKey] || segmentContents.center);
      setActiveSegmentKey(segmentKey);
    }
    setVisibleTooltip(null);
  };

  // Handle information icon click to show source webs
  // const handleInfoClick = (e, segmentKey) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   if (window.innerWidth < 1024) {
  //     if (visibleTooltip === segmentKey) {
  //       setVisibleTooltip(null);
  //       window.open(selectedSegment.source, "_blank");
  //     } else {
  //       setVisibleTooltip(segmentKey);
  //     }
  //   } else {
  //     window.open(selectedSegment.source, "_blank");
  //   }
  // };

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power1.inOut" }
    );
    setVisibleTooltip(null);
  }, [selectedSegment]);

  useEffect(() => {
    const handleClickOutside = (e) => {
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
      className="flex xl:flex-row flex-col w-screen items-center xl:gap-10 gap-5 p-10"
    >
      {/* Content container */}
      <div
        className="flex flex-col items-center justify-center xl:w-1/2 w-full h-full p-5 order-2"
        ref={contentRef}
      >
        {selectedSegment.video || selectedSegment.image ? (
          <div className="flex items-center justify-center w-full mb-5">
            <MediaCarousel
              video={selectedSegment.video}
              image={selectedSegment.image}
              problemContent={selectedSegment.problemContent}
              solutionContent={selectedSegment.solutionContent}
            />
          </div>
        ) : (
          // For the center segment only – display text content using the same styling as the carousel slide.
          activeSegmentKey === "center" &&
          selectedSegment.problemContent && (
            <div className="w-full mb-5">
              <div className="mt-4 p-3 w-full">
                <h2 className="title font-bold text-center">
                  {selectedSegment.problemContent.title}
                </h2>
                <p className="text text-center">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: selectedSegment.problemContent.description,
                    }}
                  />
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex xl:h-full h-fit xl:w-1/2 w-full items-center justify-center order-1">
        <Wheel2 onSegmentClick={handleSegmentClick} />
      </div>
    </section>
  );
};

export default OurTech2;
