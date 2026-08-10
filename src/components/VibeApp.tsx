"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock } from "@/components/Clock";
import { Player } from "@/components/Player";
import { ScenePicker } from "@/components/ScenePicker";
import { SceneStage } from "@/components/SceneStage";
import { scenes } from "@/data/scenes";

export function VibeApp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [labelVisible, setLabelVisible] = useState(true);
  const scene = scenes[activeIndex];

  const selectScene = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setLabelVisible(false);
      window.setTimeout(() => {
        setActiveIndex(index);
        setLabelVisible(true);
      }, 280);
    },
    [activeIndex],
  );

  useEffect(() => {
    setLabelVisible(true);
  }, [activeIndex]);

  return (
    <main className="vibe">
      <SceneStage activeIndex={activeIndex} />
      <div className="vignette" />

      <div className="chrome">
        <header className="topbar">
          <Clock />
        </header>

        <div className="place">
          <h1 className={`place-hi${labelVisible ? " is-visible" : ""}`}>
            {scene.nameHi}
          </h1>
          <p className={`place-epithet${labelVisible ? " is-visible" : ""}`}>
            {scene.epithetHi}
          </p>
        </div>

        <div className="player-dock">
          <Player />
        </div>
      </div>

      <ScenePicker activeIndex={activeIndex} onSelect={selectScene} />
    </main>
  );
}
