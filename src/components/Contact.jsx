import React, { useState } from "react";
import {
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
} from "react-icons/md";

const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "b557bb34-b5de-47de-b4ae-8b2127d31710");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        setSubmitStatus("success");
        // Clear the form
        event.target.reset();

        // Clear the success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };
  return (
    <section
      id="contact"
      className="flex flex-col w-full h-fit items-center p-10 gap-y-10"
    >
      <div className="flex flex-col gap-2 items-center px-10">
        <h1 className="title">Get in Touch</h1>
        <p className="text">
          Ready to transform your healthcare facility with Carol's solutions?
          Contact us today.
        </p>
      </div>
      <div className="flex lg:flex-row flex-col w-full h-fit p-5 bg-white border border-gray-300 rounded-3xl mx-4">
        <div className="flex flex-col lg:items-start items-center w-full lg:w-1/3 h-full gap-5 lg:border-r border-b lg:border-b-0 border-gray-300 ">
          <h2 className="text-4xl font-bold text-blue-500">Contact Info</h2>
          <p className="text-lg text-gray-500">
            Please reach out to us through the following channels
          </p>
          <div className="flex flex-col gap-5 justify-start mb-10">
            <div className="flex items-center gap-4">
              <MdOutlineEmail className="text-blue-500 text-3xl" />
              <div className="flex flex-col">
                <p className="text text-black font-semibold">Email</p>
                <a
                  href="mailto:info@careforall.io"
                  className="text-gray-500 lg:text-lg text-md"
                >
                    info@careforall.io
                </a>
              </div>
            </div>
            {/* <div className="flex items-center gap-4">
              <MdOutlinePhone className="text-blue-500 text-3xl" />
              <div className="flex flex-col">
                <p className="text text-black font-semibold">Phone</p>
                <a
                  href="tel:+1234567890"
                  className="text-gray-500 lg:text-lg text-md"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div> */}
            {/* <div className="flex items-center gap-4">
              <MdOutlineLocationOn className="text-blue-500 text-3xl" />
              <div className="flex flex-col">
                <p className="text text-black font-semibold">Address</p>
                <p className="text-gray-500 lg:text-lg text-md">
                  1234 Healthcare St, Suite 100, Health City, HC 12345
                </p>
              </div>
            </div> */}
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col w-full lg:w-2/3 h-full bg-white p-5 gap-5"
        >
          {submitStatus === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">
                Your message was successfully sent!
              </span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">
                There was an error sending your message. Please try again.
              </span>
            </div>
          )}

          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="name" className="text-gray-900">
                Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                required
                className="w-full lg:p-3 md:p-2 p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-md text-sm"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="email" className="text-gray-900">
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                required
                className="w-full lg:p-3 md:p-2 p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-md text-sm"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="organization" className="text-gray-900">
              Organization *
            </label>
            <input
              type="text"
              name="organization"
              id="organization"
              placeholder="Enter Organization"
              required
              className="w-full lg:p-3 md:p-2 p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-md text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-gray-900">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Enter Message"
              rows="10"
              className="w-full lg:p-3 md:p-2 p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-md text-sm"
            />
          </div>
          <div className="flex w-full my-2 lg:justify-around justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="newsletter"
                className="text-gray-900 lg:text-md md:text-sm text-[10px]"
              >
                Subscribe to our Newsletter
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requestDemo"
                id="requestDemo"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="requestDemo"
                className="text-gray-900 lg:text-md md:text-sm text-[10px]"
              >
                Request a Demo
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="sponsor"
                id="sponsor"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="sponsor"
                className="text-gray-900 lg:text-md md:text-sm text-[10px]"
              >
                Sponsor Our Work
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white lg:p-3 md:p-2 p-1.5 rounded-md hover:bg-blue-600 lg:text-md text-sm"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
