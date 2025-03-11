
import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import "./Login.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import { generateOTP, validateOTP } from "../../Services/ApiServices"
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate(); // Initialize navigation

  const [error, setError] = useState(null); // To store API errors

  const [formData, setFormData] = useState({
    loginname: "",
    code: "",
    password: "",
  });

  // const [error] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    localStorage.setItem('loginName', formData.loginname);
    localStorage.setItem('clientCode', formData.code);


  };

  const stepFuncs = {
    nextStep: () => setStep(step + 1),
    prevStep: () => setStep(step - 1),
  };
  const tutorialData = [
    {
      title: "Heading",
      description:
        "Content",
      bgColor: "time",
      image: "./login-one.jpg",
    },
    {
      title: "Heading 2",
      description:
        "Content 2",
      bgColor: "programming",
      image: "./login-two.jpg",
    },
    {
      title: "Heading 3",
      description:
        "Content 3",
      bgColor: "meditation",
      image: "./admin.png",
    },
  ];

  const [step, setStep] = useState(0);

  const handleClose = () => {
    setOpen(false);
  };


  const [otp, setOTP] = useState(null);

  const handleSendOTP = async () => {
    if (!formData.loginname) {
      console.error("Membership ID is required to send OTP.");
      return;
    }
    try {
      const otpResponse = await generateOTP({ membershipId: formData.loginname });
      setOTP(otpResponse); // Assuming response contains OTP directly
      console.log("OTP sent:", otpResponse);
    } catch (error) {
      console.error("Error fetching OTP:", error);
    }
  };

  const [validate, setvalidate] = useState(null);

  const handleValidateOTP = async () => {
    if (!formData.loginname || !formData.password) {
      setError("Membership ID and OTP are required.");
      return;
    }
  
    try {
      let data = { membershipId: formData.loginname, otp: formData.password };
      const otpValidation = await validateOTP(data); // Ensure this API call is inside try block
  
      if (otpValidation.success) {
        // If API response is successful, navigate to Dashboard
        navigate("/dashboard");
      } else {
        // If API returns error, display message
        setError(otpValidation.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Error validating OTP. Please try again.");
      console.error("Error validating OTP:", error);
    }
  };
  


  return (
    <>
      <div className="flex justify-center items-center min-h-screen authentication-background">
        <div className="w-full max-w-6xl border rounded-lg p-10 bg-white relative shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 flex flex-col justify-center items-center p-6 rounded-lg">
              <div className="flex justify-center items-center font-sans">
                <Card
                  currentCardData={tutorialData[step]}
                  stepFuncs={stepFuncs}
                  step={step}
                  tutorialData={tutorialData}
                  setStep={setStep}
                >
                  {tutorialData.map((data) => (
                    <img
                      src={data.image}
                      key={`img${data.title}`}
                      className={`bg-${tutorialData[step].bgColor} duration-500`}
                    />
                  ))}
                  {tutorialData.map((data) => (
                    <h3
                      key={`header ${data.title}`}
                      className="font-bold text-xl pt-8 px-5 h-1/3 min-w-full"
                    >
                      {data.title}
                    </h3>
                  ))}
                  {tutorialData.map((data) => (
                    <p
                      key={`p ${data.title}`}
                      className="font-thin text-sm py-3 ps-5 pe-10 min-w-full"
                    >
                      {data.description}
                    </p>
                  ))}
                </Card>
              </div>
              <small className="absolute bottom-0 text-black text-center font-mono max-w-xs mb-2">
                Footer Content
              </small>
            </div>

            <div className="md:w-1/2 p-10 bg-white rounded-lg shadow-lg">
              {/* Heading Section */}
              <div className="mb-6">
                <p className="text-black text-4xl font-semibold font-mono mb-2">
                  Member Login
                </p>
                {/* <p className="text-gray-600">We are happy to have you back.</p> */}
              </div>

              {/* Membership ID Input + Send OTP Button */}
              <div className="mb-4 pb-4 grid grid-cols-[1fr_auto] gap-2">
                <input
                  type="text"
                  name="loginname"
                  value={formData.loginname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Membership ID"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200 text-sm"
                  onClick={handleSendOTP}
                >
                  Send OTP
                </button>
              </div>

              {/* OTP Input */}
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter OTP"
                />
              </div>

              {/* Login Button */}
              <div>
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-lg font-medium"
                  onClick={handleValidateOTP}
                >
                  Login
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
            </div>


            <React.Fragment>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <div class="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
                  <header class="mb-8">
                    <h1 class="text-2xl font-bold mb-1">
                      Mobile Phone Verification
                    </h1>
                    <p class="text-[15px] text-slate-500">
                      Enter the 4-digit verification code that was sent to your
                      phone number.
                    </p>
                  </header>
                  <form id="otp-form">
                    <div class="flex items-center justify-center gap-3">
                      <input
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        pattern="\d*"
                        maxlength="1"
                      />
                      <input
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxlength="1"
                      />
                      <input
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxlength="1"
                      />
                      <input
                        type="text"
                        class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxlength="1"
                      />
                    </div>
                    <div class="max-w-[260px] mx-auto mt-4">
                      <button
                        type="submit"
                        class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
                      >
                        Verify Account
                      </button>
                    </div>
                  </form>
                  <div class="text-sm text-slate-500 mt-4">
                    Didn't receive code?{" "}
                    <a
                      class="font-medium text-indigo-500 hover:text-indigo-600"
                      href="#0"
                    >
                      Resend
                    </a>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 focus:outline-none"
                    >
                      X
                    </button>
                  </div>


                </div>
              </Dialog>
            </React.Fragment>
          </div>
        </div>
      </div>

      {/* Add ToastContainer to your component */}
      <ToastContainer />
    </>
  );
}

export default LoginComponent;
