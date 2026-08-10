export type Scene = {
  id: string;
  name: string;
  nameHi: string;
  epithetHi: string;
  image: string;
};

export const scenes: Scene[] = [
  {
    id: "jaipur",
    name: "Jaipur",
    nameHi: "जयपुर",
    epithetHi: "गुलाबी नगरी",
    image: "/scenes/jaipur.png",
  },
  {
    id: "jodhpur",
    name: "Jodhpur",
    nameHi: "जोधपुर",
    epithetHi: "नीली नगरी",
    image: "/scenes/jodhpur.png",
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer",
    nameHi: "जैसलमेर",
    epithetHi: "स्वर्ण नगरी",
    image: "/scenes/jaisalmer.png",
  },
  {
    id: "udaipur",
    name: "Udaipur",
    nameHi: "उदयपुर",
    epithetHi: "झीलों की नगरी",
    image: "/scenes/udaipur.png",
  },
  {
    id: "desert",
    name: "Desert",
    nameHi: "मरुस्थल",
    epithetHi: "थार की धरती",
    image: "/scenes/desert.png",
  },
];

export const SCENE_FADE_MS = 2_200;
