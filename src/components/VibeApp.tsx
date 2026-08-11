"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock } from "@/components/Clock";
import { Player } from "@/components/Player";
import { ScenePicker } from "@/components/ScenePicker";
import { SceneStage } from "@/components/SceneStage";
import { SCENE_DURATION_MS, scenes } from "@/data/scenes";

export function VibeApp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);
  const [labelVisible, setLabelVisible] = useState(true);
  const scene = scenes[activeIndex];

  const goToScene = useCallback((index: number) => {
    setLabelVisible(false);
    window.setTimeout(() => {
      setActiveIndex(index);
      setLabelVisible(true);
    }, 280);
  }, []);

  const selectScene = useCallback(
    (index: number) => {
      setAutoCycle(false);
      if (index === activeIndex) return;
      goToScene(index);
    },
    [activeIndex, goToScene],
  );

  const enableAutoCycle = useCallback(() => {
    setAutoCycle(true);
  }, []);

  useEffect(() => {
    setLabelVisible(true);
  }, [activeIndex]);

  useEffect(() => {
    if (!autoCycle) return;

    const advance = () => {
      setLabelVisible(false);
      window.setTimeout(() => {
        setActiveIndex((i) => {
          if (scenes.length < 2) return i;
          let next = i;
          while (next === i) {
            next = Math.floor(Math.random() * scenes.length);
          }
          return next;
        });
        setLabelVisible(true);
      }, 280);
    };

    const id = window.setInterval(advance, SCENE_DURATION_MS);
    return () => window.clearInterval(id);
  }, [autoCycle]);

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

      <ScenePicker
        activeIndex={activeIndex}
        autoCycle={autoCycle}
        onSelect={selectScene}
        onEnableAuto={enableAutoCycle}
      />
    </main>
  );
}
