export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Academics', href: '#academics' },
  { label: 'People', href: '#people' },
  { label: 'Admissions', href: '#admissions' },
  { label: 'News', href: '#news' },
] as const

export interface Program {
  id: string
  number: string
  name: string
  tag: string
  shortDesc: string
  description: string
  image: string
  curriculum: string[]
  examSubjects: string[]
  careerOutcomes: string[]
  labFacilities: string
  weeklyHours: number
}

export interface FacultyMember {
  id: string
  name: string
  role: string
  department: string
  degree: string
  img: string
  bio: string
  experienceYears: number
  achievements: string[]
}

export interface NewsArticle {
  id: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  content: string
  image: string
  author: string
}

export interface Achievement {
  id: string
  year: string
  title: string
  category: 'Olympiad' | 'University Grants' | 'Language Certification' | 'Research'
  description: string
  metric: string
  metricLabel: string
}

export interface FAQItem {
  id: string
  category: 'Admissions' | 'Academics' | 'Dormitory & Campus' | 'Exams'
  question: string
  answer: string
}

export const lyceumStats = [
  { value: '98.4%', label: 'University Admission Rate', subtext: 'Graduates accepted into top national & international universities' },
  { value: '1,250+', label: 'Enrolled Students', subtext: 'Selected through rigorous statewide competitive entrance exams' },
  { value: '64+', label: 'Olympiad Medals (2024-2026)', subtext: 'Gold, Silver & Bronze medals in Mathematics, Physics & Chemistry' },
  { value: '1:12', label: 'Faculty to Student Ratio', subtext: 'Individualized academic mentoring & research supervision' },
]

export const academicPrograms: Program[] = [
  { 
    id: 'exact-sciences',
    number: '01', 
    name: 'Exact & Computer Sciences', 
    tag: 'Mathematics · Physics · Informatics',
    shortDesc: 'Mathematics, theoretical physics, algorithm design, and software engineering for future engineers and tech leaders.',
    description: 'The Exact Sciences track provides an intensive university-preparatory curriculum focused on advanced calculus, linear algebra, Olympiad physics, algorithm design, and modern computer science principles. Students undergo specialized training for entrance examinations to top technical universities in Uzbekistan and internationally.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=85',
    curriculum: [
      'Advanced Mathematics & Calculus',
      'Theoretical & Olympiad Physics',
      'Algorithmic Problem Solving & C++/Python',
      'Discrete Mathematics & Mathematical Logic',
      'Analytical Geometry & Spatial Reasoning'
    ],
    examSubjects: ['Mathematics (Written & Logic)', 'Physics / Informatics', 'Native Language'],
    careerOutcomes: ['Software Engineering & AI', 'Mechanical & Electrical Engineering', 'Data Science & Applied Mathematics', 'Cybersecurity & Robotics'],
    labFacilities: 'High-performance Intel i7 computer workstation lab with GPU acceleration and STEM Physics experiment kits.',
    weeklyHours: 36
  },
  { 
    id: 'natural-sciences',
    number: '02', 
    name: 'Natural & Biomedical Sciences', 
    tag: 'Biology · Organic Chemistry · Pre-Med',
    shortDesc: 'A rigorous laboratory-based program for biology, chemistry, and pre-medical studies led by university professors.',
    description: 'Designed for aspiring medical doctors, bioengineers, chemists, and environmental scientists. The curriculum combines deep theoretical foundations in organic chemistry, molecular genetics, and human anatomy with weekly hands-on experiments in our modern wet laboratories.',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=85',
    curriculum: [
      'General & Organic Chemistry',
      'Cell Biology & Molecular Genetics',
      'Human Physiology & Anatomy',
      'Biochemistry & Chemical Thermodynamics',
      'Laboratory Analytical Chemistry'
    ],
    examSubjects: ['Biology (Theoretical & Applied)', 'Chemistry', 'Native Language'],
    careerOutcomes: ['General Medicine & Surgery', 'Pharmacy & Biotechnology', 'Chemical Engineering', 'Genetics & Medical Research'],
    labFacilities: 'Advanced Chemical Synthesis & Spectrophotometry wet lab equipped with digital microscopes and safety ventilation.',
    weeklyHours: 36
  },
  { 
    id: 'languages-humanities',
    number: '03', 
    name: 'Foreign Philology & Humanities', 
    tag: 'English (IELTS/CEFR) · German · World Literature',
    shortDesc: 'Mastery of foreign languages, international relations, native linguistics, and critical historical analysis.',
    description: 'Cultivates bilingual fluency, critical literary analysis, debate skills, and deep comprehension of regional and world history. Students prepare for CEFR C1/IELTS 7.5+ certifications while developing analytical writing skills necessary for law, journalism, and international relations.',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=85',
    curriculum: [
      'Advanced English Philology (IELTS 7.5+ Track)',
      'Second Foreign Language (German / French)',
      'World & National History',
      'Linguistics & Comparative Grammar',
      'Critical Writing & Academic Debate'
    ],
    examSubjects: ['Foreign Language (English/German)', 'History / Native Language', 'Logic & Comprehension'],
    careerOutcomes: ['International Law & Diplomacy', 'Translation & Applied Linguistics', 'Journalism & Public Relations', 'Global Business & Trade'],
    labFacilities: 'Multimedia Language Resource Laboratory with interactive audio booths and digital library access.',
    weeklyHours: 34
  },
]

