import React, { useState } from "react";

// Array of 5 different problem configurations
const problemsData = [
  {
    id: 1,
    title: "Delayed Door-to-Balloon Time",
    description:
      "Approximately <strong>42%</strong> of MI patients experience D2B times over 90 minutes, leading to higher mortality rates.",
    bgColor: "bg-[#4ecdc4]",
    textColor: "text-blue-950",
  },
  {
    id: 2,
    title: "Administrative Burden",
    description:
      "Clinicians spend significant time on documentation, diverting attention from urgent patient care and potentially extending D2B times.",
    bgColor: "bg-[#6bde84]",
    textColor: "text-green-950",
  },
  {
    id: 3,
    title: "Limited Access in Remote Settings",
    description:
      "Patients in rural areas are less likely to undergo timely interventions, with only <strong>49.7% </strong> receiving cardiac catheterization compared to <strong>63.6%</strong> in urban settings.  ",
    bgColor: "bg-[#ff8c42]",
    textColor: "text-orange-950",
  },
  {
    id: 4,
    title: "Socioeconomic Disparities",
    description:
      "Patients from lower socioeconomic status areas have poorer outcomes following acute myocardial infarction.",
    bgColor: "bg-[#90be6d]",
    textColor: "text-slate-900",
  },
  {
    id: 5,
    title: "Patient Unawareness",
    description:
      "Misinterpretation of symptoms leads to delayed ER presentations in <strong>70%</strong> of MI patients.",
    bgColor: "bg-[#e56399]",
    textColor: "text-pink-950",
  },
];

const Problem = ({ problemId = 2 }) => {
  // State to keep track of the current problem
  const [currentProblemId, setCurrentProblemId] = useState(problemId);

  // Find the selected problem (default to first if not found)
  const selectedProblem =
    problemsData.find((p) => p.id === currentProblemId) || problemsData[0];

  // Handle pagination without looping
  const goToNextProblem = () => {
    const currentIndex = problemsData.findIndex(
      (p) => p.id === currentProblemId
    );
    // Only go to next if not at the last problem
    if (currentIndex < problemsData.length - 1) {
      setCurrentProblemId(problemsData[currentIndex + 1].id);
    }
  };

  const goToPrevProblem = () => {
    const currentIndex = problemsData.findIndex(
      (p) => p.id === currentProblemId
    );
    // Only go to previous if not at the first problem
    if (currentIndex > 0) {
      setCurrentProblemId(problemsData[currentIndex - 1].id);
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center">
      <div
        className={`w-[90%] h-[90%] flex flex-col items-center justify-center ${selectedProblem.bgColor} rounded-3xl relative`}
      >
        <h1 className={`title ${selectedProblem.textColor}`}>
          {selectedProblem.title}
        </h1>
        <p
          className={`text text-center px-40 ${selectedProblem.textColor}`}
          dangerouslySetInnerHTML={{ __html: selectedProblem.description }}
        ></p>

        {/* Pagination Controls */}
        <div className="absolute right-2 flex flex-col items-center gap-4">
          <button
            onClick={goToPrevProblem}
            className={`px-4 py-2 rounded-full rotate-90 ${selectedProblem.textColor} hover:opacity-80 transition-opacity`}
          >
            &lt;
          </button>

          {/* Page indicators */}
          <div className="flex flex-col gap-2">
            {problemsData.map((problem) => (
              <button
                key={problem.id}
                onClick={() => setCurrentProblemId(problem.id)}
                className={`w-3 h-3 rounded-full ${
                  problem.id === currentProblemId
                    ? selectedProblem.textColor
                    : selectedProblem.textColor + " opacity-30"
                } border border-current transition-colors duration-500`}
                aria-label={`Go to problem ${problem.id}`}
              />
            ))}
          </div>

          <button
            onClick={goToNextProblem}
            className={`px-4 py-2 rounded-full rotate-90 ${selectedProblem.textColor} hover:opacity-80 transition-opacity`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem;
