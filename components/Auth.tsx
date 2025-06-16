"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth() {
  const router = useRouter();
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    repassword: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);

  const handleToggle = () => {
    setIsLoginView(!isLoginView);
    setStep(1);
    setFormData({ email: "", otp: "", password: "", repassword: "" });
    setLoginData({ email: "", password: "" });
  };

  const handleOnChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNextStep = async () => {
    if (step === 1) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/otp/send-otp`,
          {
            email: formData.email,
          }
        );
        if (response.data.message === "OTP sent successfully to your email") {
          toast.success("OTP имэйл рүү амжилттай илгээгдлээ");
          setOtpSent(true);
          setStep(2);
        } else {
          toast.error("OTP илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
        }
      } catch {
        toast.error("OTP илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
      }
    } else if (step === 2) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/otp/verify-otp`,
          {
            email: formData.email,
            otp: formData.otp,
          }
        );
        if (response.data.message === "OTP verified successfully") {
          toast.success("OTP амжилттай баталгаажлаа");
          setStep(3);
        } else {
          toast.error("OTP буруу байна. Дахин оролдоно уу.");
        }
      } catch {
        toast.error("OTP баталгаажуулахад алдаа гарлаа.");
      }
    } else if (step === 3) {
      if (!formData.password || !formData.repassword) {
        toast.error("Нууц үг хоёуланг нь оруулна уу");
        return;
      }
      if (formData.password !== formData.repassword) {
        toast.error("Нууц үг таарахгүй байна");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/register`,
          {
            email: formData.email,
            password: formData.password,
          }
        );
        if (response.data.message === "User registered successfully") {
          toast.success("Бүртгэл амжилттай! Нэвтрэх хэсэг рүү шилжиж байна...");
          setIsLoginView(true);
        } else {
          toast.error("Имэйл аль хэдийн бүртгэлтэй байна");
        }
      } catch {
        toast.error("Бүртгэл үүсгэхэд алдаа гарлаа.");
      }
    }
  };

  const handleLogin = async () => {
    const { email, password } = loginData;

    if (!email || !password) {
      toast.error("Бүх талбарыг бөглөнө үү");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/login`,
        { email, password }
      );

      const { message, token } = response.data;

      if (message === "Email or password wrong") {
        toast.error("Имэйл эсвэл нууц үг буруу байна");
        return;
      }

      if (token) {
        localStorage.setItem("token", token);
        toast.success("Амжилттай нэвтэрлээ");
        router.push("/dashboard");
      } else {
        toast.error("Нэвтрэхэд амжилтгүй. Token ирсэнгүй.");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Нэвтрэхэд алдаа гарлаа.";
      toast.error(message);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
      {/* Signup Panel */}
      <motion.div
        className={`w-1/2 max-sm:w-full flex justify-center items-center ${
          isLoginView ? "bg-primary text-white max-sm:hidden" : ""
        } transition-colors duration-800`}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -200 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {!isLoginView && (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <h1 className="text-2xl flex justify-center mb-4">Бүртгүүлэх</h1>

              {step === 1 && (
                <>
                  <input
                    type="email"
                    placeholder="Имэйл хаяг"
                    value={formData.email}
                    onChange={(e) => handleOnChange("email", e.target.value)}
                    className="w-[300px] border border-black h-[40px] rounded-md px-2"
                  />
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-[300px] h-[40px] bg-primary text-white rounded-md"
                  >
                    Дараах
                  </button>
                </>
              )}

              {step === 2 && otpSent && (
                <>
                  <input
                    type="text"
                    placeholder="OTP оруулна уу"
                    value={formData.otp}
                    onChange={(e) => handleOnChange("otp", e.target.value)}
                    className="w-[300px] border border-black h-[40px] rounded-md px-2"
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-[140px] h-[40px] bg-gray-300 text-black rounded-md"
                    >
                      Буцах
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-[140px] h-[40px] bg-primary text-white rounded-md"
                    >
                      Дараах
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <input
                    type="password"
                    placeholder="Нууц үг"
                    value={formData.password}
                    onChange={(e) => handleOnChange("password", e.target.value)}
                    className="w-[300px] border border-black h-[40px] rounded-md px-2"
                  />
                  <input
                    type="password"
                    placeholder="Нууц үг дахин оруулна уу"
                    value={formData.repassword}
                    onChange={(e) =>
                      handleOnChange("repassword", e.target.value)
                    }
                    className="w-[300px] border border-black h-[40px] rounded-md px-2"
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="w-[140px] h-[40px] bg-gray-300 text-black rounded-md"
                    >
                      Буцах
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-[140px] h-[40px] bg-primary text-white rounded-md"
                    >
                      Илгээх
                    </button>
                  </div>
                </>
              )}

              <p
                className="mt-4 text-primary cursor-pointer text-sm text-center"
                onClick={handleToggle}
              >
                Өмнө бүртгүүлсэн үү? Нэвтрэх
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Login Panel */}
      <motion.div
        className={`w-1/2 flex max-sm:w-full justify-center items-center ${
          !isLoginView ? "bg-primary text-white max-sm:hidden" : ""
        } transition-colors duration-800`}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {isLoginView && (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-4"
            >
              <h1 className="text-2xl mb-4 text-center">Нэвтрэх</h1>

              <input
                type="email"
                placeholder="Имэйл хаяг"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-[300px] border border-black h-[40px] rounded-md px-2"
              />
              <input
                type="password"
                placeholder="Нууц үг"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-[300px] border border-black h-[40px] rounded-md px-2"
              />

              <div
                onClick={handleLogin}
                className="bg-primary w-[300px] text-center rounded-md text-white py-2 cursor-pointer"
              >
                Нэвтрэх
              </div>

              <p
                className="mt-4 text-primary cursor-pointer text-sm text-center"
                onClick={handleToggle}
              >
                Бүртгэл байхгүй юу? Бүртгүүлэх
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
