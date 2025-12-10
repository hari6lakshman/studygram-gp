import type { Subject } from './types';
import { Atom, FlaskConical, Sigma, Dna, Code } from 'lucide-react';

export const SUBJECTS: Subject[] = [
  {
    name: 'Physics',
    icon: Atom,
    topics: [
      { 
        id: 'phys-1', 
        title: 'Electrostatics', 
        description: 'Learn about electric charges, fields, and potential.',
        questions: [
          { question: "What is the SI unit of electric charge?", options: ["Ampere", "Coulomb", "Volt", "Ohm"], answer: "Coulomb" },
          { question: "Which of the following is a vector quantity?", options: ["Electric Potential", "Electric Field", "Electric Charge", "Electric Flux"], answer: "Electric Field" },
          { question: "Coulomb's law is most similar to which other fundamental law?", options: ["Newton's Law of Gravitation", "Ohm's Law", "Gauss's Law", "Faraday's Law"], answer: "Newton's Law of Gravitation" },
          { question: "Two particles with opposite charges will...", options: ["attract each other", "repel each other", "not interact", "cancel each other out"], answer: "attract each other" },
          { question: "If you double the distance between two charges, the force between them becomes...", options: ["half", "double", "one-fourth", "four times"], answer: "one-fourth" },
          { question: "Electric field lines point in the direction of the force on a...", options: ["positive test charge", "negative test charge", "magnetic monopole", "neutron"], answer: "positive test charge" },
          { question: "The work done moving a charge in an electrostatic field is independent of...", options: ["the path taken", "the charge magnitude", "the field strength", "the distance moved"], answer: "the path taken" }
        ]
      },
      { 
        id: 'phys-2', 
        title: 'Classical Mechanics', 
        description: 'Explore the fundamental laws of motion and gravity.',
        questions: [
          { question: "What concept is described by Newton's First Law of Motion?", options: ["Action-Reaction", "Gravitation", "Inertia", "Acceleration"], answer: "Inertia" },
          { question: "F=ma is the mathematical representation of which of Newton's laws?", options: ["First", "Second", "Third", "Fourth"], answer: "Second" },
          { question: "The principle that for every action there is an equal and opposite reaction is...", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "The Law of Conservation of Energy"], answer: "Newton's Third Law" },
          { question: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], answer: "Newton" },
          { question: "If the net force on an object is zero, its acceleration must be...", options: ["zero", "constant", "increasing", "decreasing"], answer: "zero" }
        ]
      },
      { 
        id: 'phys-3', 
        title: 'Thermodynamics', 
        description: 'Understand the principles of heat, work, and energy.',
        questions: [
          { question: "The First Law of Thermodynamics is a statement of...", options: ["Conservation of energy", "Increase of entropy", "The impossibility of reaching absolute zero", "Heat flows from hot to cold"], answer: "Conservation of energy" },
          { question: "What is a measure of the disorder or randomness of a system?", options: ["Enthalpy", "Entropy", "Gibbs Free Energy", "Temperature"], answer: "Entropy" },
          { question: "A process that occurs at constant temperature is called?", options: ["Isothermal", "Isobaric", "Isochoric", "Adiabatic"], answer: "Isothermal" },
          { question: "What type of process has no heat exchange with the surroundings?", options: ["Isothermal", "Adiabatic", "Isobaric", "Isochoric"], answer: "Adiabatic" },
          { question: "At what temperature does all classical motion of particles cease?", options: ["0° Celsius", "0 Kelvin", "0° Fahrenheit", "100° Celsius"], answer: "0 Kelvin" }
        ]
      },
    ],
  },
  {
    name: 'Chemistry',
    icon: FlaskConical,
    topics: [
      { 
        id: 'chem-1', 
        title: 'Atomic Structure', 
        description: 'Delve into the composition of atoms.',
        questions: [
          { question: "Which particle in an atom's nucleus has a positive charge?", options: ["Neutron", "Electron", "Proton", "Photon"], answer: "Proton" },
          { question: "The mass number of an atom is the sum of its...", options: ["Protons", "Neutrons", "Protons and Electrons", "Protons and Neutrons"], answer: "Protons and Neutrons" },
          { question: "Isotopes of an element have the same number of ___, but different numbers of ___.", options: ["protons, neutrons", "neutrons, protons", "electrons, protons", "neutrons, electrons"], answer: "protons, neutrons" },
          { question: "Who is credited with discovering the electron?", options: ["Rutherford", "Bohr", "J.J. Thomson", "Dalton"], answer: "J.J. Thomson" },
          { question: "A region in an atom where there is a high probability of finding an electron is called an...", options: ["orbital", "nucleus", "energy level", "electron shell"], answer: "orbital" }
        ]
      },
      { 
        id: 'chem-2', 
        title: 'Chemical Bonding', 
        description: 'Learn how atoms come together to form molecules.',
        questions: [
          { question: "Which type of bond involves the transfer of electrons?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: "Ionic" },
          { question: "Which type of bond involves the sharing of electrons?", options: ["Ionic", "Covalent", "Metallic", "Van der Waals"], answer: "Covalent" },
          { question: "What type of bond is found in a water (H2O) molecule?", options: ["Ionic", "Polar Covalent", "Nonpolar Covalent", "Metallic"], answer: "Polar Covalent" },
          { question: "Which is generally the strongest type of chemical bond?", options: ["Hydrogen bond", "Covalent bond", "Ionic bond", "Van der Waals force"], answer: "Covalent bond" },
          { question: "A 'sea of electrons' is characteristic of which type of bond?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: "Metallic" }
        ]
      },
      { 
        id: 'chem-3', 
        title: 'Stoichiometry', 
        description: 'Master quantitative relationships in chemical reactions.',
        questions: [
          { question: "What is the value of Avogadro's number?", options: ["6.022 x 10^23", "3.14159", "9.8 m/s^2", "1.602 x 10^-19 C"], answer: "6.022 x 10^23" },
          { question: "The coefficients in a balanced chemical equation represent the ratio of...", options: ["masses", "moles", "volumes", "atoms"], answer: "moles" },
          { question: "The reactant that is completely consumed in a reaction is called the...", options: ["excess reactant", "limiting reactant", "catalyst", "product"], answer: "limiting reactant" },
          { question: "What is the molar mass of water (H2O)? (H=1, O=16)", options: ["17 g/mol", "18 g/mol", "33 g/mol", "2 g/mol"], answer: "18 g/mol" },
          { question: "The term stoichiometry is derived from Greek words meaning...", options: ["reaction rate", "heat measurement", "element measure", "electron chemistry"], answer: "element measure" }
        ]
      },
    ],
  },
  {
    name: 'Math',
    icon: Sigma,
    topics: [
      { 
        id: 'math-1', 
        title: 'Calculus', 
        description: 'Grasp the concepts of derivatives and integrals.',
        questions: [
          { question: "The derivative of a function at a point represents the...", options: ["area under the curve", "slope of the tangent line", "maximum value", "average value"], answer: "slope of the tangent line" },
          { question: "What is the derivative of x^2?", options: ["2x", "x^3/3", "x", "2"], answer: "2x" },
          { question: "A definite integral of a function represents the...", options: ["rate of change", "length of the curve", "area under the curve", "slope of the function"], answer: "area under the curve" },
          { question: "Who is one of the principal founders of calculus?", options: ["Pythagoras", "Euclid", "Isaac Newton", "Albert Einstein"], answer: "Isaac Newton" },
          { question: "The chain rule is used to differentiate...", options: ["products of functions", "composite functions", "quotients of functions", "sums of functions"], answer: "composite functions" }
        ]
      },
      { 
        id: 'math-2', 
        title: 'Linear Algebra', 
        description: 'Work with vectors, matrices, and vector spaces.',
        questions: [
          { question: "A matrix with the same number of rows and columns is called a ___ matrix.", options: ["Vector", "Square", "Identity", "Scalar"], answer: "Square" },
          { question: "What is the result of multiplying a matrix by its inverse?", options: ["Zero Matrix", "Identity Matrix", "Scalar Matrix", "Transpose Matrix"], answer: "Identity Matrix" },
          { question: "What defines a vector?", options: ["Magnitude only", "Magnitude and direction", "A single number", "A matrix with one row"], answer: "Magnitude and direction" },
          { question: "The determinant of a 2x2 matrix [[a,b],[c,d]] is...", options: ["ab-cd", "ad-bc", "ac-bd", "a+b+c+d"], answer: "ad-bc" },
          { question: "A set of vectors is linearly independent if...", options: ["all vectors are zero", "all vectors are parallel", "no vector is a linear combination of the others", "all vectors have the same magnitude"], answer: "no vector is a linear combination of the others" }
        ]
      },
      { 
        id: 'math-3', 
        title: 'Probability', 
        desc: 'Understand the mathematical likelihood of events.',
        questions: [
          { question: "What is the probability of getting heads when flipping a fair coin?", options: ["0", "0.25", "0.5", "1"], answer: "0.5" },
          { question: "The probability of any event must be between...", options: ["0 and 1", "-1 and 1", "0 and 100", "1 and infinity"], answer: "0 and 1" },
          { question: "The probability of two mutually exclusive events occurring at the same time is...", options: ["1", "0.5", "0.25", "0"], answer: "0" },
          { question: "What is the probability of rolling a 6 on a standard six-sided die?", options: ["1/6", "1/3", "1/2", "1"], answer: "1/6" },
          { question: "The sum of the probabilities of all possible outcomes in an experiment is always...", options: ["0", "1", "dependent on the experiment", "infinite"], answer: "1" }
        ]
      },
    ],
  },
  {
    name: 'Biology',
    icon: Dna,
    topics: [
      { 
        id: 'bio-1', 
        title: 'The Cell', 
        description: 'Explore the fundamental unit of life, its structure, and functions.',
        questions: [
          { question: "Which organelle is known as the 'powerhouse' of the cell?", options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi Apparatus"], answer: "Mitochondrion" },
          { question: "Where is the genetic material (DNA) primarily located in a eukaryotic cell?", options: ["Cytoplasm", "Ribosome", "Nucleus", "Cell Membrane"], answer: "Nucleus" },
          { question: "Which of these is NOT typically found in an animal cell?", options: ["Cell wall", "Mitochondrion", "Nucleus", "Cell Membrane"], answer: "Cell wall" },
          { question: "What is the primary function of ribosomes?", options: ["Energy production", "Protein synthesis", "Waste disposal", "Lipid synthesis"], answer: "Protein synthesis" },
          { question: "The process of cell division in somatic (body) cells is called...", options: ["mitosis", "meiosis", "osmosis", "photosynthesis"], answer: "mitosis" }
        ]
      },
      { 
        id: 'bio-2', 
        title: 'Genetics', 
        description: 'Learn the principles of heredity and variation.',
        questions: [
          { question: "Who is considered the 'father of modern genetics'?", options: ["Charles Darwin", "Gregor Mendel", "James Watson", "Francis Crick"], answer: "Gregor Mendel" },
          { question: "The four nucleotide bases in DNA are:", options: ["A,U,C,G", "A,T,C,G", "A,B,C,D", "U,T,C,G"], answer: "A,T,C,G" },
          { question: "A different form of a gene is called an...", options: ["allele", "chromosome", "genotype", "phenotype"], answer: "allele" },
          { question: "The structure of a DNA molecule is described as a...", options: ["single helix", "double helix", "sphere", "flat plane"], answer: "double helix" },
          { question: "The observable physical traits of an organism are its...", options: ["genotype", "phenotype", "karyotype", "allele"], answer: "phenotype" }
        ]
      },
      { 
        id: 'bio-3', 
        title: 'Ecology', 
        desc: 'Study the interactions between organisms and their environment.',
        questions: [
          { question: "Which of the following is an example of a producer in an ecosystem?", options: ["Lion", "Mushroom", "Grass", "Human"], answer: "Grass" },
          { question: "The process by which plants use sunlight to create food is called...", options: ["Respiration", "Transpiration", "Photosynthesis", "Decomposition"], answer: "Photosynthesis" },
          { question: "All the living and nonliving things interacting in a specific area is called an...", options: ["ecosystem", "population", "community", "biome"], answer: "ecosystem" },
          { question: "Which of the following is a biotic factor in an ecosystem?", options: ["Sunlight", "Temperature", "Water", "Tree"], answer: "Tree" },
          { question: "A relationship where one organism benefits and the other is harmed is called...", options: ["Mutualism", "Commensalism", "Parasitism", "Competition"], answer: "Parasitism" }
        ]
      },
    ],
  },
  {
    name: 'Coding',
    icon: Code,
    topics: [
      { 
        id: 'code-1', 
        title: 'Data Structures', 
        description: 'Learn about fundamental structures like arrays, lists, stacks, and queues.',
        questions: [
          { question: "Which data structure operates on a First-In, First-Out (FIFO) basis?", options: ["Stack", "Queue", "Tree", "Array"], answer: "Queue" },
          { question: "Which data structure operates on a Last-In, First-Out (LIFO) basis?", options: ["Queue", "Linked List", "Stack", "Graph"], answer: "Stack" },
          { question: "What is the time complexity for accessing an element in an array by its index?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: "O(1)" },
          { question: "In a singly linked list, each node contains a value and a pointer to the...", options: ["previous node", "head of the list", "next node", "tail of the list"], answer: "next node" },
          { question: "Which of these is generally not considered a linear data structure?", options: ["Array", "Stack", "Tree", "Queue"], answer: "Tree" }
        ]
      },
      { 
        id: 'code-2', 
        title: 'Algorithms', 
        description: 'Learn fundamental sorting, searching, and graph algorithms.',
        questions: [
          { question: "Which sorting algorithm has a worst-case time complexity of O(n^2)?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"], answer: "Bubble Sort" },
          { question: "What is the most efficient algorithm for searching a sorted array?", options: ["Linear Search", "Binary Search", "Depth-First Search", "Breadth-First Search"], answer: "Binary Search" },
          { question: "An algorithm is best described as a...", options: ["programming language", "data structure", "step-by-step procedure for solving a problem", "piece of computer hardware"], answer: "step-by-step procedure for solving a problem" },
          { question: "Which algorithm is used to find the shortest path in a weighted graph?", options: ["Dijkstra's Algorithm", "Breadth-First Search", "Depth-First Search", "Kruskal's Algorithm"], answer: "Dijkstra's Algorithm" },
          { question: "The 'divide and conquer' strategy is famously used by which sorting algorithm?", options: ["Insertion Sort", "Bubble Sort", "Selection Sort", "Merge Sort"], answer: "Merge Sort" }
        ]
      },
      { 
        id: 'code-3', 
        title: 'Web Dev Basics', 
        desc: 'Get started with the building blocks of the web: HTML, CSS, and JavaScript.',
        questions: [
          { question: "What does HTML stand for?", options: ["Hyper Tool Markup Language", "Hyperlinks and Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language"], answer: "HyperText Markup Language" },
          { question: "What is CSS primarily used for?", options: ["Structuring content", "Styling web pages", "Handling user interaction", "Database management"], answer: "Styling web pages" },
          { question: "Which HTML tag is used to link an external JavaScript file?", options: ["<js>", "<script>", "<javascript>", "<link>"], answer: "<script>" },
          { question: "Which CSS selector targets an element with the id 'header'?", options: [".header", "#header", "header", "*header"], answer: "#header" },
          { question: "Which of these languages is dynamically typed?", options: ["Java", "C++", "TypeScript", "JavaScript"], answer: "JavaScript" }
        ]
      },
    ],
  },
];

export const MAX_HEARTS = 5;
export const HEART_REGEN_RATE = 5 * 60 * 1000; // 5 minutes

export const STORE_ITEMS = {
  HEART_REFILL: {
    name: 'Heart Refill',
    description: 'Instantly restore all your hearts to full.',
    price: 100,
  },
  STREAK_FREEZE: {
    name: 'Streak Freeze',
    description: 'Protect your daily streak for one missed day.',
    price: 200,
  },
};

export const COINS_PER_QUIZ = 200;
