"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaChartLine,
  FaMicrochip,
  FaBell,
  FaLeaf,
} from "react-icons/fa"

const features = [
  { icon: FaChartLine, text: "Real time insights and monitoring" },
  { icon: FaMicrochip, text: "Smart IoT energy management" },
  { icon: FaBell, text: "Predictive maintenance alerts" },
  { icon: FaLeaf, text: "Sustainability and carbon saving" },
]

const roles = ["Admin", "Viewer"]

const loginFields = [
  {
    key: "loginId",
    type: "text",
    placeholder: "Login ID",
    icon: FaEnvelope,
  },
  {
    key: "password",
    type: "password",
    placeholder: "Password",
    icon: FaLock,
  },
]

export default function Login() {
  const [form, setForm] = useState({ loginId: "", password: "" })
  const [role, setRole] = useState("Admin")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.loginId && form.password) {
      localStorage.setItem("auth", "true")
      localStorage.setItem("role", role)
      navigate("/dashboard")
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('/back.png')" }}
    >
      <div className="p-6 flex justify-between items-center flex-shrink-0">
        <img src="/logo.svg" alt="logo" className="h-[59px]" />
        <div className="flex items-center gap-6 text-base font-normal">
          {["Contact Us", "Terms & Conditions", "Solutions and Pricing"].map(
            (item) => (
              <p
                key={item}
                className="cursor-pointer hover:text-[#006A02] transition-colors"
              >
                {item}
              </p>
            )
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between px-6 md:px-16 py-8 gap-8  -mt-10">
        {/* Left Side */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-3xl md:text-[40px] font-bold leading-tight mb-6">
            Smart, Reliable and{" "}
            <span className="text-[#006A02]">Sustainable</span> Energy
          </h1>
          <p className="text-base text-[#777777] mb-8 leading-relaxed">
            Empowering businesses with 24/7 clean energy, intelligent monitoring,
            and cost savings—driven by the RE24 Software Suite.
          </p>

          <ul className="space-y-6 text-gray-800">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4">
                <Icon className="h-5 w-5 text-[#006A02] flex-shrink-0" />
                <span className="text-base">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Login Box */}
        <div className="bg-gradient-to-t from-green-50 to-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          {/* Toggle Roles */}
          <div className="flex mb-8 bg-gray-200 rounded-full p-1">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                  role === r
                    ? "bg-white shadow text-black font-normal text-base"
                    : "text-black hover:text-gray-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-[#777777] text-sm leading-relaxed">
              Sign in to access your electricity monitoring dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginFields.map(({ key, type, placeholder, icon: Icon }) => (
              <div key={key} className="relative">
                <Icon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={
                    key === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 text-sm"
                />
                {key === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <p className="text-sm text-gray-500 cursor-pointer hover:text-[#006A02] hover:underline transition-colors">
                Forgot Password?
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#006A02] text-white py-3 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors font-medium text-sm"
            >
              Login
            </button>
          </form>

          <p className="text-xs mt-3 text-gray-500 leading-relaxed">
            Need help signing in?{" "}
            <span className="text-black font-semibold cursor-pointer hover:underline">
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
