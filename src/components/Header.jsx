import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <motion.header
      className="w-full px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-20"
      style={{ background: "#063077", color: "#EBEBED" }}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <span className="text-2xl font-extrabold tracking-tight">TinyLink</span>

      <nav className="flex gap-4 text-sm">
        <Link
          to="/"
          className={`px-3 py-1 rounded-full transition-transform ${
            location.pathname === "/" ? "bg-lightbg text-primary" : "hover:bg-lightbg/20"
          }`}
        >
          Dashboard
        </Link>

        {/* ✅ Health Button */}
        <Link
          to="/health"
          className={`px-3 py-1 rounded-full transition-transform ${
            location.pathname === "/health" ? "bg-lightbg text-primary" : "hover:bg-lightbg/20"
          }`}
        >
          Health
        </Link>
      </nav>
    </motion.header>
  );
}
