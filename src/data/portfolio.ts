const dashtoonLogo    = '/images/dashtoonLogo.png'
const teknofeetLogo   = '/images/teknofeetLogo.jpeg'
const addverbLogo     = '/images/addverbLogo.jpg'
const bitsLogo        = '/images/bitsLogo.png'
const truefoundryLogo = '/images/truefoundryLogo.ico'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SoftwareSkill {
  skillName: string
  fontAwesomeClassname?: string
  svg?: 'kotlin' | 'sql' | 'flutter' | 'cosmos' | 'kubernetes' | 'cursor' | 'claude'
}

export interface TechStackEntry {
  Stack: string
  progressPercentage: number
}

export interface School {
  schoolName: string
  logo: string
  subHeader: string
  duration: string
}

export interface WorkExperienceEntry {
  role: string
  company: string
  companylogo: string
  date: string
  descBullets: string[]
  brandColor: string
  isCurrent?: boolean
}

// ─── Greeting ─────────────────────────────────────────────────────────────────

export const greeting = {
  username: 'Hrithik Adhikari',
  title: 'Senior SWE · Builder',
  subTitle:
    'I engineer systems that scale and products that stick. Grew a B2C from zero to 1M+ daily active users. Was a founding engineer at a startup. Now at TrueFoundry — building AI infrastructure that some of the world\'s top Fortune 500 enterprises run on. 🚀',
  resumeLink:
    'https://drive.google.com/file/d/1uHpB6B15G6GfKej3UrfI9ZvDUY-ripc6/view?usp=sharing',
  resumeDownloadName: 'Hrithik_SDE_2024.pdf',
}

// ─── Social ───────────────────────────────────────────────────────────────────

