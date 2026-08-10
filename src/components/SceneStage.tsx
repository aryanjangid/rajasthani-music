"use client";

import { scenes } from "@/data/scenes";

type SceneStageProps = {
  activeIndex: number;
};

export function SceneStage({ activeIndex }: SceneStageProps) {
  return (
    <div className="scenes" aria-hidden>
      {scenes.map((scene, index) => (
        <div
          key={scene.id}
          className={`scene${index === activeIndex ? " is-active" : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={scene.image} alt="" draggable={false} />
        </div>
      ))}
    </div>
  );
}
