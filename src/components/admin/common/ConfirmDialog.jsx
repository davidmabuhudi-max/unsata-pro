import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-green-600",
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h2 className="text-2xl font-bold text-slate-800">
              {title}
            </h2>

            <p className="mt-4 text-gray-600">
              {message}
            </p>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={onCancel}
                className="px-5 py-2 rounded-lg border hover:bg-gray-100"
              >
                {cancelText}
              </button>

              <button
                onClick={onConfirm}
                className={`px-5 py-2 rounded-lg text-white ${confirmColor}`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}