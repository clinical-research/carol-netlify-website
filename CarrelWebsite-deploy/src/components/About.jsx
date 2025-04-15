import React from "react";

// import preventiveHealthCareAnimation from "../assets/preventive-health-care.json";

const About = () => {
  return (
    <section id="about" className="flex flex-col w-full h-fit bg-white ">
      <div className="flex w-full lg:flex-row flex-col lg:items-start items-center">
        <div className="flex flex-col gap-5 p-20 w-full items-center lg:order-1 order-2">
          <h1 className="title lg:text-left text-center">
            About Healthcare 4.0
          </h1>
          <h2 className="text-2xl font-bold lg:mb-10 mb-6">
            The Evolution of Modern Medicine
          </h2>

          {/* Horizontal timeline for large screens only */}
          <div className="relative w-full hidden lg:block">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-6 h-2 bg-blue-500 rounded"></div>

            <div className="flex flex-row gap-8">
              {/* Healthcare 1.0 Card */}
              <div className="relative pt-14 w-1/4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div className="bg-gray-100 p-8 rounded-lg shadow-lg h-full">
                  <h3 className="font-bold text-3xl mb-4">Healthcare 1.0</h3>
                  <p className="text text-lg leading-relaxed">
                    Traditional, physician-led medicine relying on empirical
                    observation and paper-based records.
                  </p>
                </div>
              </div>

              {/* Healthcare 2.0 Card */}
              <div className="relative pt-14 w-1/4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div className="bg-gray-100 p-8 rounded-lg shadow-lg h-full">
                  <h3 className="font-bold text-3xl mb-4">Healthcare 2.0</h3>
                  <p className="text text-lg leading-relaxed">
                    Advancements like electronic health records (EHRs), imaging,
                    and minimally invasive procedures introduced data-driven
                    approaches.
                  </p>
                </div>
              </div>

              {/* Healthcare 3.0 Card */}
              <div className="relative pt-14 w-1/4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div className="bg-gray-100 p-8 rounded-lg shadow-lg h-full">
                  <h3 className="font-bold text-3xl mb-4">Healthcare 3.0</h3>
                  <p className="text text-lg leading-relaxed">
                    The digital revolution brought telemedicine, mobile health
                    apps, and AI-driven analytics, enabling personalized,
                    data-centric care.
                  </p>
                </div>
              </div>

              {/* Healthcare 4.0 Card */}
              <div className="relative pt-14 w-1/4">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <div className="bg-gray-100 p-8 rounded-lg shadow-lg border-2 border-blue-500 h-full">
                  <h3 className="font-bold text-3xl mb-4 text-blue-700">
                    Healthcare 4.0
                  </h3>
                  <p className="text text-lg leading-relaxed">
                    Today, AI, IoT, robotics, and digital twins create a smart,
                    predictive healthcare ecosystem, enhancing efficiency and
                    accessibility.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical timeline for small and medium screens */}
          <div className="relative lg:hidden">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-500 rounded"></div>

            {/* Healthcare 1.0 Card */}
            <div className="relative pl-12 pb-8">
              <div className="absolute left-0 top-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2">Healthcare 1.0</h3>
                <p className="text text-sm">
                  Traditional, physician-led medicine relying on empirical
                  observation and paper-based records.
                </p>
              </div>
            </div>

            {/* Healthcare 2.0 Card */}
            <div className="relative pl-12 pb-8">
              <div className="absolute left-0 top-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2">Healthcare 2.0</h3>
                <p className="text text-sm">
                  Advancements like electronic health records (EHRs), imaging,
                  and minimally invasive procedures introduced data-driven
                  approaches.
                </p>
              </div>
            </div>

            {/* Healthcare 3.0 Card */}
            <div className="relative pl-12 pb-8">
              <div className="absolute left-0 top-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="font-bold text-xl mb-2">Healthcare 3.0</h3>
                <p className="text text-sm">
                  The digital revolution brought telemedicine, mobile health
                  apps, and AI-driven analytics, enabling personalized,
                  data-centric care.
                </p>
              </div>
            </div>

            {/* Healthcare 4.0 Card */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">4</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg shadow-md border-2 border-blue-500">
                <h3 className="font-bold text-xl mb-2">Healthcare 4.0</h3>
                <p className="text text-sm">
                  Today, AI, IoT, robotics, and digital twins create a smart,
                  predictive healthcare ecosystem, enhancing efficiency and
                  accessibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
