import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import d2b from "../assets/d2b_graphic2.png";
import telehealth from "../assets/telehealth.png";
import desktop from "../assets/desktop.png";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Array of 6 different problem configurations, with updated keys
const problemsData = [
  {
    id: 1,
    title: "Our Mission",
    problem:
      "At Carol, we recognize the critical importance of rapid and efficient treatment for patients, particularly in urgent care situations where delays in care are correlated with increased mortality rates. We aim to address the following key challenges in management of such situations to optimize patient outcomes.",
    bgColor: "bg-[#4ecdc4]",
    textColor: "text-blue-950",
  },
  {
    id: 2,
    image: d2b,
    image2: desktop,
    imageSize: "w-1/2",
    title: "Delayed Door-to-Balloon Time",
    problem:
      "Approximately <strong>82%</strong> of MI patients experience D2B times over 90 minutes, leading to higher mortality rates.",
    solution:
      "We propose a coordinated care network that optimizes patient routing and speeds up intervention.",
    bgColor: "bg-[#4ecdc4]",
    textColor: "text-blue-950",
  },
  {
    id: 3,
    image: telehealth,
    image2: desktop,
    imageSize: "w-1/4",
    title: "Administrative Burden",
    problem:
      "Clinicians spend significant time on documentation, diverting attention from urgent patient care and potentially extending D2B times.",
    solution:
      "Our solution automates documentation and leverages technology to reduce manual tasks.",
    bgColor: "bg-[#6bde84]",
    textColor: "text-green-950",
  },
  {
    id: 4,
    image: d2b,
    image2: desktop,
    imageSize: "w-1/2",
    title: "Limited Access in Remote Settings",
    problem:
      "Patients in rural areas are less likely to undergo timely interventions, with only <strong>49.7%</strong> receiving cardiac catheterization compared to <strong>63.6%</strong> in urban settings.",
    solution:
      "We propose mobile intervention teams and telemedicine support to bridge the gap.",
    bgColor: "bg-[#ff8c42]",
    textColor: "text-orange-950",
  },
  {
    id: 5,
    image: d2b,
    image2: desktop,
    imageSize: "w-1/2",
    title: "Patient Unawareness",
    problem:
      "Misinterpretation of symptoms leads to delayed ER presentations in <strong>70%</strong> of MI patients.",
    solution:
      "We will launch educational initiatives and early screening programs to improve awareness.",
    bgColor: "bg-[#e56399]",
    textColor: "text-pink-950",
  },
];

