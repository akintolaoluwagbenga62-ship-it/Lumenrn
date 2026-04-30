export type Flashcard = {
  id: string;
  subject: string;
  front: string;
  back: string;
};

export const FLASHCARDS: Flashcard[] = [
  // English
  { id: 'fc-en-1', subject: 'English', front: 'Synonym of "abundant"', back: 'Plentiful' },
  { id: 'fc-en-2', subject: 'English', front: 'Antonym of "candid"', back: 'Deceitful' },
  { id: 'fc-en-3', subject: 'English', front: 'Plural of "criterion"', back: 'Criteria' },
  { id: 'fc-en-4', subject: 'English', front: 'Figure of speech: "The wind whispered"', back: 'Personification' },
  { id: 'fc-en-5', subject: 'English', front: '"It is high time" is followed by which tense?', back: 'Past tense' },
  { id: 'fc-en-6', subject: 'English', front: 'Synonym of "lucid"', back: 'Clear' },
  { id: 'fc-en-7', subject: 'English', front: '"To bury the hatchet"', back: 'To make peace / end a quarrel' },

  // Mathematics
  { id: 'fc-mt-1', subject: 'Mathematics', front: 'Quadratic formula', back: 'x = (−b ± √(b²−4ac)) / 2a' },
  { id: 'fc-mt-2', subject: 'Mathematics', front: 'Area of a circle', back: 'πr²' },
  { id: 'fc-mt-3', subject: 'Mathematics', front: 'sin² θ + cos² θ', back: '= 1' },
  { id: 'fc-mt-4', subject: 'Mathematics', front: 'd/dx (xⁿ)', back: 'n·x^(n−1)' },
  { id: 'fc-mt-5', subject: 'Mathematics', front: '∫ xⁿ dx (n ≠ −1)', back: 'x^(n+1)/(n+1) + C' },
  { id: 'fc-mt-6', subject: 'Mathematics', front: 'Distance formula', back: '√((x₂−x₁)² + (y₂−y₁)²)' },
  { id: 'fc-mt-7', subject: 'Mathematics', front: 'Sum of interior angles of n-gon', back: '(n − 2) × 180°' },

  // Physics
  { id: 'fc-ph-1', subject: 'Physics', front: 'Newton\'s 2nd Law', back: 'F = m × a' },
  { id: 'fc-ph-2', subject: 'Physics', front: 'Ohm\'s Law', back: 'V = I × R' },
  { id: 'fc-ph-3', subject: 'Physics', front: 'Wave speed', back: 'v = f × λ' },
  { id: 'fc-ph-4', subject: 'Physics', front: 'Acceleration due to gravity (Earth)', back: '≈ 9.8 m/s²' },
  { id: 'fc-ph-5', subject: 'Physics', front: 'Speed of light in vacuum', back: '≈ 3 × 10⁸ m/s' },

  // Chemistry
  { id: 'fc-ch-1', subject: 'Chemistry', front: 'pH of pure water', back: '7 (neutral)' },
  { id: 'fc-ch-2', subject: 'Chemistry', front: 'Mole formula', back: 'n = m / M' },
  { id: 'fc-ch-3', subject: 'Chemistry', front: 'Acid + Base →', back: 'Salt + Water' },
  { id: 'fc-ch-4', subject: 'Chemistry', front: 'Atomic number of carbon', back: '6' },
  { id: 'fc-ch-5', subject: 'Chemistry', front: 'Bond in NaCl', back: 'Ionic' },

  // Biology
  { id: 'fc-bi-1', subject: 'Biology', front: 'Powerhouse of the cell', back: 'Mitochondrion' },
  { id: 'fc-bi-2', subject: 'Biology', front: 'Photosynthesis equation', back: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂' },
  { id: 'fc-bi-3', subject: 'Biology', front: 'Universal blood donor', back: 'O negative' },
  { id: 'fc-bi-4', subject: 'Biology', front: 'Genetic material', back: 'DNA' },
  { id: 'fc-bi-5', subject: 'Biology', front: 'Number of human chromosomes', back: '46 (23 pairs)' },
];
