import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../api.jsx";
import Header from "../../components/Header.jsx";
import { Activity } from "lucide-react";

export default function Health() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHealth = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/healthz"); 
      console.log("this is the health check",res)  // calls → http://localhost:4000/health
      setData(res.data);
    } catch {
      setError("❗ Failed to load health API");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <motion.div
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Activity size={48} className="text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-extrabold mb-2 text-primary">System Health Check</h2>
          <p className="text-sm text-gray-500 mb-5">Check app status and uptime 🔎</p>

          <motion.button
            onClick={fetchHealth}
            disabled={loading}
            className="px-6 py-2 rounded-xl font-bold text-sm shadow-md"
            style={{ background: "#063077", color: "#EBEBED" }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Checking..." : "Check Health"}
          </motion.button>

          {error && !loading && (
            <p className="text-sm mt-3" style={{ color: "#F4020E" }}>{error}</p>
          )}

          {data && !loading && (
            <motion.pre
              className="mt-5 bg-lightbg p-4 rounded-xl text-left text-xs md:text-sm shadow-md overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ maxHeight: "250px" }}
            >
              {JSON.stringify(data, null, 2)}
            </motion.pre>
          )}
        </motion.div>
      </main>
    </>
  );
}
