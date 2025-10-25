import React from "react";
import { FiX } from "react-icons/fi";

const Modal = ({ open, onClose, children, className = "" }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className={`relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 ${className}`}>
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <FiX size={22} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
