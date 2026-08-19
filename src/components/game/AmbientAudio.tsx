import { useEffect } from "react";
import { armGesture, startAmbient } from "@/game/audio";
import { loadSave } from "@/game/storage";

/**
 * Headless ambient audio boot. No visible control — music is toggled from
 * Settings. Handles browsers that block autoplay until the first interaction.
 */
export function AmbientAudio() {
  useEffect(() => {
    const save = loadSave();
    if (save.settings.music) {
      void startAmbient();
      armGesture();
    } else {
      // Still arm a gesture listener so enabling music later works instantly.
      armGesture();
    }
  }, []);

  return null;
}
