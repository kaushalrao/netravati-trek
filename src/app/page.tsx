import { Hero } from "@/components/sections/Hero";
import { TrekGuides } from "@/components/sections/TrekGuides";
import { TimelineDay } from "@/components/sections/TimelineDay";
import { ExpeditionHUD } from "@/components/ui/ExpeditionHUD";
import { DesktopSidebar } from "@/components/ui/DesktopSidebar";
import { StoryInterstitial } from "@/components/ui/StoryInterstitial";
import { CinematicBackdrop } from "@/components/ui/CinematicBackdrop";
import { JourneyEnd } from "@/components/sections/JourneyEnd";
import { PackingGuide } from "@/components/sections/PackingGuide";
import { itinerary } from "@/content/itinerary";

export default function Home() {
  const day1Checkpoints = itinerary.filter(cp => cp.day === 1);
  const day2Checkpoints = itinerary.filter(cp => cp.day === 2);
  const day3Checkpoints = itinerary.filter(cp => cp.day === 3);

  return (
    <main className="relative min-h-screen bg-(--color-canopy) selection:bg-(--color-moss) selection:text-(--color-mist) pb-32 flex">
      <DesktopSidebar />
      <div className="w-full lg:pl-[320px] transition-all">
        <CinematicBackdrop />
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent to-(--color-canopy) z-0 opacity-20" />

        <Hero />
        <TrekGuides />
        <ExpeditionHUD />
        <PackingGuide />

        <div className="relative z-10">
          <StoryInterstitial text="The journey begins where the road ends. We leave the comfort of the city for the embrace of the Western Ghats." align="left" />

          <TimelineDay
            dayNumber={1}
            title="The Ascent"
            subtitle="Journey Into The Wild"
            checkpoints={day1Checkpoints}
            metadata={{
              elevationGain: "+850m",
              distance: "11 km trek",
              duration: "6-7 Hours",
              terrain: ["Forest", "River", "Ridge"],
              theme: "forest",
              highlights: ["Forest Trails", "River Traverses", "Summit Push"]
            }}
          />

          <StoryInterstitial text="A quiet night under the stars. Tomorrow, we chase the waterfall." align="right" />

          <TimelineDay
            dayNumber={2}
            title="Waterfalls & Viewpoints"
            subtitle="Exploration Beyond the Summit"
            checkpoints={day2Checkpoints}
            metadata={{
              elevationGain: "+420m",
              distance: "2 km trek",
              duration: "7-8 Hours",
              terrain: ["Valleys", "Waterfalls", "Viewpoints"],
              theme: "exploration",
              highlights: ["Hidden Falls", "Valley Descent", "Campfire Night"]
            }}
          />

          <StoryInterstitial text="The mountains ask for nothing, but they give you everything. Time slows down in the estate." align="left" />

          <TimelineDay
            dayNumber={3}
            title="Slow Morning"
            subtitle="Estate Life & Departure"
            checkpoints={day3Checkpoints}
            metadata={{
              elevationGain: "-200m",
              distance: "3 km",
              duration: "2 Hours",
              terrain: ["Estate", "Trails"],
              theme: "farewell",
              highlights: ["Coffee Walk", "Departure"]
            }}
          />

          <JourneyEnd />
        </div>
      </div>
    </main>
  );
}
