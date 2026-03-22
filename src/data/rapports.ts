export interface RapportProfil {
  frequence: string;
  frequenceGhz: number;
  vcore: string;
  vcoreV: number;
  ram: string;
  fclk: string;
  outil: string;
  duree: string;
  tempMax: number | null;
  stable: boolean;
  bsod: boolean;
}

export interface Rapport {
  id: number;
  titre: string;
  methode: "BIOS" | "Ryzen Master";
  bios: string;
  cooler: string;
  profil: RapportProfil;
  analyse: string;
  recommandations: string[];
  surveillance: string;
}

export const rapports: Rapport[] = [
  {
    id: 1,
    titre: "Test 1 — Premier overclocking via Ryzen Master",
    methode: "Ryzen Master",
    bios: "F17",
    cooler: "Wraith Prism (stock)",
    profil: {
      frequence: "3.9 GHz all-core",
      frequenceGhz: 3.9,
      vcore: "1.425 V",
      vcoreV: 1.425,
      ram: "2133 MHz (stock)",
      fclk: "1066 MHz",
      outil: "Prime95 (Small FFT)",
      duree: "5 minutes",
      tempMax: null,
      stable: false,
      bsod: true,
    },
    analyse:
      "Premier essai d'overclocking via Ryzen Master avec le cooler stock Wraith Prism. La tension de 1.425V s'est avérée trop élevée pour la stabilité, provoquant un BSOD rapide sous charge Prime95. Le refroidissement insuffisant du Wraith Prism aggravait la situation thermique.",
    recommandations: [
      "Réduire la tension Vcore à 1.25V maximum pour les premiers tests",
      "Utiliser le BIOS plutôt que Ryzen Master pour plus de stabilité",
      "Améliorer le refroidissement avant de pousser les fréquences",
    ],
    surveillance:
      "BSOD survenu en moins de 5 minutes. Aucune donnée thermique enregistrée.",
  },
  {
    id: 2,
    titre: "Test 2 — Passage au BIOS, 4.0 GHz",
    methode: "BIOS",
    bios: "F17",
    cooler: "Wraith Prism (stock)",
    profil: {
      frequence: "4.0 GHz all-core",
      frequenceGhz: 4.0,
      vcore: "1.25 V",
      vcoreV: 1.25,
      ram: "2133 MHz",
      fclk: "1066 MHz",
      outil: "OCCT 14.0.8 (Standard)",
      duree: "15 minutes",
      tempMax: 95,
      stable: false,
      bsod: false,
    },
    analyse:
      "Passage au BIOS avec une tension plus raisonnable à 1.25V. Le système a tenu 15 minutes mais les températures ont atteint 95°C avec le Wraith Prism sous charge maximale OCCT. Le système était instable avec des freezes aléatoires, sans BSOD franc.",
    recommandations: [
      "La tension 1.25V est insuffisante pour 4.0 GHz all-core stable",
      "Le Wraith Prism est clairement limité thermiquement",
      "Passer à un refroidissement AIO avant de continuer les tests",
    ],
    surveillance:
      "Températures critiques à 95°C. Freezes intermittents sans BSOD. Refroidissement à remplacer.",
  },
  {
    id: 3,
    titre: "Test 3 — Montée à 4.1 GHz",
    methode: "BIOS",
    bios: "F17",
    cooler: "Wraith Prism (stock)",
    profil: {
      frequence: "4.1 GHz all-core",
      frequenceGhz: 4.1,
      vcore: "1.27 V",
      vcoreV: 1.27,
      ram: "2133 MHz",
      fclk: "1066 MHz",
      outil: "Prime95 (Blend)",
      duree: "3 minutes",
      tempMax: null,
      stable: false,
      bsod: true,
    },
    analyse:
      "Tentative à 4.1 GHz avec 1.27V. BSOD en 3 minutes sous Prime95 Blend. La combinaison fréquence élevée + tension insuffisante + refroidissement limité a rendu ce profil immédiatement instable.",
    recommandations: [
      "4.1 GHz nécessite au minimum 1.30V sur ce processeur",
      "Ne pas tester à des fréquences supérieures avec le Wraith Prism",
      "Priorité : remplacer le refroidissement par un AIO",
    ],
    surveillance: "BSOD en 3 minutes. Test annulé.",
  },
  {
    id: 4,
    titre: "Test 4 — 4.15 GHz, premier profil stable*",
    methode: "BIOS",
    bios: "F20",
    cooler: "Wraith Prism (stock)",
    profil: {
      frequence: "4.15 GHz all-core",
      frequenceGhz: 4.15,
      vcore: "1.28 V",
      vcoreV: 1.28,
      ram: "3200 MHz CL16",
      fclk: "1600 MHz",
      outil: "OCCT 14.0.8 (Extreme)",
      duree: "20 minutes",
      tempMax: 97.1,
      stable: true,
      bsod: false,
    },
    analyse:
      "Premier profil techniquement stable avec BIOS mis à jour en F20 et RAM optimisée à 3200 MHz. Le système a tenu 20 minutes sans BSOD, mais les températures ont culminé à 97.1°C — dangereux pour un usage quotidien avec le Wraith Prism. Stable mais thermiquement inacceptable.",
    recommandations: [
      "Profil stable uniquement pour valider le potentiel OC du CPU",
      "Ne pas utiliser en production avec ces températures",
      "Installation de l'Arctic Liquid Freezer III Pro 360mm recommandée",
    ],
    surveillance:
      "97.1°C de pic. Profil techniquement stable mais thermiquement critique avec le cooler stock.",
  },
  {
    id: 5,
    titre: "Test 5 — Retour Ryzen Master, 4.3 GHz",
    methode: "Ryzen Master",
    bios: "F20",
    cooler: "Arctic Liquid Freezer III Pro 360",
    profil: {
      frequence: "4.3 GHz all-core",
      frequenceGhz: 4.3,
      vcore: "1.425 V",
      vcoreV: 1.425,
      ram: "3200 MHz CL16",
      fclk: "1600 MHz",
      outil: "Cinebench R23 + OCCT",
      duree: "5 minutes",
      tempMax: null,
      stable: false,
      bsod: true,
    },
    analyse:
      "Après installation de l'Arctic Liquid Freezer III Pro 360mm, tentative ambitieuse à 4.3 GHz via Ryzen Master avec 1.425V. La tension élevée combinée à une fréquence maximale a causé un BSOD. Le 3800X semble avoir un plafond OC limité indépendamment du refroidissement.",
    recommandations: [
      "4.3 GHz est au-delà du potentiel OC de ce processeur",
      "Revenir au BIOS pour un contrôle plus précis de la tension",
      "Cibler 4.2 GHz avec une tension conservative",
    ],
    surveillance: "BSOD en 5 minutes malgré le refroidissement AIO.",
  },
  {
    id: 6,
    titre: "Test 6 — Profil final 4.2 GHz",
    methode: "BIOS",
    bios: "F20",
    cooler: "Arctic Liquid Freezer III Pro 360",
    profil: {
      frequence: "4.2 GHz all-core",
      frequenceGhz: 4.2,
      vcore: "1.28 V",
      vcoreV: 1.28,
      ram: "3200 MHz CL16",
      fclk: "1600 MHz",
      outil: "OCCT 14.0.8 (Extreme + AVX2)",
      duree: "30 minutes",
      tempMax: 82.75,
      stable: true,
      bsod: false,
    },
    analyse:
      "Profil final validé : 4.2 GHz all-core à 1.28V avec Arctic Liquid Freezer III Pro 360mm. Après 30 minutes d'OCCT Extreme en mode AVX2 (le test le plus stressant), le système est resté parfaitement stable avec un pic de 82.75°C — une marge thermique confortable. Ce profil représente le meilleur rapport performance/stabilité/température pour ce CPU.",
    recommandations: [
      "Profil recommandé pour un usage quotidien gaming et productivité",
      "Gain de +7.7% par rapport au boost stock (4.5 GHz single-core → 4.2 GHz all-core constant)",
      "Surveiller les températures lors des mises à jour BIOS futures",
    ],
    surveillance:
      "82.75°C de pic sur 30 minutes OCCT AVX2. Système parfaitement stable. Profil validé pour usage quotidien.",
  },
];

export const getRapportById = (id: number) =>
  rapports.find((r) => r.id === id);

export const getRapportStable = () => rapports.filter((r) => r.profil.stable);

export const getRapportFinal = (): Rapport => {
  const final = rapports.find((r) => r.id === 6);
  if (final) return final;
  const last = rapports[rapports.length - 1];
  if (!last) throw new Error("rapports array is empty");
  return last;
};

export const getPrevRapport = (id: number) =>
  rapports.find((r) => r.id === id - 1);

export const getNextRapport = (id: number) =>
  rapports.find((r) => r.id === id + 1);