export const socialMediaLinks = {
  github: 'https://github.com/LordGameleo',
  linkedin: 'https://www.linkedin.com/in/hrithikad/',
  gmail: 'adhikarihrithik@gmail.com',
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skillsSection = {
  title: 'Tools I use to create magic',
  softwareSkills: [
    { skillName: 'Cursor', svg: 'cursor' as const },
    { skillName: 'Claude', svg: 'claude' as const },
    { skillName: 'Java', fontAwesomeClassname: 'fab fa-java' },
    { skillName: 'Kotlin', svg: 'kotlin' as const },
    { skillName: 'Python', fontAwesomeClassname: 'fab fa-python' },
    { skillName: 'SQL', svg: 'sql' as const },
    { skillName: 'CosmosDB', svg: 'cosmos' as const },
    { skillName: 'Firebase', fontAwesomeClassname: 'fas fa-fire' },
    { skillName: 'Flutter', svg: 'flutter' as const },
    { skillName: 'ReactJs', fontAwesomeClassname: 'fab fa-react' },
    { skillName: 'Angular', fontAwesomeClassname: 'fab fa-angular' },
    { skillName: 'Kubernetes', svg: 'kubernetes' as const },
    { skillName: 'Docker', fontAwesomeClassname: 'fab fa-docker' },
    { skillName: 'HTML5', fontAwesomeClassname: 'fab fa-html5' },
    { skillName: 'CSS3', fontAwesomeClassname: 'fab fa-css3-alt' },
    { skillName: 'SASS', fontAwesomeClassname: 'fab fa-sass' },
    { skillName: 'NodeJs', fontAwesomeClassname: 'fab fa-node' },
    { skillName: 'npm', fontAwesomeClassname: 'fab fa-npm' },
  ] satisfies SoftwareSkill[],
}

// ─── Tech Stack Proficiency ───────────────────────────────────────────────────

export const techStack: TechStackEntry[] = [
  { Stack: 'Backend Development', progressPercentage: 90 },
  { Stack: 'Mobile App Development', progressPercentage: 80 },
  { Stack: 'Webapp Development', progressPercentage: 80 },
  { Stack: 'DevOps', progressPercentage: 70 },
]

// ─── Education ────────────────────────────────────────────────────────────────

export const educationInfo: School[] = [
  {
    schoolName: 'Birla Institute of Technology and Science, Pilani',
    logo: bitsLogo,
    subHeader: 'Master of Science in Physics',
    duration: 'August 2016 – May 2021',
  },
  {
    schoolName: 'Birla Institute of Technology and Science, Pilani',
    logo: bitsLogo,
    subHeader: 'Bachelor of Engineering in Mechanical Engineering',
    duration: 'August 2016 – May 2021',
  },
]

// ─── Work Experience ──────────────────────────────────────────────────────────

export const workExperiences: WorkExperienceEntry[] = [
  {
    role: 'Senior Software Engineer',
    company: 'TrueFoundry',
    companylogo: truefoundryLogo,
    date: '2024 – Present',
    brandColor: '#5305E2',
    isCurrent: true,
    descBullets: [
      'Building the infrastructure that makes AI deployable — helping teams ship, scale, and govern production ML systems without the operational overhead.',
    ],
  },
  {
    role: 'Product Engineer',
    company: 'Dashtoon',
    companylogo: dashtoonLogo,
    date: 'June 2023 – 2024',
    brandColor: '#f97316',
    descBullets: [
      "Architected and scaled Dashtoon's consumer app end-to-end, growing it from zero to 1M+ daily active users",
      'Led a seamless, zero-downtime migration of a massive database to Cosmos DB, ensuring data consistency',
      'Optimized data access and availability across regions with Cosmos DB, significantly reducing latency',
      'Architected a robust notification system, boosting user retention through timely and targeted notifications',
      'Enhanced Flutter app performance, delivering a smoother user experience and reducing crashes and ANRs',
      'Significantly reduced CDN costs and improved cache efficiency through image transformation optimization',
      'Established a robust CI/CD pipeline, accelerating build times and improving deployment reliability',
      'Engineered a successful referral program, driving significant organic traffic growth',
      'Implemented a flexible A/B testing framework, enabling data-driven decision-making',
      'Developed an automated testing framework, reducing manual testing efforts and improving test coverage',
      'Architected a highly engaging and modular Reader Screen, facilitating seamless integration of add-on features',
    ],
  },
  {
    role: 'Founding Engineer',
    company: 'Teknofeet',
    companylogo: teknofeetLogo,
    date: 'Oct 2021 – June 2023',
    brandColor: '#14b8a6',
    descBullets: [
      'Led a high-performing team to develop a robust, scalable, and cost-effective e-commerce platform, leveraging CI/CD, microservices, and cloud technologies.',
      'Architected and implemented a multi-vendor marketplace, significantly expanding product offerings and enhancing user experience',
      'Streamlined operations and reduced costs through automation and efficient system design',
      'Collaborated effectively with cross-functional teams to deliver high-quality solutions on time and within budget',
      'Deployed a reverse proxy on nginx layer with basic authentication to accurately direct incoming requests to their respective docker container',
      'Implemented of a robust notification service for multi-channel automated messaging, resulting in increased user engagement and improved system reliability',
      'Streamlined customer invoice generation by implementing an automated feature, securely storing invoices in AWS S3 and saving $129/month by cutting out third-party services',
      'Implemented Redis caching in microservices, reducing response times by up to 30%',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Addverb',
    companylogo: addverbLogo,
    date: 'Aug 2020 – Oct 2021',
    brandColor: '#3b82f6',
    descBullets: [
      'Worked on Warehouse Management System (WMS)',
      'Implemented SMTP-based license expiration notifications',
      'Enhanced security with license authentication and compliance',
      'Enabled robust password reset with OTP verification',
      'Implemented Midbound Service which enabled Inventory tracking once it is inside the warehouse and reduce the manual effort',
      'Developed Highly configurable and scalable microservice',
      'Designed Kafka based task scheduling and execution',
      'Developed and maintained a Single Sign-On (SSO) platform for Addverb products with Role-Based Access Control (RBAC) and JWT authentication to enhance API security.',
    ],
  },
]

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactInfo = {
  title: 'Contact Me ☎️',
  subtitle: 'Discuss a project or just want to say hi? My Inbox is open for all.',
  number: '+91-9983583829',
  email_address: 'adhikarihrithik@gmail.com',
}
