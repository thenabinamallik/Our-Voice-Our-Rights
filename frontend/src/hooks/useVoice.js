import { useEffect } from "react";

export const useVoice = (text, enabled = true) => {
  useEffect(() => {
    if (!text || !enabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);

    return () => speechSynthesis.cancel();
  }, [text, enabled]);
};
