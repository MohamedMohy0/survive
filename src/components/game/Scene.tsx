import type { ReactNode } from "react";
import hotel from "@/assets/scene-hotel.jpg";
import lobby from "@/assets/scene-lobby.jpg";
import hallway from "@/assets/scene-hallway.jpg";
import room from "@/assets/scene-room.jpg";
import basement from "@/assets/scene-basement.jpg";
import menu from "@/assets/scene-menu.jpg";
import missionsImg from "@/assets/scene-missions.jpg";
import settingsImg from "@/assets/scene-settings.jpg";
import journalImg from "@/assets/scene-journal.jpg";
import endingsImg from "@/assets/scene-endings.jpg";

const imageByLocation: Record<string, string> = {
  menu: menu,
  missions: missionsImg,
  settings: settingsImg,
  journal: journalImg,
  endings: endingsImg,
  hotel_exterior: hotel,
  street: hotel,
  parking: hotel,
  lobby: lobby,
  manager_office: lobby,
  archive: lobby,
  security_room: lobby,
  stairs: hallway,
  elevator: hallway,
  hallway2: hallway,
  back_corridor: hallway,
  room207: room,
  room208: room,
  hidden_room: room,
  kitchen: basement,
  basement: basement,
  roof: hotel,
};

const moodByLocation: Record<string, string> = {
  menu: "from-[oklch(0.26_0.03_245)] to-[oklch(0.15_0.02_255)]",
  missions: "from-[oklch(0.28_0.035_72)] to-[oklch(0.16_0.02_255)]",
  hotel_exterior: "from-[oklch(0.24_0.03_250)] to-[oklch(0.18_0.02_255)]",
  lobby: "from-[oklch(0.3_0.035_70)] to-[oklch(0.2_0.02_250)]",
  stairs: "from-[oklch(0.25_0.02_250)] to-[oklch(0.17_0.02_255)]",
  elevator: "from-[oklch(0.28_0.02_240)] to-[oklch(0.18_0.015_250)]",
  hallway2: "from-[oklch(0.27_0.03_75)] to-[oklch(0.17_0.02_255)]",
  room207: "from-[oklch(0.32_0.05_78)] to-[oklch(0.19_0.02_250)]",
  room208: "from-[oklch(0.28_0.03_78)] to-[oklch(0.19_0.02_250)]",
  back_corridor: "from-[oklch(0.24_0.02_200)] to-[oklch(0.17_0.02_250)]",
  kitchen: "from-[oklch(0.27_0.02_180)] to-[oklch(0.18_0.02_250)]",
  basement: "from-[oklch(0.22_0.02_215)] to-[oklch(0.15_0.02_250)]",
  manager_office: "from-[oklch(0.3_0.02_240)] to-[oklch(0.2_0.02_250)]",
  security_room: "from-[oklch(0.26_0.03_160)] to-[oklch(0.18_0.02_250)]",
  archive: "from-[oklch(0.29_0.03_85)] to-[oklch(0.19_0.02_250)]",
  roof: "from-[oklch(0.32_0.03_240)] to-[oklch(0.2_0.02_250)]",
  parking: "from-[oklch(0.25_0.02_250)] to-[oklch(0.17_0.02_250)]",
  street: "from-[oklch(0.28_0.03_245)] to-[oklch(0.18_0.02_250)]",
  hidden_room: "from-[oklch(0.26_0.05_60)] to-[oklch(0.15_0.02_250)]",
};

export function Scene({
  location,
  children,
  flicker = false,
}: {
  location?: string | undefined;
  children: ReactNode;
  flicker?: boolean | undefined;
}) {
  const mood = (location && moodByLocation[location]) ?? moodByLocation["lobby"];
  const image = (location && imageByLocation[location]) ?? lobby;

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div
        key={location}
        className={`absolute inset-0 bg-gradient-to-b ${mood} animate-drift`}
        aria-hidden
      />
      <img
        key={`img-${location}`}
        src={image}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={1024}
        className="animate-drift absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-luminosity"
      />
      <div
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_20%,oklch(0.85_0.1_76/0.14),transparent_70%)] ${
          flicker ? "animate-flicker" : ""
        }`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_35%,oklch(0.12_0.02_250/0.85))]"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-[100dvh] flex-col">{children}</div>
    </div>
  );
}