export const facultyMembers: FacultyMember[] = [
  { 
    id: 'toshmatov',
    name: 'Dr. Alisher Toshmatov', 
    role: 'Director of the Academic Lyceum', 
    department: 'Directorate & Physics Department',
    degree: 'Ph.D. in Physical-Mathematical Sciences',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=85', 
    bio: 'Over 25 years of academic leadership in Uzbekistan higher education. Author of 40+ scientific papers in quantum physics and secondary STEM education reform.',
    experienceYears: 26,
    achievements: ['National Excellence in Education Award', 'Author of 3 Physics Textbooks for Lyceums', 'Fulbright Visiting Scholar']
  },
  { 
    id: 'umarova',
    name: 'Prof. Nigora Umarova', 
    role: 'Head of Natural Sciences Department', 
    department: 'Chemistry & Biochemistry Department',
    degree: 'Doctor of Science (D.Sc.) in Organic Chemistry',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=85', 
    bio: 'Renowned researcher in natural compound synthesis. Has mentored over 30 National Chemistry Olympiad medalists over the past decade.',
    experienceYears: 22,
    achievements: ['Gold Mentor Award - National Science Fair', '20+ Peer-Reviewed Journal Publications', 'Curriculum Director for Chemistry']
  },
  { 
    id: 'rakhimov',
    name: 'Shavkat Rakhimov', 
    role: 'Senior Instructor of Advanced Mathematics', 
    department: 'Exact Sciences Department',
    degree: 'M.Sc. in Pure Mathematics (Tashkent State University)',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85', 
    bio: 'Lead coach for the ALASU Olympiad Math Team. Specialist in contest problem solving, number theory, and mathematical induction.',
    experienceYears: 15,
    achievements: ['Coach of 14 International Math Competition Medalists', 'Best STEM Educator of Andijan Region (2025)']
  },
  { 
    id: 'khakimova',
    name: 'Dilnoza Khakimova', 
    role: 'Head of Foreign Languages Department', 
    department: 'English & Foreign Philology',
    degree: 'M.A. in TESOL & Applied Linguistics',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=85', 
    bio: 'Certified IELTS Examiner and master trainer. Manages the IELTS 7.5+ accelerated language track for lyceum seniors.',
    experienceYears: 14,
    achievements: ['Cambridge CELTA & DELTA Certified', '94% Senior Class IELTS Pass Rate above 7.0', 'Coordinator for British Council Partnerships']
  }
]

