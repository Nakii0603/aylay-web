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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      if (step === 1) {
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
      } else if (step === 2) {
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
      } else if (step === 3) {
        if (!formData.password || !formData.repassword) {
          toast.error("Нууц үг хоёуланг нь оруулна уу");
          return;
        }
        if (formData.password !== formData.repassword) {
          toast.error("Нууц үг таарахгүй байна");
          return;
        }

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
          setStep(1);
          setFormData({ email: "", otp: "", password: "", repassword: "" });
          setOtpSent(false);
        } else {
          toast.error("Имэйл аль хэдийн бүртгэлтэй байна");
        }
      }
    } catch {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    const { email, password } = loginData;

    if (!email || !password) {
      toast.error("Бүх талбарыг бөглөнө үү");
      return;
    }

    setLoading(true);
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
      if (response.data.message === "Login successful") {
        router.push("/dashboard");
      }
      if (token) {
        localStorage.setItem("token", token);
        toast.success("Амжилттай нэвтэрлээ");
      } else {
        toast.error("Нэвтрэхэд амжилтгүй. Token ирсэнгүй.");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Нэвтрэхэд алдаа гарлаа.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex h-screen relative">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Loading spinner overlay */}
      {loading && (
        <div className="fixed inset-0 bg-[#0000006f] flex justify-center items-center z-50">
          <svg
            aria-hidden="true"
            className="w-16 h-16 text-gray-200 animate-spin fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}

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
              className="flex flex-col gap-4 justify-center items-center"
            >
              <div className="flex justify-center flex-col mb-4 gap-4 w-[80px]">
                <img src="/logo/image1.png" alt="" />
                <img src="/logo/image2.png" alt="" />
              </div>
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
                  <div className="flex justify-between gap-5 mt-4">
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
                  <div className="flex justify-between gap-5 mt-4">
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
              className="flex flex-col gap-4 justify-center items-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="flex justify-center flex-col mb-4 gap-4 w-[80px]">
                <img src="/logo/image1.png" alt="" />
                <img src="/logo/image2.png" alt="" />
              </div>
              <h1 className="text-2xl flex justify-center mb-4">Нэвтрэх</h1>

              <input
                type="email"
                placeholder="Имэйл хаяг"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-[300px] border border-black h-[40px] rounded-md px-2"
              />
              <input
                type="password"
                placeholder="Нууц үг"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="w-[300px] border border-black h-[40px] rounded-md px-2"
              />
              <button
                type="submit"
                className="w-[300px] h-[40px] bg-primary text-white rounded-md"
              >
                Нэвтрэх
              </button>

              <p
                className="mt-4 text-primary cursor-pointer text-sm text-center"
                onClick={handleToggle}
              >
                Шинэ хэрэглэгч үү? Бүртгүүлэх
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
