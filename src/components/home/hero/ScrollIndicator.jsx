import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center">
        <div className="w-1.5 h-3 bg-white rounded-full mt-2"></div>
      </div>
    </motion.div>
  );
}