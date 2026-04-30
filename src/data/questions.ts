export type Question = {
  id: string;
  subject: string;
  topic?: string;
  text: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  source?: 'builtin' | 'custom';
};

const Q = (
  id: string,
  subject: string,
  text: string,
  options: string[],
  answerIndex: number,
  explanation?: string,
  topic?: string
): Question => ({ id, subject, topic, text, options, answerIndex, explanation, source: 'builtin' });

export const QUESTIONS: Question[] = [
  // ===== ENGLISH (30) =====
  Q('en-1', 'English', 'Choose the option that means the same as ABUNDANT.', ['Scarce', 'Plentiful', 'Tiny', 'Hidden'], 1, '"Abundant" means existing in large quantities; plentiful.', 'Synonyms'),
  Q('en-2', 'English', 'Choose the option opposite in meaning to CANDID.', ['Frank', 'Honest', 'Deceitful', 'Open'], 2, '"Candid" means truthful and straightforward; the opposite is deceitful.', 'Antonyms'),
  Q('en-3', 'English', 'The thief, together with his accomplices, ___ caught.', ['were', 'are', 'was', 'have been'], 2, 'When subjects are joined by "together with", the verb agrees with the first subject (singular here).', 'Concord'),
  Q('en-4', 'English', 'Identify the figure of speech: "The wind whispered through the trees."', ['Metaphor', 'Simile', 'Personification', 'Hyperbole'], 2, 'Personification gives human qualities (whispering) to non-human things.', 'Figures of Speech'),
  Q('en-5', 'English', 'Choose the correctly punctuated sentence.', ['"Where are you going?" she asked.', 'Where are you going? she asked.', '"Where are you going" she asked?', 'She asked, "where are you going."'], 0, 'Direct speech is enclosed in quotation marks with the question mark inside.', 'Punctuation'),
  Q('en-6', 'English', 'The plural of "criterion" is ___.', ['criterions', 'criteria', 'criterias', 'criterion'], 1, 'Greek-derived: criterion (sing.) → criteria (pl.).', 'Plurals'),
  Q('en-7', 'English', 'Choose the word with a different stress pattern.', ['ediTORial', 'mathemaTIcal', 'environMENtal', 'INteresting'], 3, '"Interesting" stresses the first syllable; the others stress the third.', 'Stress'),
  Q('en-8', 'English', 'Synonym of OBSOLETE:', ['Modern', 'Outdated', 'Useful', 'Famous'], 1, '"Obsolete" = no longer in use; outdated.', 'Synonyms'),
  Q('en-9', 'English', 'Antonym of FRUGAL:', ['Thrifty', 'Wasteful', 'Careful', 'Quiet'], 1, '"Frugal" = sparing with money; opposite is wasteful.', 'Antonyms'),
  Q('en-10', 'English', 'Choose the correct option: Neither the principal nor the teachers ___ present.', ['was', 'were', 'is', 'has been'], 1, 'With "neither...nor", the verb agrees with the nearer subject ("teachers"—plural).', 'Concord'),
  Q('en-11', 'English', '"It is high time we ___ home."', ['go', 'are going', 'went', 'have gone'], 2, '"It is high time" is followed by past tense to express present urgency.', 'Tenses'),
  Q('en-12', 'English', 'Choose the option closest in meaning: He gave a TERSE reply.', ['Lengthy', 'Polite', 'Brief', 'Angry'], 2, '"Terse" = sparing in the use of words; brief.', 'Lexis'),
  Q('en-13', 'English', 'Identify the part of speech of "quickly" in: "She ran quickly."', ['Adjective', 'Verb', 'Adverb', 'Noun'], 2, '"Quickly" modifies the verb "ran" — it is an adverb.', 'Parts of Speech'),
  Q('en-14', 'English', 'Choose the correctly spelled word.', ['Embarass', 'Embarrass', 'Embarras', 'Embarrasse'], 1, 'Two r\'s and two s\'s: embarrass.', 'Spelling'),
  Q('en-15', 'English', 'The boy ___ I met yesterday is my cousin.', ['which', 'who', 'whom', 'whose'], 2, '"Whom" is the object of the verb "met".', 'Relative Pronouns'),
  Q('en-16', 'English', 'Choose the option that best completes: "She is the more intelligent ___ the two."', ['among', 'between', 'of', 'than'], 2, 'When comparing two, use "of the two".', 'Lexis & Structure'),
  Q('en-17', 'English', 'Antonym of PROLIFIC:', ['Productive', 'Creative', 'Unproductive', 'Famous'], 2, '"Prolific" = producing much; opposite is unproductive.', 'Antonyms'),
  Q('en-18', 'English', 'Synonym of LUCID:', ['Confused', 'Clear', 'Dark', 'Brilliant'], 1, '"Lucid" = expressed clearly; easy to understand.', 'Synonyms'),
  Q('en-19', 'English', 'Choose the option with the correct sound: "The vowel in BEAT is the same as the vowel in ___."', ['bit', 'bet', 'feet', 'bat'], 2, 'Both BEAT and FEET have the long /i:/ vowel.', 'Phonetics'),
  Q('en-20', 'English', '"He ___ to school every day."', ['go', 'goes', 'going', 'gone'], 1, 'Third person singular present takes -es.', 'Tenses'),
  Q('en-21', 'English', 'Idiom: "To bury the hatchet" means to ___.', ['Hide a weapon', 'End a quarrel', 'Start a fight', 'Forget a friend'], 1, 'The idiom means to make peace and stop fighting.', 'Idioms'),
  Q('en-22', 'English', 'The passive of "They built the house in 1990" is:', ['The house was built in 1990.', 'The house has been built in 1990.', 'The house is built in 1990.', 'The house had built in 1990.'], 0, 'Past simple active → "was/were + past participle".', 'Voice'),
  Q('en-23', 'English', 'Choose the noun in: "Honesty is the best policy."', ['is', 'best', 'Honesty', 'the'], 2, '"Honesty" is an abstract noun.', 'Parts of Speech'),
  Q('en-24', 'English', 'Antonym of GENEROUS:', ['Kind', 'Selfish', 'Wealthy', 'Friendly'], 1, '"Generous" = giving freely; opposite is selfish.', 'Antonyms'),
  Q('en-25', 'English', 'Choose the correct option: "I have lived here ___ ten years."', ['since', 'for', 'from', 'in'], 1, 'Use "for" with a duration; "since" with a starting point.', 'Prepositions'),
  Q('en-26', 'English', 'Plural of "phenomenon":', ['phenomenons', 'phenomena', 'phenomenas', 'phenomen'], 1, 'Greek plural form: phenomenon → phenomena.', 'Plurals'),
  Q('en-27', 'English', 'Identify the simile.', ['She is a star.', 'Her smile is sunshine.', 'She runs like the wind.', 'The world is a stage.'], 2, 'A simile compares using "like" or "as".', 'Figures of Speech'),
  Q('en-28', 'English', 'Choose the correct article: "He is ___ honest man."', ['a', 'an', 'the', 'no article'], 1, 'Use "an" before a vowel sound; "honest" begins with a silent h.', 'Articles'),
  Q('en-29', 'English', 'Synonym of METICULOUS:', ['Careless', 'Careful', 'Hasty', 'Lazy'], 1, '"Meticulous" = showing great attention to detail.', 'Synonyms'),
  Q('en-30', 'English', 'Choose the option that best replaces the underlined word: He was ENRAGED by the comment.', ['Pleased', 'Furious', 'Confused', 'Inspired'], 1, '"Enraged" = extremely angry; furious.', 'Lexis'),

  // ===== MATHEMATICS (30) =====
  Q('mt-1', 'Mathematics', 'Solve: 3x + 7 = 22.', ['3', '5', '7', '15'], 1, '3x = 15, so x = 5.', 'Algebra'),
  Q('mt-2', 'Mathematics', 'If 2^x = 32, find x.', ['4', '5', '6', '8'], 1, '32 = 2^5, so x = 5.', 'Indices'),
  Q('mt-3', 'Mathematics', 'Find the value of log₁₀100.', ['1', '2', '10', '100'], 1, 'log₁₀100 = log₁₀10² = 2.', 'Logarithms'),
  Q('mt-4', 'Mathematics', 'The area of a circle of radius 7 cm is (π = 22/7):', ['44 cm²', '154 cm²', '49 cm²', '22 cm²'], 1, 'A = πr² = 22/7 × 49 = 154.', 'Mensuration'),
  Q('mt-5', 'Mathematics', 'The roots of x² − 5x + 6 = 0 are:', ['1 and 6', '2 and 3', '−2 and −3', '−1 and −6'], 1, 'Factorise: (x − 2)(x − 3) = 0.', 'Quadratic Equations'),
  Q('mt-6', 'Mathematics', 'Convert 0.45 to a fraction in lowest terms.', ['9/20', '45/100', '4/9', '1/2'], 0, '0.45 = 45/100 = 9/20.', 'Fractions'),
  Q('mt-7', 'Mathematics', 'Find the gradient of the line 2y = 4x + 6.', ['2', '4', '6', '1/2'], 0, 'y = 2x + 3, so gradient = 2.', 'Coordinate Geometry'),
  Q('mt-8', 'Mathematics', 'A bag has 3 red and 2 blue balls. P(red) = ?', ['2/5', '3/5', '1/5', '3/2'], 1, '3 reds out of 5 total = 3/5.', 'Probability'),
  Q('mt-9', 'Mathematics', 'Mean of 4, 6, 8, 10 is:', ['5', '6', '7', '8'], 2, 'Sum = 28; mean = 28/4 = 7.', 'Statistics'),
  Q('mt-10', 'Mathematics', 'sin 30° equals:', ['1/2', '√3/2', '√2/2', '1'], 0, 'sin 30° = 0.5.', 'Trigonometry'),
  Q('mt-11', 'Mathematics', 'Simplify (x³)² × x⁴.', ['x⁹', 'x¹⁰', 'x¹²', 'x⁷'], 1, '(x³)² = x⁶; x⁶ × x⁴ = x¹⁰.', 'Indices'),
  Q('mt-12', 'Mathematics', 'If sets A = {1,2,3} and B = {3,4,5}, A ∩ B =', ['{1,2}', '{3}', '{4,5}', '{1,2,3,4,5}'], 1, 'Intersection = elements in both sets.', 'Sets'),
  Q('mt-13', 'Mathematics', '15% of 200 is:', ['15', '20', '30', '50'], 2, '0.15 × 200 = 30.', 'Percentages'),
  Q('mt-14', 'Mathematics', 'Solve: x/4 = 9.', ['2.25', '13', '36', '4/9'], 2, 'x = 9 × 4 = 36.', 'Algebra'),
  Q('mt-15', 'Mathematics', 'Distance between (1,2) and (4,6):', ['3', '4', '5', '7'], 2, '√((3)² + (4)²) = √25 = 5.', 'Coordinate Geometry'),
  Q('mt-16', 'Mathematics', 'A rectangle has length 8 cm and width 5 cm. Perimeter is:', ['13 cm', '26 cm', '40 cm', '21 cm'], 1, 'P = 2(8+5) = 26 cm.', 'Mensuration'),
  Q('mt-17', 'Mathematics', 'If f(x) = 2x + 3, find f(4).', ['7', '11', '14', '8'], 1, 'f(4) = 8 + 3 = 11.', 'Functions'),
  Q('mt-18', 'Mathematics', 'Simplify √50.', ['5√2', '25', '2√5', '10'], 0, '√50 = √(25×2) = 5√2.', 'Surds'),
  Q('mt-19', 'Mathematics', 'Convert 45° to radians.', ['π/2', 'π/3', 'π/4', 'π/6'], 2, '45° × π/180 = π/4.', 'Trigonometry'),
  Q('mt-20', 'Mathematics', 'The next term in 2, 6, 18, 54, ... is:', ['108', '162', '216', '72'], 1, 'Common ratio = 3; next = 54×3 = 162.', 'Sequences'),
  Q('mt-21', 'Mathematics', 'Sum of interior angles of a hexagon:', ['540°', '720°', '900°', '1080°'], 1, '(n−2)×180 = 4×180 = 720°.', 'Geometry'),
  Q('mt-22', 'Mathematics', 'If x² = 49 then x =', ['±7', '7 only', '−7 only', '14'], 0, 'Square root has both positive and negative roots.', 'Algebra'),
  Q('mt-23', 'Mathematics', 'In how many ways can the letters of LUMEN be arranged?', ['24', '60', '120', '720'], 2, '5! = 120 (all letters distinct).', 'Permutations'),
  Q('mt-24', 'Mathematics', 'Solve 2x − 3 < 7.', ['x < 5', 'x > 5', 'x < 2', 'x > 2'], 0, '2x < 10, so x < 5.', 'Inequalities'),
  Q('mt-25', 'Mathematics', 'Volume of a cube of side 4 cm:', ['16 cm³', '32 cm³', '64 cm³', '12 cm³'], 2, 'V = a³ = 64.', 'Mensuration'),
  Q('mt-26', 'Mathematics', 'Differentiate y = x³.', ['3x', 'x²', '3x²', 'x³/3'], 2, 'd/dx(xⁿ) = nx^(n−1).', 'Calculus'),
  Q('mt-27', 'Mathematics', '∫ 2x dx =', ['x²', 'x² + C', '2', '2x² + C'], 1, '∫ 2x dx = x² + C.', 'Calculus'),
  Q('mt-28', 'Mathematics', 'A trader bought goods for ₦5,000 and sold for ₦6,500. Profit % is:', ['20%', '25%', '30%', '15%'], 2, 'Profit = 1500; %= 1500/5000 ×100 = 30%.', 'Commercial Arithmetic'),
  Q('mt-29', 'Mathematics', 'Find the median of 3, 7, 2, 8, 5.', ['3', '5', '7', '8'], 1, 'Sorted: 2,3,5,7,8 — middle is 5.', 'Statistics'),
  Q('mt-30', 'Mathematics', 'Simplify: (3 + √2)(3 − √2).', ['7', '9 − 2', '11', '6'], 0, 'Difference of squares: 9 − 2 = 7.', 'Surds'),

  // ===== PHYSICS (20) =====
  Q('ph-1', 'Physics', 'SI unit of force:', ['Joule', 'Watt', 'Newton', 'Pascal'], 2, 'Force is measured in Newtons (N).', 'Mechanics'),
  Q('ph-2', 'Physics', 'A body of mass 5 kg accelerates at 2 m/s². Force is:', ['2.5 N', '7 N', '10 N', '3 N'], 2, 'F = ma = 5×2 = 10 N.', 'Newton\'s Laws'),
  Q('ph-3', 'Physics', 'Speed of light in vacuum (approx):', ['3×10⁶ m/s', '3×10⁸ m/s', '3×10¹⁰ m/s', '3×10⁵ m/s'], 1, 'c ≈ 3×10⁸ m/s.', 'Waves'),
  Q('ph-4', 'Physics', 'Unit of electric current:', ['Volt', 'Ampere', 'Ohm', 'Watt'], 1, 'Current is measured in amperes.', 'Electricity'),
  Q('ph-5', 'Physics', 'Pressure of a force 100 N over 4 m² is:', ['25 Pa', '50 Pa', '100 Pa', '400 Pa'], 0, 'P = F/A = 100/4 = 25 Pa.', 'Pressure'),
  Q('ph-6', 'Physics', 'Work done = ?', ['Force × time', 'Force × distance', 'Mass × acceleration', 'Power × distance'], 1, 'W = F × d (in direction of force).', 'Energy'),
  Q('ph-7', 'Physics', 'Acceleration due to gravity (Earth):', ['1.6 m/s²', '9.8 m/s²', '20 m/s²', '6.5 m/s²'], 1, 'g ≈ 9.8 m/s² near Earth\'s surface.', 'Mechanics'),
  Q('ph-8', 'Physics', 'Type of lens used to correct short-sightedness:', ['Convex', 'Concave', 'Plano-convex', 'Cylindrical'], 1, 'Concave (diverging) lens corrects myopia.', 'Optics'),
  Q('ph-9', 'Physics', 'A wave with frequency 50 Hz and wavelength 4 m has speed:', ['54 m/s', '12.5 m/s', '200 m/s', '0.08 m/s'], 2, 'v = f × λ = 50×4 = 200 m/s.', 'Waves'),
  Q('ph-10', 'Physics', 'Ohm\'s law: V = ?', ['I/R', 'IR', 'I + R', 'R/I'], 1, 'V = I × R.', 'Electricity'),
  Q('ph-11', 'Physics', 'Energy stored in a stretched spring is:', ['Kinetic', 'Elastic potential', 'Chemical', 'Thermal'], 1, 'Stretched/compressed springs store elastic PE.', 'Energy'),
  Q('ph-12', 'Physics', 'Process by which heat travels through metals:', ['Convection', 'Conduction', 'Radiation', 'Evaporation'], 1, 'In solids (metals), heat travels by conduction.', 'Heat'),
  Q('ph-13', 'Physics', 'A satellite stays in orbit because of:', ['Magnetic force', 'Gravitational force', 'Frictional force', 'Normal force'], 1, 'Earth\'s gravity provides centripetal force.', 'Gravitation'),
  Q('ph-14', 'Physics', 'A device that converts AC to DC:', ['Transformer', 'Rectifier', 'Inductor', 'Capacitor'], 1, 'A rectifier converts alternating current to direct.', 'Electronics'),
  Q('ph-15', 'Physics', 'The principle that explains flotation is:', ['Hooke\'s', 'Archimedes\'', 'Pascal\'s', 'Boyle\'s'], 1, 'Archimedes\' principle relates buoyancy to displaced fluid weight.', 'Fluids'),
  Q('ph-16', 'Physics', 'A 60 W bulb used for 2 hours consumes:', ['30 Wh', '60 Wh', '120 Wh', '0.12 Wh'], 2, 'E = P×t = 60 × 2 = 120 Wh.', 'Electricity'),
  Q('ph-17', 'Physics', 'Sound cannot travel through:', ['Solids', 'Liquids', 'Gases', 'Vacuum'], 3, 'Sound needs a medium; it cannot travel through vacuum.', 'Waves'),
  Q('ph-18', 'Physics', 'Half-life of a radioactive substance is:', ['Time to fully decay', 'Time for half to decay', 'Time to double', 'Time for one atom to decay'], 1, 'It\'s the time for half the nuclei to decay.', 'Radioactivity'),
  Q('ph-19', 'Physics', 'Resistance of a 220 V appliance drawing 2 A:', ['0.009 Ω', '110 Ω', '220 Ω', '440 Ω'], 1, 'R = V/I = 220/2 = 110 Ω.', 'Electricity'),
  Q('ph-20', 'Physics', 'A vector quantity is:', ['Mass', 'Distance', 'Velocity', 'Time'], 2, 'Velocity has magnitude and direction.', 'Mechanics'),

  // ===== CHEMISTRY (20) =====
  Q('ch-1', 'Chemistry', 'Atomic number of oxygen:', ['6', '7', '8', '16'], 2, 'O has 8 protons.', 'Atomic Structure'),
  Q('ch-2', 'Chemistry', 'Chemical formula of water:', ['H₂O₂', 'HO', 'H₂O', 'OH'], 2, 'Two hydrogens, one oxygen.', 'Compounds'),
  Q('ch-3', 'Chemistry', 'pH of pure water at 25 °C:', ['0', '7', '14', '1'], 1, 'Pure water is neutral; pH = 7.', 'Acids and Bases'),
  Q('ch-4', 'Chemistry', 'Process of liquid → gas at all temps below boiling:', ['Boiling', 'Evaporation', 'Sublimation', 'Condensation'], 1, 'Evaporation occurs at the surface, below boiling point.', 'States of Matter'),
  Q('ch-5', 'Chemistry', 'Isotopes have same ___ but different ___.', ['neutrons; protons', 'protons; neutrons', 'mass; charge', 'electrons; protons'], 1, 'Isotopes share atomic number but differ in mass number.', 'Atomic Structure'),
  Q('ch-6', 'Chemistry', 'Litmus turns ___ in acid.', ['Blue', 'Red', 'Green', 'Yellow'], 1, 'Acidic solutions turn blue litmus red.', 'Acids and Bases'),
  Q('ch-7', 'Chemistry', 'Number of moles in 18 g of water (M=18 g/mol):', ['0.5', '1', '2', '18'], 1, 'n = m/M = 18/18 = 1 mol.', 'Mole Concept'),
  Q('ch-8', 'Chemistry', 'NaCl in water dissociates into:', ['Na and Cl₂', 'Na⁺ and Cl⁻', 'NaCl molecules', 'Na₂ and Cl'], 1, 'NaCl → Na⁺ + Cl⁻ in solution.', 'Ionic Compounds'),
  Q('ch-9', 'Chemistry', 'Catalyst in a reaction:', ['Increases temperature', 'Speeds up reaction', 'Is consumed', 'Is a reactant'], 1, 'Catalysts speed up reactions without being consumed.', 'Reaction Kinetics'),
  Q('ch-10', 'Chemistry', 'Hardest known natural substance:', ['Gold', 'Iron', 'Diamond', 'Graphite'], 2, 'Diamond is the hardest known natural material.', 'Carbon'),
  Q('ch-11', 'Chemistry', 'Combustion of methane produces:', ['CO₂ and H₂O', 'CO and O₂', 'H₂ and O₂', 'C and H₂O'], 0, 'CH₄ + 2O₂ → CO₂ + 2H₂O.', 'Hydrocarbons'),
  Q('ch-12', 'Chemistry', 'Element with atomic number 1:', ['Helium', 'Hydrogen', 'Lithium', 'Carbon'], 1, 'Hydrogen is the lightest element with Z = 1.', 'Periodic Table'),
  Q('ch-13', 'Chemistry', 'Most common gas in the atmosphere:', ['O₂', 'N₂', 'CO₂', 'Ar'], 1, 'Air is ~78% nitrogen.', 'Air'),
  Q('ch-14', 'Chemistry', 'A salt is formed from:', ['Acid + base', 'Acid + acid', 'Base + base', 'Salt + water'], 0, 'Neutralisation: acid + base → salt + water.', 'Acids and Bases'),
  Q('ch-15', 'Chemistry', 'Type of bond in NaCl:', ['Covalent', 'Ionic', 'Metallic', 'Hydrogen'], 1, 'NaCl is an ionic compound.', 'Bonding'),
  Q('ch-16', 'Chemistry', 'Indicator that turns pink in basic solution:', ['Methyl orange', 'Phenolphthalein', 'Litmus', 'Universal'], 1, 'Phenolphthalein turns pink/magenta in bases.', 'Acids and Bases'),
  Q('ch-17', 'Chemistry', 'Unit of amount of substance:', ['Gram', 'Litre', 'Mole', 'Newton'], 2, 'Mole (mol) is the SI unit for amount of substance.', 'Mole Concept'),
  Q('ch-18', 'Chemistry', 'Process of separating components based on boiling point:', ['Filtration', 'Distillation', 'Decantation', 'Sublimation'], 1, 'Distillation separates liquids by boiling point.', 'Separation'),
  Q('ch-19', 'Chemistry', 'A reducing agent:', ['Gains electrons', 'Loses electrons', 'Has no charge', 'Is always a metal'], 1, 'A reducing agent loses electrons (gets oxidised).', 'Redox'),
  Q('ch-20', 'Chemistry', 'Element used in vulcanising rubber:', ['Carbon', 'Sulphur', 'Phosphorus', 'Nitrogen'], 1, 'Sulphur cross-links rubber chains.', 'Industrial Chemistry'),

  // ===== BIOLOGY (20) =====
  Q('bi-1', 'Biology', 'Powerhouse of the cell:', ['Nucleus', 'Mitochondrion', 'Ribosome', 'Lysosome'], 1, 'Mitochondria produce ATP via respiration.', 'Cell Biology'),
  Q('bi-2', 'Biology', 'Process by which plants make food:', ['Respiration', 'Photosynthesis', 'Transpiration', 'Digestion'], 1, 'Photosynthesis uses sunlight to convert CO₂ + H₂O → glucose.', 'Plants'),
  Q('bi-3', 'Biology', 'Largest organ of the human body:', ['Liver', 'Skin', 'Brain', 'Heart'], 1, 'Skin is the largest organ by surface area.', 'Human Body'),
  Q('bi-4', 'Biology', 'Pigment that gives plants green colour:', ['Chlorophyll', 'Carotene', 'Xanthophyll', 'Hemoglobin'], 0, 'Chlorophyll absorbs red/blue light, reflects green.', 'Plants'),
  Q('bi-5', 'Biology', 'Number of chromosomes in a normal human body cell:', ['23', '46', '48', '22'], 1, 'Diploid: 46 chromosomes (23 pairs).', 'Genetics'),
  Q('bi-6', 'Biology', 'A reflex action is controlled by:', ['Brain', 'Spinal cord', 'Heart', 'Liver'], 1, 'Reflexes pass through the spinal cord without brain involvement.', 'Nervous System'),
  Q('bi-7', 'Biology', 'Vitamin made by skin in sunlight:', ['A', 'B12', 'C', 'D'], 3, 'UV light triggers vitamin D production in skin.', 'Nutrition'),
  Q('bi-8', 'Biology', 'Disease caused by deficiency of vitamin C:', ['Rickets', 'Scurvy', 'Beriberi', 'Anaemia'], 1, 'Scurvy is caused by lack of vitamin C.', 'Nutrition'),
  Q('bi-9', 'Biology', 'Insects breathe through:', ['Lungs', 'Gills', 'Spiracles', 'Skin'], 2, 'Insects exchange gas via spiracles and tracheae.', 'Respiration'),
  Q('bi-10', 'Biology', 'Genetic material:', ['Protein', 'DNA', 'Lipid', 'Carbohydrate'], 1, 'DNA carries hereditary information.', 'Genetics'),
  Q('bi-11', 'Biology', 'Universal blood donor type:', ['A', 'B', 'AB', 'O−'], 3, 'O negative has no A/B antigens or Rh factor.', 'Circulation'),
  Q('bi-12', 'Biology', 'Plants take in water through:', ['Leaves', 'Stem', 'Root hairs', 'Flowers'], 2, 'Root hairs absorb water by osmosis.', 'Plants'),
  Q('bi-13', 'Biology', 'Bone of the upper arm:', ['Femur', 'Tibia', 'Humerus', 'Radius'], 2, 'Humerus is the upper arm bone.', 'Skeleton'),
  Q('bi-14', 'Biology', 'Site of protein synthesis in the cell:', ['Nucleus', 'Ribosome', 'Mitochondrion', 'Vacuole'], 1, 'Ribosomes assemble amino acids into proteins.', 'Cell Biology'),
  Q('bi-15', 'Biology', 'Type of joint at the elbow:', ['Ball-and-socket', 'Hinge', 'Pivot', 'Gliding'], 1, 'The elbow is a hinge joint allowing flexion/extension.', 'Skeleton'),
  Q('bi-16', 'Biology', 'Bacteria are classified as:', ['Eukaryotes', 'Prokaryotes', 'Viruses', 'Fungi'], 1, 'Bacteria lack a true nucleus → prokaryotes.', 'Microbiology'),
  Q('bi-17', 'Biology', 'Final product of digestion of starch:', ['Glucose', 'Amino acids', 'Fatty acids', 'Glycerol'], 0, 'Starch → glucose by amylase.', 'Digestion'),
  Q('bi-18', 'Biology', 'Group of similar cells = ?', ['Organ', 'Tissue', 'Organism', 'System'], 1, 'A tissue is a group of similar cells doing a similar job.', 'Cell Biology'),
  Q('bi-19', 'Biology', 'Female reproductive part of a flower:', ['Stamen', 'Pistil', 'Petal', 'Sepal'], 1, 'The pistil (carpel) is the female structure.', 'Reproduction'),
  Q('bi-20', 'Biology', 'Gas exchanged at the alveoli:', ['Nitrogen and oxygen', 'Oxygen and carbon dioxide', 'Hydrogen and oxygen', 'Carbon monoxide and oxygen'], 1, 'O₂ enters blood; CO₂ leaves blood at the alveoli.', 'Respiration'),
];

export const SUBJECTS = Array.from(new Set(QUESTIONS.map((q) => q.subject)));

export const questionsBySubject = (subject: string, includeCustom: Question[] = []) =>
  [...QUESTIONS, ...includeCustom].filter((q) => q.subject === subject);
