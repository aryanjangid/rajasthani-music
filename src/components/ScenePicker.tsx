"use client";

import type { CSSProperties } from "react";
import { scenes } from "@/data/scenes";

type ScenePickerProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ScenePicker({ activeIndex, onSelect }: ScenePickerProps) {
  return (
    <nav className="scene-nav" aria-label="Choose a place">
      <ul className="scene-nav-list">
        {scenes.map((scene, index) => {
          const isActive = index === activeIndex;
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
      </ul>
    </nav>
  );
}