export const newsArticles: NewsArticle[] = [
  {
    id: 'math-olympiad-victory-2026',
    title: 'ALASU Students Secure 12 Medals at the Republican Mathematics & Physics Olympiad',
    category: 'Olympiad Victory',
    date: 'February 12, 2026',
    readTime: '4 min read',
    excerpt: 'ALASU students demonstrated unmatched problem-solving speed, earning 5 Gold, 4 Silver, and 3 Bronze medals at the national competition in Tashkent.',
    content: 'Students from the Academic Lyceum of Andijan State University achieved outstanding results at the 2026 Republican Science Olympiad held in Tashkent. Competing against top lyceums from across Uzbekistan, our Exact Sciences team earned 5 Gold, 4 Silver, and 3 Bronze medals in Mathematics and Physics. The lyceum director, Dr. Alisher Toshmatov, praised the dedicated coaching of faculty mentors and the rigorous problem-solving culture cultivated at ALASU.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85',
    author: 'Lyceum Press Service'
  },
  {
    id: 'biotech-lab-opening',
    title: 'Inauguration of the New High-Tech Molecular Biology & Biochemistry Laboratory',
    category: 'Campus Infrastructure',
    date: 'January 28, 2026',
    readTime: '3 min read',
    excerpt: 'Equipped with digital PCR thermal cyclers and spectrophotometers, the new facility enables university-grade biological research for lyceum seniors.',
    content: 'In collaboration with Andijan State University, ALASU officially opened its modernized Molecular Biology & Biochemistry Laboratory. The facility provides lyceum students pursuing the Natural Sciences track with hands-on experience using research-grade PCR thermal cyclers, digital microscopes, and spectrophotometric equipment.',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=85',
    author: 'Academic Registrar Office'
  },
  {
    id: 'university-admission-fair-2026',
    title: 'ALASU Hosts Annual International University Admission & Scholarship Fair',
    category: 'Admissions & Careers',
    date: 'January 15, 2026',
    readTime: '5 min read',
    excerpt: 'Representatives from over 25 premier national and foreign universities presented scholarship opportunities to graduating seniors.',
    content: 'Over 500 lyceum seniors and parents attended the 2026 ALASU University Admission Fair. Representatives from leading Uzbekistan universities, as well as partner institutions from Germany, South Korea, Turkey, and China, presented degree pathways, full state scholarships, and direct admission criteria.',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=85',
    author: 'Career Guidance Office'
  },
]

export const achievementsList: Achievement[] = [
  {
    id: 'ach-1',
    year: '2025-2026',
    title: '100% State Grant Admission for Natural Sciences Seniors',
    category: 'University Grants',
    description: 'Every single graduating senior in the Natural Sciences program secured full state scholarship placements at medical universities.',
    metric: '100%',
    metricLabel: 'State Grant Rate'
  },
  {
    id: 'ach-2',
    year: '2025',
    title: 'International Mathematics Olympiad (IMO) Selection',
    category: 'Olympiad',
    description: 'Two ALASU students were selected to represent the National Team of Uzbekistan at the International Mathematical Olympiad.',
    metric: '2 Finalists',
    metricLabel: 'National Team Representatives'
  },
  {
    id: 'ach-3',
    year: '2025-2026',
    title: 'High IELTS & CEFR Language Certification Standard',
    category: 'Language Certification',
    description: 'Over 88% of graduating seniors achieved IELTS scores of 7.0+ or national CEFR C1 language qualifications.',
    metric: '88%+',
    metricLabel: 'C1 / IELTS 7.0+ Achievers'
  }
]

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'How are applications submitted for admission to ALASU?',
    answer: 'Official applications to academic lyceums across Uzbekistan are submitted exclusively online through the state portal my.edu.uz during the official admissions window (typically June - July). Applicants choose ALASU and select their preferred specialization track.'
  },
  {
    id: 'faq-2',
    category: 'Exams',
    question: 'What subjects are tested in the entrance examinations?',
    answer: 'The Ministry of Higher Education conducts standardized testing. The Exact Sciences track tests Mathematics and Physics/Informatics. The Natural Sciences track tests Biology and Chemistry. Foreign Philology tests English/German and History. All tracks include a section on native language and analytical reasoning.'
  },
  {
    id: 'faq-3',
    category: 'Academics',
    question: 'Is tuition free at the Academic Lyceum of Andijan State University?',
    answer: 'Yes! ALASU is a state-funded public educational institution. All accepted students study on full state scholarships without tuition fees.'
  },
  {
    id: 'faq-4',
    category: 'Dormitory & Campus',
    question: 'Does ALASU provide dormitory accommodation for out-of-district students?',
    answer: 'Yes, ALASU operates a comfortable, modern student dormitory building located adjacent to the main campus for admitted students coming from outside Andijan city.'
  },
  {
    id: 'faq-5',
    category: 'Academics',
    question: 'What diploma is awarded upon graduation?',
    answer: 'Graduates receive the State Diploma of Secondary Specialized Education from the Academic Lyceum of Andijan State University, granting full eligibility for university entrance in Uzbekistan and worldwide.'
  }
]
