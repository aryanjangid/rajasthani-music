"use client";

import type { CSSProperties } from "react";
import { scenes } from "@/data/scenes";

type ScenePickerProps = {
  activeIndex: number;
  autoCycle: boolean;
  onSelect: (index: number) => void;
  onEnableAuto: () => void;
};

export function ScenePicker({
  activeIndex,
  autoCycle,
  onSelect,
  onEnableAuto,
}: ScenePickerProps) {
  return (
    <nav className="scene-nav" aria-label="Choose a place">
      <ul className="scene-nav-list">
        {scenes.map((scene, index) => {
          const isActive = !autoCycle && index === activeIndex;
          return (
            <li
              key={scene.id}
              className="scene-nav-item"
              style={{ "--i": index } as CSSProperties}
            >
              <button
                type="button"
                className={`scene-dot${isActive ? " is-active" : ""}`}
                aria-label={scene.nameHi}
                aria-current={isActive ? "true" : undefined}
                onClick={() => onSelect(index)}
              >
                <span className="scene-dot-label" aria-hidden>
                  {scene.nameHi}
                </span>
                <span className="scene-dot-orb" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="scene-dot-thumb"
                    src={scene.image}
                    alt=""
                    draggable={false}
                  />
                </span>
              </button>
            </li>
          );
        })}

        <li
          className="scene-nav-item scene-nav-auto"
          style={{ "--i": scenes.length } as CSSProperties}
        >
          <button
            type="button"
            className={`scene-dot scene-dot-auto${autoCycle ? " is-active" : ""}`}
            aria-label="पृष्ठभूमि शफल"
            aria-pressed={autoCycle}
            onClick={onEnableAuto}
          >
            <span className="scene-dot-label" aria-hidden>
              शफल
            </span>
            <span className="scene-dot-orb scene-dot-auto-orb" aria-hidden>
              <span className="scene-auto-mosaic">
                {scenes.slice(0, 4).map((scene) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={scene.id}
                    src={scene.image}
                    alt=""
                    draggable={false}
                  />
                ))}
              </span>
              <span className="scene-auto-ring" />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
