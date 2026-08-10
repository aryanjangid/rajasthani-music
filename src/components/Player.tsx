"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { playlist, type Track } from "@/data/playlist";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function Dial({
  progress,
  playing,
}: {
  progress: number;
  playing: boolean;
}) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <div className={`radio-dial${playing ? " is-playing" : ""}`} aria-hidden>
      <svg className="radio-dial-ring" viewBox="0 0 80 80">
        <circle className="radio-dial-track" cx="40" cy="40" r={radius} />
        <circle
          className="radio-dial-progress"
          cx="40"
          cy="40"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="radio-dial-face">
        <span className="radio-dial-sun" />
        <span className="radio-dial-dots" />
      </div>
    </div>
  );
}

function VolumeKnob({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  const clamped = Math.min(1, Math.max(0, value));
  const angle = -135 + clamped * 270;

  return (
    <label className="radio-vol" title="Volume">
      <span className="radio-vol-ui" aria-hidden>
        <span className="radio-vol-icon">
          <svg viewBox="0 0 24 24">
            <path d="M3.5 9.5h3.2L11 6.2v11.6L6.7 14.5H3.5z" />
            {clamped > 0.05 && (
              <path
                className="radio-vol-wave"
                d="M14 9.2a3.2 3.2 0 0 1 0 5.6"
                fill="none"
              />
            )}
            {clamped > 0.45 && (
              <path
                className="radio-vol-wave"
                d="M16.2 7a5.4 5.4 0 0 1 0 10"
                fill="none"
              />
            )}
            {clamped > 0.8 && (
              <path
                className="radio-vol-wave"
                d="M18.3 5a7.4 7.4 0 0 1 0 14"
                fill="none"
              />
            )}
          </svg>
        </span>

        <span
          className="radio-vol-knob"
          style={{ "--vol-angle": `${angle}deg` } as CSSProperties}
        >
          <span className="radio-vol-needle" />
        </span>
      </span>

      <input
        className="radio-vol-input"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Volume"
      />
    </label>
  );
}

export function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  const hasTracks = playlist.length > 0;
  const track: Track | undefined = hasTracks
    ? playlist[index % playlist.length]
    : undefined;
  const progress = duration > 0 ? current / duration : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    audio.src = track.src;
    audio.load();
    setCurrent(0);
    setDuration(0);

    if (playing) {
      void audio.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track?.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (!hasTracks) return;
      setIndex((i) => (i + 1) % playlist.length);
      setPlaying(true);
    };

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
    };
  }, [hasTracks]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const prev = () => {
    if (!hasTracks) return;
    setIndex((i) => (i - 1 + playlist.length) % playlist.length);
    setPlaying(true);
  };

  const next = () => {
    if (!hasTracks) return;
    setIndex((i) => (i + 1) % playlist.length);
    setPlaying(true);
  };

  const onScrub = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  };

  return (
    <div
      className="radio"
      role="region"
      aria-label="धानी रेडियो"
      data-playing={playing ? "true" : "false"}
    >
      <audio ref={audioRef} preload="metadata" />

      <div className="radio-gota" aria-hidden />
      <div className="radio-corner radio-corner-tl" aria-hidden />
      <div className="radio-corner radio-corner-tr" aria-hidden />
      <div className="radio-corner radio-corner-bl" aria-hidden />
      <div className="radio-corner radio-corner-br" aria-hidden />

      <div className="radio-brand">
        <span className="radio-brand-hi">धानी रेडियो</span>
        <VolumeKnob value={volume} onChange={setVolume} />
      </div>

      <div className="radio-body">
        <Dial progress={progress} playing={playing} />

        <div className="radio-meta">
          <p className="radio-title">{track?.title ?? "Tune in soon"}</p>
          <p className="radio-artist">
            {track?.artist ?? "Add tracks to the playlist"}
          </p>

          <div className="radio-tuner">
            <span className="radio-time">{formatTime(current)}</span>
            <div className="radio-tuner-track">
              <input
                className="radio-scrub"
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={current}
                disabled={!track}
                onChange={(e) => onScrub(Number(e.target.value))}
                aria-label="Seek"
              />
              <div
                className="radio-tuner-fill"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="radio-tuner-needle"
                style={{ left: `${progress * 100}%` }}
              />
            </div>
            <span className="radio-time">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="radio-controls">
          <button
            className="radio-btn"
            type="button"
            onClick={prev}
            disabled={!hasTracks}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          <button
            className="radio-play"
            type="button"
            onClick={toggle}
            disabled={!hasTracks}
            aria-label={playing ? "Pause" : "Play"}
          >
            <span className="radio-play-ring" aria-hidden />
            {playing ? (
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M7 5h3.5v14H7zm6.5 0H17v14h-3.5z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden>
                <path d="M9 6.5v11l9-5.5z" />
              </svg>
            )}
          </button>

          <button
            className="radio-btn"
            type="button"
            onClick={next}
            disabled={!hasTracks}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
            </svg>
          </button>
        </div>
      </div>

      {!hasTracks && (
        <p className="radio-hint">Drop MP3s into public/music and list them in playlist.ts</p>
      )}
    </div>
  );
}
