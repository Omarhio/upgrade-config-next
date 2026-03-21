export interface SbcSpec {
  label: string;
  value: string;
}

export interface SbcOcProfile {
  label: string;
  frequence: string;
  overVoltage: number;
  tempMax: number;
  stable: boolean;
  recommended?: boolean;
}

export interface Sbc {
  id: string;
  name: string;
  brand: string;
  model: string;
  image?: string;
  year: number;
  specs: SbcSpec[];
  ocProfiles?: SbcOcProfile[];
  notes?: string;
}

export const sbcs: Sbc[] = [
  {
    id: "rpi-zero-w",
    name: "Raspberry Pi Zero W v1.1",
    brand: "Raspberry Pi Foundation",
    model: "Zero W",
    image: "/images/sbc-raspberry-pi-zero.webp",
    year: 2017,
    specs: [
      { label: "CPU", value: "ARM Cortex-A53 @ 1 GHz (single-core)" },
      { label: "RAM", value: "512 Mo LPDDR2" },
      { label: "WiFi", value: "802.11 b/g/n 2.4 GHz" },
      { label: "Bluetooth", value: "4.1 + BLE" },
      { label: "GPIO", value: "40 broches" },
      { label: "Alimentation", value: "5V via micro-USB" },
      { label: "Format", value: "65 × 30 mm" },
      { label: "Consommation", value: "~120 mA (0.6W)" },
    ],
    notes: "Idéal pour projets IoT ultra-compacts et wearables.",
  },
  {
    id: "rpi-2b",
    name: "Raspberry Pi 2 Model B",
    brand: "Raspberry Pi Foundation",
    model: "2 Model B",
    image: "/images/sbc-raspberry-pi-2.webp",
    year: 2015,
    specs: [
      { label: "CPU", value: "ARM Cortex-A7 @ 900 MHz (quad-core)" },
      { label: "RAM", value: "1 Go LPDDR2" },
      { label: "Ethernet", value: "100 Mbps" },
      { label: "USB", value: "4× USB 2.0" },
      { label: "GPIO", value: "40 broches" },
      { label: "Alimentation", value: "5V/2A via micro-USB" },
      { label: "Format", value: "85 × 56 mm" },
      { label: "Consommation", value: "~350 mA (1.8W)" },
    ],
    notes: "Première version quad-core — bonne base pour apprentissage Linux.",
  },
  {
    id: "rpi-3b",
    name: "Raspberry Pi 3 Model B",
    brand: "Raspberry Pi Foundation",
    model: "3 Model B",
    image: "/images/sbc-raspberry-pi-3.webp",
    year: 2016,
    specs: [
      { label: "CPU", value: "ARM Cortex-A53 @ 1.2 GHz (quad-core 64-bit)" },
      { label: "RAM", value: "1 Go LPDDR2" },
      { label: "WiFi", value: "802.11 b/g/n 2.4 GHz" },
      { label: "Bluetooth", value: "4.1 + BLE" },
      { label: "Ethernet", value: "100 Mbps" },
      { label: "USB", value: "4× USB 2.0" },
      { label: "GPIO", value: "40 broches" },
      { label: "Alimentation", value: "5V/2.5A via micro-USB" },
      { label: "Format", value: "85 × 56 mm" },
      { label: "Consommation", value: "~400 mA (2W idle)" },
    ],
    ocProfiles: [
      { label: "Stock", frequence: "1200 MHz", overVoltage: 2, tempMax: 44.0, stable: true },
      { label: "OC léger", frequence: "1300 MHz", overVoltage: 2, tempMax: 63.4, stable: true },
      { label: "OC modéré", frequence: "1350 MHz", overVoltage: 4, tempMax: 69.3, stable: true },
      { label: "OC modéré (alim+)", frequence: "1350 MHz", overVoltage: 4, tempMax: 67.7, stable: true, recommended: true },
      { label: "OC max", frequence: "1400 MHz", overVoltage: 6, tempMax: 73.1, stable: true },
    ],
    notes: "Carte principale du projet SBC. Tests d'overclocking complets réalisés.",
  },
  {
    id: "orange-pi-3",
    name: "Orange Pi 3",
    brand: "Shenzhen Xunlong Software",
    model: "Orange Pi 3",
    image: "/images/sbc-orange-pi-3.webp",
    year: 2019,
    specs: [
      { label: "CPU", value: "Allwinner H6 @ 1.8 GHz (quad-core 64-bit)" },
      { label: "RAM", value: "1 Go LPDDR3" },
      { label: "WiFi", value: "802.11 ac dual-band (2.4/5 GHz)" },
      { label: "Bluetooth", value: "5.0" },
      { label: "Ethernet", value: "1 Gbps" },
      { label: "USB", value: "1× USB 3.0 + 2× USB 2.0 + 1× USB-C (OTG)" },
      { label: "GPIO", value: "26 broches" },
      { label: "Alimentation", value: "5V/3A via USB-C" },
      { label: "Format", value: "90 × 64 mm" },
      { label: "Consommation", value: "~600 mA (3W idle)" },
    ],
    notes:
      "Meilleur rapport performances/prix du comparatif. WiFi 5 GHz et Gigabit Ethernet sont des atouts majeurs.",
  },
];

export const getSbcById = (id: string) => sbcs.find((s) => s.id === id);
