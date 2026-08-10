"use client";

import { useEffect, useState } from "react";

function formatClock(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const h12 = hours % 12 || 12;
  const ampm = hours < 12 ? "am" : "pm";
  return `${h12}:${minutes} ${ampm}`;
}

export function Clock() {
  const [now, setNow] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const tick = () => setNow(formatClock(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return <time className="clock">{now}</time>;
}
