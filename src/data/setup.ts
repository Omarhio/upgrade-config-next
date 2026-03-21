export type ComponentCategory = "cpu" | "gpu" | "ram" | "mobo" | "storage" | "psu" | "cooler" | "case";

export interface Component {
  id: string;
  category: ComponentCategory;
  name: string;
  brand: string;
  model: string;
  image?: string;
  specs: Record<string, string>;
  price?: string;
  purchaseDate?: string;
}

export const components: Component[] = [
  {
    id: "cpu",
    category: "cpu",
    name: "Processeur",
    brand: "AMD",
    model: "Ryzen 7 3800X",
    image: "/images/cpu-ryzen-3800x.webp",
    specs: {
      Architecture: "Zen 2 — 7nm TSMC",
      Cœurs: "8C / 16T",
      Fréquence: "3.9 GHz base / 4.5 GHz boost",
      TDP: "105W",
      Socket: "AM4",
      Cache: "L2 4 Mo + L3 32 Mo",
      "Mémoire supportée": "DDR4-3200 dual-channel",
      PCIe: "PCIe 4.0",
    },
  },
  {
    id: "gpu",
    category: "gpu",
    name: "Carte graphique",
    brand: "NVIDIA",
    model: "GeForce RTX 3060",
    image: "/images/gpu-rtx-3060.webp",
    specs: {
      "Mémoire VRAM": "12 Go GDDR6",
      "Cuda Cores": "3584 CUDA",
      "Bus mémoire": "192-bit",
      "Bande passante": "360 Go/s",
      TDP: "170W",
      Connecteur: "PCIe 4.0 x16",
      Sorties: "3× DisplayPort 1.4 + HDMI 2.1",
      "Ray Tracing": "2ème génération",
    },
  },
  {
    id: "ram",
    category: "ram",
    name: "Mémoire RAM",
    brand: "G.Skill",
    model: "Aegis DDR4 32 Go",
    image: "/images/ram-gskill-aegis.webp",
    specs: {
      Capacité: "32 Go (4 × 8 Go)",
      Fréquence: "3000 MHz (XMP: 3200 MHz)",
      Timings: "CL16-18-18-38",
      Tension: "1.35V",
      Type: "DDR4 — Dual Channel",
      Format: "DIMM",
    },
  },
  {
    id: "mobo",
    category: "mobo",
    name: "Carte mère",
    brand: "Gigabyte",
    model: "B550 GAMING X V2",
    image: "/images/mobo-gigabyte-b550.webp",
    specs: {
      Chipset: "AMD B550",
      Socket: "AM4",
      Format: "ATX",
      BIOS: "F20 (AGESA 1.2.0.B)",
      RAM: "4 slots DDR4 — max 128 Go — 5100+ MHz OC",
      PCIe: "1× PCIe 4.0 x16 + 2× PCIe 3.0 x1",
      Stockage: "2× M.2 PCIe 4.0/3.0 + 4× SATA 6Gb/s",
      USB: "USB 3.2 Gen 2 Type-C + USB 3.2 Gen 1",
    },
  },
  {
    id: "ssd1",
    category: "storage",
    name: "SSD NVMe 1 To",
    brand: "Western Digital",
    model: "WD Blue SN550",
    image: "/images/ssd-wd-blue-sn550.webp",
    specs: {
      Capacité: "1 To",
      Interface: "PCIe 3.0 x4 NVMe",
      Format: "M.2 2280",
      "Lecture séq.": "2 400 Mo/s",
      "Écriture séq.": "1 950 Mo/s",
      Endurance: "600 TBW",
      NAND: "TLC 3D",
    },
  },
  {
    id: "ssd2",
    category: "storage",
    name: "SSD NVMe 500 Go",
    brand: "Kingston",
    model: "A2000",
    image: "/images/ssd-kingston-sa2000.webp",
    specs: {
      Capacité: "500 Go",
      Interface: "PCIe 3.0 x4 NVMe",
      Format: "M.2 2280",
      "Lecture séq.": "2 200 Mo/s",
      "Écriture séq.": "2 000 Mo/s",
      Endurance: "350 TBW",
      NAND: "TLC 3D",
    },
  },
  {
    id: "hdd",
    category: "storage",
    name: "Disque dur 1 To",
    brand: "Seagate",
    model: "BarraCuda ST1000DM010",
    image: "/images/hdd-seagate-barracuda.webp",
    specs: {
      Capacité: "1 To",
      Interface: "SATA III 6 Gb/s",
      Rotation: "7 200 RPM",
      Cache: "64 Mo",
      Format: "3.5\"",
    },
  },
  {
    id: "psu",
    category: "psu",
    name: "Alimentation",
    brand: "Corsair",
    model: "RM750x 750W",
    image: "/images/psu-corsair-rm750x.webp",
    specs: {
      Puissance: "750W",
      Certification: "80+ Gold",
      Type: "Modulaire complet",
      Rail: "Single +12V",
      PFC: "Actif",
      Édition: "2018",
      Ventilateur: "135mm — mode fanless < 40%",
    },
  },
  {
    id: "cooler",
    category: "cooler",
    name: "Refroidissement CPU",
    brand: "Arctic",
    model: "Liquid Freezer III Pro 360",
    image: "/images/cooler-arctic-liquid-freezer-iii-pro-360.webp",
    specs: {
      Type: "AIO 3 × 120mm",
      "Capacité de dissipation": "400W+",
      Ventilateurs: "3× 120mm (200–1900 RPM)",
      "Ventilateur VRM": "Intégré (contrôlé en PWM)",
      Pompe: "Vitesse variable",
      Compatibilité: "AM4 / AM5 / LGA1700",
      Pâte: "Arctic MX-6 incluse",
    },
  },
  {
    id: "case",
    category: "case",
    name: "Boîtier",
    brand: "NZXT",
    model: "H7 Flow",
    image: "/images/case-nzxt-h7-flow.webp",
    specs: {
      Format: "ATX Mid-Tower",
      "Façade": "Maille fine — airflow optimisé",
      "Radiateurs": "Jusqu'à 360mm (top + front)",
      "Drive bays": "2× 2.5\" + 2× 3.5\"",
      USB: "USB-C 3.2 Gen 2 + USB-A 3.2",
    },
  },
];

export const getComponentById = (id: string) =>
  components.find((c) => c.id === id);

export const getComponentsByCategory = (cat: ComponentCategory) =>
  components.filter((c) => c.category === cat);
