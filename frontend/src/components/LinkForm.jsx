
import React, { useState } from "react";
import { motion } from "framer-motion";
import { createLink } from "../api";
import { Link2, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function LinkForm({ onCreated }) {
  const [form, setForm] = useState({ url: "", code: "" });
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus({ ...status, error: "", success: "" });
  };

  const resetForm = () => {
    setForm({ url: "", code: "" });
    setStatus({ loading: false, error: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      const payload = { url: form.url };
      if (form.code.trim()) payload.code = form.code.trim();
      const res = await createLink(payload);
      setStatus({ loading: false, error: "", success: "✅ Link shortened successfully!" });
      toast.success("Link shortened successfully")
      onCreated && onCreated(res.data.code);
      resetForm();
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.error || " Failed to create link", success: "" });
      toast.error("Failed to create link")
    }
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >

      {/* Card Container */}
      <motion.form
        onSubmit={handleSubmit}
        className="mt-10 p-1 rounded-2xl shadow-xl"
        style={{
          background: "linear-gradient(145deg, #063077 0%, #0A2472 80%)"
        }}
      >
        <div className="bg-white rounded-2xl p-7 shadow-lg">
          {/* Heading */}
          <div className="flex flex-col items-center mb-5">
            <Link2 size={36} className="text-primary mb-2"/>
            <h2 className="text-2xl font-extrabold text-center text-primary">TinyLink URL Shortener</h2>
            <p className="text-sm text-gray-500">Shorten. Track. Share. 🚀</p>
          </div>

          {/* Input grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* URL Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Long URL <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <input
                  name="url"
                  type="url"
                  placeholder="https://your-long-link.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                  value={form.url}
                  onChange={handleChange}
                  required
                />
                <Link2 className="absolute right-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            {/* Custom Code Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Custom Code <span className="text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  name="code"
                  placeholder="6–8 chars, letters/numbers"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/60"
                  value={form.code}
                  onChange={handleChange}
                />
                <Link2 className="absolute right-3 top-3 text-gray-400" size={18} />
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Must be unique and 6–8 alphanumeric characters.
              </p>
            </div>

          </div>

          {/* Status messages */}
          {status.error && (
            <motion.p
              className="text-[13px] font-medium text-center mt-4"
              style={{ color: "#F4020E" }}
              initial={{opacity:0}}
              animate={{opacity:1}}
            >
              {status.error}
            </motion.p>
          )}

          {status.success && (
            <motion.p
              className="text-[13px] font-medium text-center mt-4 text-green-600"
              initial={{opacity:0}}
              animate={{opacity:1}}
            >
              {status.success}
            </motion.p>
          )}

          {/* Button Section */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-7">

            {/* CREATE BUTTON */}
            <motion.button
              type="submit"
              disabled={status.loading}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold shadow-lg"
              style={{ background: "#063077", color: "#EBEBED" }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link2 size={18}/>
              {status.loading ? "Shortening..." : "Shorten URL"}
            </motion.button>

            {/* RESET BUTTON */}
            <motion.button
              type="button"
              onClick={resetForm}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-gray-200 shadow-sm"
              whileHover={{ scale: 1.07, background: "#EBEBED" }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={16} className="text-accent"/>
              Reset
            </motion.button>

          </div>

        </div>
      </motion.form>

      {/* Optional Decorative Bottom Text */}
      <p className="text-center text-xs text-gray-400 mt-3">Made with ❤️ & Framer Motion</p>

    </motion.div>
  );
}
