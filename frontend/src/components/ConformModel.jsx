import React from "react";

export default function ConfirmModal({ open, onCancel, onConfirm, loading, title, description }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="max-w-sm w-full bg-white p-5 rounded-xl animate-fade-in">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-3 py-1.5 border rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
