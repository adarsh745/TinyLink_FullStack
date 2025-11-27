import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../Header";
import api from "../../api";

export default function Stats() {
  const { code } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await api.getStats(code);
      setStats(res.data);
    } catch {
      setError("Link not found or deleted.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <motion.div
        className="text-center mt-8 p-6 bg-white rounded-2xl shadow-lg w-[90%] max-w-lg mx-auto"
        initial={{opacity:0, y:10}}
        animate={{opacity:1, y:0}}
      >
        <h2 className="text-xl font-bold mb-2" style={{color:"#063077"}}>Stats for {code}</h2>

        {loading && <p>Loading...</p>}
        {error && <p style={{color:"#F4020E"}}>{error}</p>}

        {stats && (
          <div className="mt-4 text-sm space-y-2 bg-lightbg p-4 rounded-xl">
            <p><b>Target URL:</b> {stats.target_url}</p>
            <p><b>Total Clicks:</b> {stats.total_clicks}</p>
            <p><b>Last Clicked:</b> {stats.last_clicked ? new Date(stats.last_clicked).toLocaleString():"—"}</p>
          </div>
        )}

        <Link to="/">
          <motion.button
            className="mt-5 px-5 py-2 rounded-xl text-sm font-medium shadow"
            style={{background:"#063077", color:"#EBEBED"}}
            whileHover={{scale:1.1}}
            whileTap={{scale:0.95}}
          >
            Back to Dashboard
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
