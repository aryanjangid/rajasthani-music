export type Track = {
  id: string;
  title: string;
  artist: string;
  /** Path under /public, e.g. /music/chaudhary.mp3 */
  src: string;
  /** Optional cover under /public */
  cover?: string;
};

/**
 * Drop your MP3/M4A files into `public/music/`, then add them here.
 * Example:
 * {
 *   id: "1",
 *   title: "Chaudhary",
 *   artist: "Mame Khan",
 *   src: "/music/chaudhary.mp3",
 *   cover: "/music/covers/chaudhary.jpg",
 * }
 */
export const playlist: Track[] = [
  // {
  //   id: "1",
  //   title: "Chaudhary",
  //   artist: "Mame Khan",
  //   src: "/music/Chaudhary.mp3",
  //   cover: "/music/covers/chaudhary.jpg",
  // },
  {
    id: "4",
    title: "Kalyo Kood Padyo Mela Me",
    artist: "Rajasthani Folk",
    src: "/music/Kalyo Kood Padyo Mela Me.mp3",
    cover: "/music/covers/kalyo-kood-padyo-mela-me.jpg",
  },
  {
    id: "2",
    title: "Ghoomar",
    artist: "Rajasthani Folk",
    src: "/music/Ghoomar.mp3",
    cover: "/music/covers/ghoomar.jpg",
  },
  {
    id: "8",
    title: "Banna Re Bagan Main Jhula Ghalya",
    artist: "Rajasthani Folk",
    src: "/music/Banna Re Bagan Main Jhula Ghalya.mp3",
    cover: "/music/covers/banna-re-bagan-main-jhula-ghalya.jpg",
  },
  // {
  //   id: "3",
  //   title: "Kajaliyo",
  //   artist: "Aakanksha Sharma",
  //   src: "/music/Kajaliyo.mp3",
  //   cover: "/music/covers/kajaliyo.jpg",
  // },

  {
    id: "5",
    title: "Padharo Mhare Desh (Ghoomar)",
    artist: "Rajasthani Folk",
    src: "/music/Padharo Mhare Desh Ghoomar.mp3",
    cover: "/music/covers/padharo-mhare-desh-ghoomar.jpg",
  },
  {
    id: "6",
    title: "Pipli",
    artist: "Rajasthani Folk",
    src: "/music/Pipli.mp3",
    cover: "/music/covers/pipli.jpg",
  },
  {
    id: "7",
    title: "Thane Kajaliyo Banalyun",
    artist: "Rajasthani Folk",
    src: "/music/Thane Kajaliyo Banalyun.mp3",
    cover: "/music/covers/thane-kajaliyo-banalyun.jpg",
  },
];
