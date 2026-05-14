export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "Over-Ear" | "In-Ear" | "Wireless";
  stockStatus: "High" | "Medium" | "Low";
  specs?: {
    driverType: string;
    frequencyResponse: string;
    impedance: string;
    cabling: string;
  };
}

export type Page = "home" | "detail" | "checkout" | "about";

export const PRODUCTS: Product[] = [
  {
    id: "aero-1-carbon",
    name: "AERO-1 Carbon",
    price: 599,
    description: "Architectural sound staging with carbon fiber weave isolation.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAS8GA-lIcz6qc86O3K7aG3zRLfxC_Aw8450OQ_o-FUGYzrYMswmaoFieNNUciGbOafDMaB8jxos0RGtXJ8F_RvuHXUWGeuvufe9CzOyWTofFhomcsUkP2jNrsnzi_NDrAYDLznFGlB_OkyzOsJFNFjyvLez1Z_FDWIrdhIbIefrsTW7u0scs-ift_v1T7MS8bh5_cuXeQRbduGabIv-AN8zZhCrOW57VDhPN5Ri7v_YkvJcXP7eIhQXXEdn--ieN4RUsQM1n_tZQQ",
    category: "Over-Ear",
    stockStatus: "High",
    specs: {
      driverType: "50mm Beryllium",
      frequencyResponse: "5Hz - 40kHz",
      impedance: "32 Ohms",
      cabling: "Silver-plated Copper 3m"
    }
  },
  {
    id: "neon-buds-v2",
    name: "Neon Buds V2",
    price: 249,
    description: "Miniaturized fidelity with transparent fiber optic casing.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA06fOZia5scQMn4oSg2WQ-NmWctRTkA-MWtB2ohFf4EgPe5qIJ8Fous3EHXILWb4NjGQTODV6MBFnITwqz40r8jriHyKhztXQeDLJYfTp_4w3-8YpgotmiUUvA9dpZvQy-qha_00J1J8ZPV_7aW0_5bJAPzkz8uArb5S8ronHwpidPVgLPjq8LdXJH4hd42Pdv1PS8NZsMsN2Orz1XQCgf5VXXzKGmMYEAFB2EJiaVS0pRmg8Jju2NXHhLJFYo62M5h799hydDlsY",
    category: "In-Ear",
    stockStatus: "Low",
    specs: {
      driverType: "Balanced Armature",
      frequencyResponse: "10Hz - 22kHz",
      impedance: "16 Ohms",
      cabling: "Integrated Bluetooth 5.4"
    }
  },
  {
    id: "neon-x1",
    name: "NEON-X1",
    price: 499,
    description: "Limited edition industrial transducer system for extreme fidelity.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBn4Ex2VRwH9KKdYOlPtNFqDLBj123nPCYrkZy-Cn6iYM2yzn8xoC8bRB_gClfMgpebtEYLGAHwIBZ6T4vZrOiDQm-qDAW7U7_azE8cxA-OrGevxwdDtwmVor99va6iaH-ljhGy6fg9L5Cco--DrrNFer6X3NhQ5rtEzC56bKgMvGz6BXX47R-gmj86AYLFmaIJwsarkemQjw5_DrgdYXe0dMUqPLJEWLqcYa0j1kP-wa8mSYVkKgqZ1Gj4BGLndJZqihXC8f1spF8",
    category: "Over-Ear",
    stockStatus: "Medium",
    specs: {
      driverType: "50mm Neodymium",
      frequencyResponse: "5Hz - 45kHz",
      impedance: "32 Ohms",
      cabling: "OFC Coiled 3m"
    }
  }
];
