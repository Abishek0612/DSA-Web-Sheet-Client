import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BotIcon, MessageCircleIcon, XIcon } from "lucide-react";
import ChatBot from "./ChatBot";
import Button from "../Common/Button";

const AIAssistant: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-40"
          >
            <Button
              onClick={() => setIsChatOpen(true)}
              className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <BotIcon className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default AIAssistant;
