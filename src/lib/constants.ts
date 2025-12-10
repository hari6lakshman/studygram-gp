import type { Subject } from './types';
import { Atom, FlaskConical, Sigma, Dna, Code } from 'lucide-react';

export const SUBJECTS: Subject[] = [
  {
    name: 'Physics',
    icon: Atom,
    topics: [
      { 
        id: 'physics-1', 
        title: 'Basic Electrostatics', 
        description: 'Understand the fundamental principles of electric charges and fields.',
        questions: [
          { question: "What is the unit of electric charge?", options: ["Ampere", "Coulomb", "Volt", "Ohm"], correctAnswer: "Coulomb" },
          { question: "Which of the following is a vector quantity?", options: ["Electric Potential", "Electric Field", "Electric Charge", "Electric Flux"], correctAnswer: "Electric Field" },
          { question: "Coulomb's law is similar to which other law in physics?", options: ["Newton's Law of Gravitation", "Ohm's Law", "Gauss's Law", "Faraday's Law"], correctAnswer: "Newton's Law of Gravitation" },
          { question: "A positive charge and a negative charge will...", options: ["attract each other", "repel each other", "not interact", "cancel each other out"], correctAnswer: "attract each other" },
          { question: "What happens to the force between two charges if the distance between them is doubled?", options: ["It is halved", "It is doubled", "It is quartered", "It is quadrupled"], correctAnswer: "It is quartered" },
          { question: "Electric field lines point in the direction of the force on a...", options: ["positive test charge", "negative test charge", "magnetic monopole", "neutron"], correctAnswer: "positive test charge" },
          { question: "The work done in moving a charge from one point to another in an electrostatic field is independent of...", options: ["the path taken", "the charge", "the field strength", "the distance"], correctAnswer: "the path taken" }
        ]
      },
      { 
        id: 'physics-2', 
        title: 'Newtonian Mechanics', 
        description: 'Explore the laws of motion and gravitation.',
        questions: [
          { question: "What is Newton's First Law of Motion often called?", options: ["Law of Action-Reaction", "Law of Universal Gravitation", "Law of Inertia", "Law of Acceleration"], correctAnswer: "Law of Inertia" },
          { question: "The equation F=ma relates to which of Newton's laws?", options: ["First Law", "Second Law", "Third Law", "Fourth Law"], correctAnswer: "Second Law" },
          { question: "For every action, there is an equal and opposite reaction. This is...", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "The Law of Conservation of Energy"], correctAnswer: "Newton's Third Law" },
          { question: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: "Newton" },
          { question: "If the net force on an object is zero, its acceleration must be...", options: ["zero", "constant but not zero", "increasing", "decreasing"], correctAnswer: "zero" }
        ]
      },
      { 
        id: 'physics-3', 
        title: 'Thermodynamics', 
        description: 'Learn about heat, work, and energy.',
        questions: [
          { question: "What does the First Law of Thermodynamics state?", options: ["Energy cannot be created or destroyed", "The entropy of the universe is always increasing", "Absolute zero is unattainable", "Heat flows from hot to cold"], correctAnswer: "Energy cannot be created or destroyed" },
          { question: "What is the measure of disorder in a system called?", options: ["Enthalpy", "Entropy", "Gibbs Free Energy", "Temperature"], correctAnswer: "Entropy" },
          { question: "Which process occurs at a constant temperature?", options: ["Isothermal", "Isobaric", "Isochoric", "Adiabatic"], correctAnswer: "Isothermal" },
          { question: "In which process is there no heat exchange with the surroundings?", options: ["Isothermal", "Adiabatic", "Isobaric", "Isochoric"], correctAnswer: "Adiabatic" },
          { question: "What is the theoretical temperature at which all molecular motion ceases?", options: ["0° Celsius", "0 Kelvin", "0° Fahrenheit", "100° Celsius"], correctAnswer: "0 Kelvin" }
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
          { question: "Which particle is found in the nucleus and has a positive charge?", options: ["Neutron", "Electron", "Proton", "Photon"], correctAnswer: "Proton" },
          { question: "What is the mass number of an atom?", options: ["Number of protons", "Number of neutrons", "Number of protons and electrons", "Number of protons and neutrons"], correctAnswer: "Number of protons and neutrons" },
          { question: "Isotopes of an element have the same number of _____ but different numbers of ____.", options: ["protons, neutrons", "neutrons, protons", "electrons, protons", "neutrons, electrons"], correctAnswer: "protons, neutrons" },
          { question: "Who is credited with discovering the electron?", options: ["Ernest Rutherford", "Niels Bohr", "J.J. Thomson", "John Dalton"], correctAnswer: "J.J. Thomson" },
          { question: "The region of space where an electron is most likely to be found is called an...", options: ["orbital", "nucleus", "energy level", "shell"], correctAnswer: "orbital" }
        ]
      },
      { 
        id: 'chem-2', 
        title: 'Chemical Bonds', 
        description: 'Learn how atoms form molecules.',
        questions: [
          { question: "Which type of bond involves the transfer of electrons?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correctAnswer: "Ionic" },
          { question: "Which type of bond involves the sharing of electrons?", options: ["Ionic", "Covalent", "Metallic", "Van der Waals"], correctAnswer: "Covalent" },
          { question: "What type of bond holds together the atoms in a water molecule (H2O)?", options: ["Ionic", "Polar Covalent", "Nonpolar Covalent", "Metallic"], correctAnswer: "Polar Covalent" },
          { question: "Which of the following is the strongest type of bond?", options: ["Hydrogen bond", "Covalent bond", "Ionic bond", "Van der Waals forces"], correctAnswer: "Covalent bond" },
          { question: "A 'sea of electrons' is characteristic of which type of bond?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correctAnswer: "Metallic" }
        ]
      },
      { 
        id: 'chem-3', 
        title: 'Stoichiometry', 
        description: 'Master the quantitative relationships in chemical reactions.',
        questions: [
          { question: "What is Avogadro's number?", options: ["6.022 x 10^23", "3.14159", "9.8 m/s^2", "1.602 x 10^-19"], correctAnswer: "6.022 x 10^23" },
          { question: "In a balanced chemical equation, the coefficients represent the ratio of...", options: ["masses", "moles", "volumes", "atoms"], correctAnswer: "moles" },
          { question: "The reactant that is completely consumed in a chemical reaction is called the...", options: ["excess reactant", "limiting reactant", "catalyst", "product"], correctAnswer: "limiting reactant" },
          { question: "What is the molar mass of H2O? (Atomic masses: H=1, O=16)", options: ["17 g/mol", "18 g/mol", "33 g/mol", "2 g/mol"], correctAnswer: "18 g/mol" },
          { question: "What does the term 'stoichiometry' refer to?", options: ["The study of reaction rates", "The study of heat changes in reactions", "The quantitative relationship between reactants and products", "The study of electrochemical cells"], correctAnswer: "The quantitative relationship between reactants and products" }
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
          { question: "The derivative of a function at a point represents the...", options: ["area under the curve", "slope of the tangent line", "maximum value", "average value"], correctAnswer: "slope of the tangent line" },
          { question: "What is the derivative of x^2?", options: ["2x", "x^3/3", "x", "2"], correctAnswer: "2x" },
          { question: "What does the definite integral of a function represent?", options: ["The rate of change", "The length of the curve", "The area under the curve", "The slope of the curve"], correctAnswer: "The area under the curve" },
          { question: "Who is one of the principal founders of calculus?", options: ["Pythagoras", "Euclid", "Isaac Newton", "Albert Einstein"], correctAnswer: "Isaac Newton" },
          { question: "The 'chain rule' is used for...", options: ["finding the integral of a product", "differentiating composite functions", "finding the limit of a function", "solving differential equations"], correctAnswer: "differentiating composite functions" }
        ]
      },
      { 
        id: 'math-2', 
        title: 'Linear Algebra', 
        description: 'Work with vectors, matrices, and linear transformations.',
        questions: [
          { question: "What is a matrix with the same number of rows and columns called?", options: ["Vector", "Square matrix", "Identity matrix", "Scalar"], correctAnswer: "Square matrix" },
          { question: "What is the result of multiplying a matrix by its inverse?", options: ["The zero matrix", "The identity matrix", "A scalar", "The transpose of the matrix"], correctAnswer: "The identity matrix" },
          { question: "What is a vector?", options: ["A quantity with only magnitude", "A quantity with magnitude and direction", "A single number", "A matrix with one row"], correctAnswer: "A quantity with magnitude and direction" },
          { question: "The determinant of a 2x2 matrix [[a, b], [c, d]] is...", options: ["ab - cd", "ad - bc", "ac - bd", "a+b+c+d"], correctAnswer: "ad - bc" },
          { question: "A set of vectors is linearly independent if...", options: ["they are all zero vectors", "they are parallel to each other", "no vector in the set can be written as a linear combination of the others", "they all have the same magnitude"], correctAnswer: "no vector in the set can be written as a linear combination of the others" }
        ]
      },
      { 
        id: 'math-3', 
        title: 'Probability', 
        description: 'Understand the likelihood of events.',
        questions: [
          { question: "What is the probability of flipping a fair coin and getting heads?", options: ["0", "0.25", "0.5", "1"], correctAnswer: "0.5" },
          { question: "The probability of an event is always a number between...", options: ["0 and 1", "-1 and 1", "0 and 100", "1 and infinity"], correctAnswer: "0 and 1" },
          { question: "If two events are mutually exclusive, what is the probability that both occur?", options: ["1", "0.5", "0.25", "0"], correctAnswer: "0" },
          { question: "What is the probability of rolling a 6 on a standard six-sided die?", options: ["1/6", "1/3", "1/2", "1"], correctAnswer: "1/6" },
          { question: "The sum of the probabilities of all possible outcomes of an experiment is...", options: ["0", "1", "dependent on the experiment", "infinity"], correctAnswer: "1" }
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
        title: 'Cell Biology', 
        description: 'Explore the structure and function of cells.',
        questions: [
          { question: "Which organelle is known as the 'powerhouse' of the cell?", options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"], correctAnswer: "Mitochondrion" },
          { question: "Where is the genetic material (DNA) found in a eukaryotic cell?", options: ["Cytoplasm", "Ribosome", "Nucleus", "Cell membrane"], correctAnswer: "Nucleus" },
          { question: "Which of the following is NOT found in an animal cell?", options: ["Cell wall", "Mitochondrion", "Nucleus", "Cell membrane"], correctAnswer: "Cell wall" },
          { question: "What is the function of ribosomes?", options: ["Energy production", "Protein synthesis", "Waste disposal", "Lipid synthesis"], correctAnswer: "Protein synthesis" },
          { question: "The process of a cell dividing into two daughter cells is called...", options: ["mitosis", "meiosis", "osmosis", "photosynthesis"], correctAnswer: "mitosis" }
        ]
      },
      { 
        id: 'bio-2', 
        title: 'Genetics', 
        description: 'Learn about heredity and variation of inherited characteristics.',
        questions: [
          { question: "Who is considered the 'father of modern genetics'?", options: ["Charles Darwin", "Gregor Mendel", "James Watson", "Francis Crick"], correctAnswer: "Gregor Mendel" },
          { question: "What are the four nucleotide bases in DNA?", options: ["A, U, C, G", "A, T, C, G", "A, B, C, D", "U, T, C, G"], correctAnswer: "A, T, C, G" },
          { question: "A different form of a gene is called an...", options: ["allele", "chromosome", "genotype", "phenotype"], correctAnswer: "allele" },
          { question: "What is the shape of a DNA molecule?", options: ["Single helix", "Double helix", "Sphere", "Flat plane"], correctAnswer: "Double helix" },
          { question: "The observable traits of an organism are its...", options: ["genotype", "phenotype", "karyotype", "allele"], correctAnswer: "phenotype" }
        ]
      },
      { 
        id: 'bio-3', 
        title: 'Ecology', 
        description: 'Study the interactions among organisms and their environment.',
        questions: [
          { question: "Which of the following is an example of a producer in an ecosystem?", options: ["Lion", "Mushroom", "Grass", "Human"], correctAnswer: "Grass" },
          { question: "The process by which plants use sunlight to create food is called...", options: ["Respiration", "Transpiration", "Photosynthesis", "Decomposition"], correctAnswer: "Photosynthesis" },
          { question: "All the interacting living and nonliving things in a particular area make up an...", options: ["ecosystem", "population", "community", "biome"], correctAnswer: "ecosystem" },
          { question: "Which of the following is a biotic factor?", options: ["Sunlight", "Temperature", "Water", "A tree"], correctAnswer: "A tree" },
          { question: "A relationship between two species where one benefits and the other is harmed is called...", options: ["Mutualism", "Commensalism", "Parasitism", "Competition"], correctAnswer: "Parasitism" }
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
        description: 'Understand arrays, linked lists, stacks, and queues.',
        questions: [
          { question: "Which data structure follows the First-In, First-Out (FIFO) principle?", options: ["Stack", "Queue", "Tree", "Array"], correctAnswer: "Queue" },
          { question: "Which data structure follows the Last-In, First-Out (LIFO) principle?", options: ["Queue", "Linked List", "Stack", "Graph"], correctAnswer: "Stack" },
          { question: "What is the time complexity for accessing an element in an array by its index?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctAnswer: "O(1)" },
          { question: "In a singly linked list, each node contains data and a pointer to...", options: ["the previous node", "the head of the list", "the next node", "the tail of the list"], correctAnswer: "the next node" },
          { question: "Which of these is NOT a linear data structure?", options: ["Array", "Stack", "Tree", "Queue"], correctAnswer: "Tree" }
        ]
      },
      { 
        id: 'code-2', 
        title: 'Algorithms', 
        description: 'Learn sorting, searching, and graph algorithms.',
        questions: [
          { question: "Which sorting algorithm has a worst-case time complexity of O(n^2)?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Heap Sort"], correctAnswer: "Bubble Sort" },
          { question: "For a sorted array, which search algorithm is most efficient?", options: ["Linear Search", "Binary Search", "Depth-First Search", "Breadth-First Search"], correctAnswer: "Binary Search" },
          { question: "An algorithm is a...", options: ["programming language", "data structure", "step-by-step procedure for calculations", "type of computer hardware"], correctAnswer: "step-by-step procedure for calculations" },
          { question: "Which algorithm is used to find the shortest path in a weighted graph?", options: ["Dijkstra's Algorithm", "Breadth-First Search", "Depth-First Search", "Kruskal's Algorithm"], correctAnswer: "Dijkstra's Algorithm" },
          { question: "'Divide and conquer' is a strategy used by which sorting algorithm?", options: ["Insertion Sort", "Bubble Sort", "Selection Sort", "Merge Sort"], correctAnswer: "Merge Sort" }
        ]
      },
      { 
        id: 'code-3', 
        title: 'Web Development Basics', 
        description: 'Get started with HTML, CSS, and JavaScript.',
        questions: [
          { question: "What does HTML stand for?", options: ["Hyper Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language"], correctAnswer: "Hyper Text Markup Language" },
          { question: "What is CSS used for?", options: ["To structure a web page", "To style a web page", "To add interactivity to a web page", "To manage databases"], correctAnswer: "To style a web page" },
          { question: "Which tag is used to link a JavaScript file to an HTML document?", options: ["<js>", "<script>", "<javascript>", "<link>"], correctAnswer: "<script>" },
          { question: "In CSS, how would you select an element with the id 'header'?", options: [".header", "#header", "header", "*header"], correctAnswer: "#header" },
          { question: "Which of the following is a dynamically typed language?", options: ["Java", "C++", "TypeScript", "JavaScript"], correctAnswer: "JavaScript" }
        ]
      },
    ],
  },
];

export const MAX_HEARTS = 5;
export const HEART_REGEN_RATE = 6 * 60 * 1000; // 6 minutes in milliseconds

export const STORE_ITEMS = {
  LIFE_REFILL: {
    name: 'Life Refill',
    description: 'Restore your hearts to full.',
    price: 100,
  },
  STREAK_FREEZE: {
    name: 'Streak Freeze',
    description: 'Protect your daily streak for one day of inactivity.',
    price: 200,
  },
};

export const COINS_PER_QUIZ = 200;