const AnimatedComponent = () => {
  // State to track the current active page index (starting at zero)
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const problemRefs = useRef([]); // for card container elements
  const titleRefs = useRef([]);
  const problemTextRef = useRef([]); // these will now represent the problem text
  const solutionRefs = useRef([]); // new refs for solution text
  const problemImageRefs = useRef([]); // single ref for images that will change
  const solutionImageRefs = useRef([]); // new refs for solution images

  useEffect(() => {
    // Initialize refs only once
    problemRefs.current = Array(problemsData.length)
      .fill()
      .map((_, i) => problemRefs.current[i] || React.createRef());

    titleRefs.current = Array(problemsData.length)
      .fill()
      .map((_, i) => titleRefs.current[i] || React.createRef());

    problemTextRef.current = Array(problemsData.length)
      .fill()
      .map((_, i) => problemTextRef.current[i] || React.createRef());

    solutionRefs.current = Array(problemsData.length)
      .fill()
      .map((_, i) => solutionRefs.current[i] || React.createRef());

    problemImageRefs.current = Array(problemsData.length)
      .fill()
      .map((_, i) => problemImageRefs.current[i] || React.createRef());

    solutionImageRefs.current = Array(problemsData.length)
      .fill()
      .map((_, i) => solutionImageRefs.current[i] || React.createRef());

    // Set initial state - only first card visible; text elements positioned
    problemRefs.current.forEach((ref, index) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: index === 0 ? 1 : 0 });
      }

      if (titleRefs.current[index]?.current) {
        gsap.set(titleRefs.current[index].current, {
          y: -100,
          opacity: index === 0 ? 1 : 0,
        });
      }

      if (problemTextRef.current[index]?.current) {
        // Set problem text to be centered initially
        gsap.set(problemTextRef.current[index].current, {
          y: -50,
          opacity: index === 0 ? 1 : 0,
          x: 0, // Start in the center
          width: "100%", // Full width initially
        });
      }

      if (solutionRefs.current[index]?.current) {
        // Set solution to start small and invisible
        gsap.set(solutionRefs.current[index].current, {
          y: -50,
          opacity: 0,
          scale: 0.3, // Start small
          x: 200, // Start off-screen to the right
        });
      }
    });

    // Set initial state for images
    problemsData.forEach((problem, index) => {
      if (problem.image && problemImageRefs.current[index]?.current) {
        gsap.set(problemImageRefs.current[index].current, {
          opacity: index === 0 ? 1 : 0,
          attr: { src: problem.image }, // Set initial image source
        });
      }
    });

    // Pin the container while scrolling through sections
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${problemsData.length * 2700}vh`,
        pin: true,
        scrub: 3.5,
        anticipatePin: 1,
      },
    });

    // Animate first card's text elements initially
    tl.to(
      titleRefs.current[0].current,
      { y: 0, opacity: 1, duration: 0.8 },
      0.2
    );
    tl.to(
      problemTextRef.current[0].current,
      { y: 0, opacity: 1, duration: 0.8 },
      0.4
    );

    // Add a delay before moving the problem to the left
    if (solutionRefs.current[0]?.current) {
      // First fade out the problem text with a slightly longer delay
      tl.to(
        problemTextRef.current[0].current,
        {
          opacity: 0,
          x: -100,
          duration: 0.8,
        },
        3.0
      );

      // Then bring in the solution from the right with additional delay
      tl.to(
        solutionRefs.current[0].current,
        {
          y: -50,
          opacity: 1,
          x: 0,
          scale: 1.3,
          duration: 0.8,
          ease: "back.out(2.0)",
        },
        3.2
      );
      tl.to(
        solutionImageRefs.current[0].current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        3.2
      );

      // Then settle to normal size
      tl.to(
        solutionRefs.current[0].current,
        {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        4.0
      );
    }

    // Create fade transitions between sections with coordinated animations
    problemRefs.current.forEach((ref, index) => {
      if (index < problemsData.length - 1) {
        // Current card fade out
        tl.to(
          titleRefs.current[index].current,
          {
            opacity: 0,
            y: 50,
            duration: 2.0,
            ease: "power2.inOut",
          },
          index * 6 + 4.5
        );
        tl.to(
          problemTextRef.current[index].current,
          {
            opacity: 0,
            y: 50,
            x: 0,
            width: "100%",
            duration: 2.0,
            ease: "power2.inOut",
          },
          index * 6 + 4.6
        );
        if (solutionRefs.current[index]?.current) {
          tl.to(
            solutionRefs.current[index].current,
            {
              opacity: 0,
              y: 0,
              x: 200,
              scale: 0.5,
              duration: 2.0,
              ease: "power2.inOut",
            },
            index * 6 + 4.7
          );
        }
        tl.to(
          ref.current,
          {
            opacity: 0,
            duration: 2.5,
            ease: "power2.inOut",
          },
          index * 6 + 4.8
        );

        if (
          problemsData[index].image &&
          problemImageRefs.current[index]?.current
        ) {
          tl.to(
            problemImageRefs.current[index].current,
            {
              opacity: 0,
              duration: 2.0,
              ease: "power2.inOut",
            },
            index * 6 + 4.6
          );
        }

        // Next card fade in
        tl.to(
          problemRefs.current[index + 1].current,
          {
            opacity: 1,
            duration: 2.5,
            ease: "power1.inOut",
          },
          index * 6 + 4.9
        );
        tl.to(
          titleRefs.current[index + 1].current,
          {
            y: 0,
            opacity: 1,
            duration: 2.0,
            ease: "power2.out",
          },
          index * 6 + 5.1
        );
        tl.to(
          problemTextRef.current[index + 1].current,
          {
            y: 0,
            opacity: 1,
            x: 0,
            width: "100%",
            duration: 2.0,
            ease: "power2.out",
          },
          index * 6 + 5.2
        );

        if (
          problemsData[index + 1].image &&
          problemImageRefs.current[index + 1]?.current
        ) {
          // Set the image source directly
          tl.set(
            problemImageRefs.current[index + 1].current,
            {
              attr: { src: problemsData[index + 1].image },
            },
            index * 6 + 4.9
          );

          tl.to(
            problemImageRefs.current[index + 1].current,
            {
              opacity: 1,
              duration: 2.0,
              ease: "power2.out",
            },
            index * 6 + 5.1
          );
        }

        // Add a longer delay before fading out problem and showing solution
        if (solutionRefs.current[index + 1]?.current) {
          // First fade out the problem text
          tl.to(
            problemTextRef.current[index + 1].current,
            {
              opacity: 0,
              scale: 0.5,
              duration: 1.5,
              ease: "power2.inOut",
            },
            index * 6 + 8.5
          );

          // Then bring in the solution from the right with balloon effect
          tl.to(
            solutionRefs.current[index + 1].current,
            {
              y: 0,
              opacity: 1,
              x: 0,
              scale: 1.3,
              duration: 2.0,
              ease: "back.out(1.7)", // Slightly less bouncy for smoother effect
            },
            index * 6 + 8.2
          );

          // Then settle to normal size
          tl.to(
            solutionRefs.current[index + 1].current,
            {
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            index * 6 + 12.0
          );
        }
      }
    });

    // Update the active page index based on scroll progress.
    tl.eventCallback("onUpdate", () => {
      const progress = tl.scrollTrigger.progress; // progress between [0, 1]
      const calculatedIndex = Math.min(
        problemsData.length - 1,
        Math.floor(progress * problemsData.length)
      );
      setActiveIndex(calculatedIndex);
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center h-screen w-full overflow-hidden"
    >
      {/* Circle dots as a page indicator */}
      <div className="fixed top-[55%] right-7 transform -translate-y-1/2 z-50">
        {problemsData.map((problem, i) => (
          <span
            key={problem.id}
            className={`
              block mb-4 rounded-full justify-center items-center transition-all duration-300 ease-in-out
              ${
                activeIndex === i
                  ? "border-2 border-blue-950 w-1 h-1"
                  : "border-2 border-gray-100 w-1 h-1"
              }
            `}
          ></span>
        ))}
      </div>

      {problemsData.map((problem, index) => (
        <div
          key={problem.id}
          ref={(el) => (problemRefs.current[index] = { current: el })}
          className={`absolute w-full h-screen flex flex-col items-center justify-center ${problem.bgColor} p-10`}
          style={{ zIndex: problemsData.length - index }}
        >
          {problem.image && (
            <div className="relative mb-2 w-full">
              <div className="flex flex-col relative justify-center items-center">
                <img
                  ref={(el) =>
                    (problemImageRefs.current[index] = { current: el })
                  }
                  src={problem.image}
                  alt={problem.title}
                  className={`${problem.imageSize || "w-1/4"}`}
                />
              </div>
            </div>
          )}
          <h1
            ref={(el) => (titleRefs.current[index] = { current: el })}
            className={`title lg:text-6xl text-4xl text-center ${problem.textColor} mb-6`}
          >
            {problem.title}
          </h1>
          {problem.solution ? (
            <div className="">
              <div
                className="w-full"
                ref={(el) => (problemTextRef.current[index] = { current: el })}
              >
                <p
                  className={`text text-center px-10 ${problem.textColor} mb-4`}
                  dangerouslySetInnerHTML={{ __html: problem.problem }}
                ></p>
              </div>

              <div
                className="w-full"
                ref={(el) => (solutionRefs.current[index] = { current: el })}
              >
                <p
                  className={`solution text text-center px-10 ${problem.textColor}`}
                  dangerouslySetInnerHTML={{ __html: problem.solution }}
                ></p>
              </div>
            </div>
          ) : (
            <p
              ref={(el) => (problemTextRef.current[index] = { current: el })}
              className={`text text-center px-10 ${problem.textColor} mb-4`}
              dangerouslySetInnerHTML={{ __html: problem.problem }}
            ></p>
          )}
          {problem.image2 && (
            <div className="flex justify-center items-center w-full">
              <img
                src={problem.image2}
                alt={problem.title}
                ref={(el) =>
                  (solutionImageRefs.current[index] = { current: el })
                }
                className="w-1/4 opacity-0"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnimatedComponent;
