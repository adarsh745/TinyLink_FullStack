import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../api";

export default function LinkTable({ refresh }) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteModal, setDeleteModal] = useState({ open: false, code: null });

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const res = await api.getAllLinks();
      setLinks(res.data || []);
    } catch {
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [refresh]);

  const confirmDelete = (code) => {
    setDeleteModal({ open: true, code });
  };

  const handleDelete = async () => {
    if (!deleteModal.code) return;
    try {
      await api.deleteLink(deleteModal.code);
      await fetchLinks();
    } catch {}
    setDeleteModal({ open: false, code: null });
  };

  const cancelDelete = () => setDeleteModal({ open: false, code: null });

  const redirectUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const fullShortUrl = (code) => `${redirectUrl}/${code}`;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 bg-white p-5 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-primary" style={{color:"#063077"}}>Your Links</h2>

      {loading ? (
        <p className="text-center text-gray-500 text-sm">Loading...</p>
      ) : links.length === 0 ? (
        <p className="text-center text-gray-400 text-sm">No links created yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead>
              <tr style={{background:"#063077", color:"#EBEBED"}}>
                <th className="p-3 text-center">Code</th>
                <th className="p-3">Short URL</th>
                <th className="p-3 text-center">Clicks</th>
                <th className="p-3 text-center">Last Clicked</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {links.map((l, idx) => (
                <tr key={l.code} className="border-t hover:bg-gray-50">

                  <td className="p-3 text-center font-mono">{l.code}</td>

                  {/* ✔ Clicking shortened URL navigates to actual redirect */}
                  <td className="p-3">
                    <a
                      href={fullShortUrl(l.code)}
                      target="_blank"
                      rel="noopener"
                      className="underline hover:no-underline"
                    >
                      {fullShortUrl(l.code)}
                    </a>
                  </td>

                  <td className="p-3 text-center">{l.total_clicks}</td>

                  <td className="p-3 text-center text-xs">
                    {l.last_clicked ? new Date(l.last_clicked).toLocaleString() : "—"}
                  </td>

                  <td className="p-3 text-center space-x-3">

                    {/* ✅ Copy button */}
                    <motion.button
                      onClick={() => navigator.clipboard.writeText(fullShortUrl(l.code))}
                      className="px-3 py-1 rounded-lg text-xs shadow-sm"
                      style={{background:"#063077", color:"#EBEBED"}}
                      whileHover={{scale:1.1}}
                      whileTap={{scale:0.9}}
                    >
                      Copy
                    </motion.button>

                    <Link
                      to={`/code/${l.code}`}
                      className="px-3 py-1 rounded-lg text-xs border border-primary text-primary hover:bg-primary hover:text-lightbg transition"
                      style={{color:"#063077", borderColor:"#063077"}}
                    >
                      Stats
                    </Link>

                    {/* ✅ Delete triggers confirm modal */}
                    <motion.button
                      onClick={() => confirmDelete(l.code)}
                      className="px-3 py-1 rounded-lg text-xs shadow-sm"
                      style={{background:"#F4020E", color:"#EBEBED"}}
                      whileHover={{scale:1.1}}
                      whileTap={{scale:0.9}}
                    >
                      Delete
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🗑 DELETE Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.open && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-sm"
              initial={{scale:0.9, opacity:0}}
              animate={{scale:1, opacity:1}}
              exit={{scale:0.9, opacity:0}}
            >
              <h3 className="font-bold text-lg text-center text-primary mb-3" style={{color:"#063077"}}>
                Confirm Delete
              </h3>
              <p className="text-sm text-center mb-4">Are you sure you want to delete <span className="font-mono">{deleteModal.code}</span> ?</p>
              <div className="flex gap-3">
                <motion.button
                  onClick={cancelDelete}
                  className="flex-1 py-2 rounded-xl text-sm border border-primary"
                  style={{color:"#063077", borderColor:"#063077"}}
                  whileHover={{scale:1.05}}
                  whileTap={{scale:0.95}}
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handleDelete}
                  className="flex-1 py-2 rounded-xl text-sm shadow"
                  style={{background:"#F4020E", color:"#EBEBED"}}
                  whileHover={{scale:1.05}}
                  whileTap={{scale:0.95}}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
