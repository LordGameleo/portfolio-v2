/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Hrithik Adhikari",
  title: "Hi all, I'm Hrithik",
  subTitle: emoji(
    "Curiosity-driven Software Engineer 🚀🚀🚀🚀 Experienced in designing and implementing efficient, reliable, and maintainable software systems."    
  ),
  resumeLink:
    "https://drive.google.com/file/d/1uHpB6B15G6GfKej3UrfI9ZvDUY-ripc6/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/LordGameleo",
  linkedin: "https://www.linkedin.com/in/hrithikad/",
  gmail: "adhikarihrithik@gmail.com",
  // Instagram and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "Tools I use to create magic",
  skills: [
    // emoji(
    //   "⚡ Develop highly interactive Front end / User Interfaces for your web and mobile applications"
    // ),
    // emoji("⚡ Progressive Web Applications ( PWA ) in normal and SPA Stacks"),
    // emoji(
    //   "⚡ Integration of third party services such as Firebase/ AWS / Digital Ocean"
    // )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {
      skillName: "Java",
      fontAwesomeClassname: "fab fa-java"
    },
    {
      skillName: "Kotlin",
      fontAwesomeClassname: "fab fa-kotlin",
      svg: "kotlin"
    },
    {
      skillName: "Python",
      fontAwesomeClassname: "fab fa-python"
    },
    {
      skillName: "SQL",
      fontAwesomeClassname: "fa-solid fa-database",
      svg: "sql"
    },
    {
      skillName: "CosmosDB",
      fontAwesomeClassname: "fas fa-cosmos",
      svg: "cosmos"
    },
    {
      skillName: "Firebase",
      fontAwesomeClassname: "fas fa-fire"
    },
    {
      skillName: "Flutter",
      fontAwesomeClassname: "fa-brands fa-flutter",
      svg: "flutter"
    },
    {
      skillName: "ReactJs",
      fontAwesomeClassname: "fab fa-react",
    },
    {
      skillName: "Angular",
      fontAwesomeClassname: "fab fa-angular"
    },
    {
      skillName: "Kubernetes",
      fontAwesomeClassname: "fab fa-kubernetes",
      svg: "kubernetes"
    },
    {
      skillName: "Docker",
      fontAwesomeClassname: "fab fa-docker"
    },
    {
      skillName: "HTML5",
      fontAwesomeClassname: "fab fa-html5"
    },
    {
      skillName: "CSS3",
      fontAwesomeClassname: "fab fa-css3-alt"
    },
    {
      skillName: "SASS",
      fontAwesomeClassname: "fab fa-sass"
    },
    {
      skillName: "NodeJs",
      fontAwesomeClassname: "fab fa-node"
    },
    {
      skillName: "npm",
      fontAwesomeClassname: "fab fa-npm"
    },
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "Birla Institute of Technology and Science, Pilani",
      logo: require("./assets/images/bitsLogo.png"),
      subHeader: "Master of Science in Physics",
      duration: "August 2016 - May 2021",
    },
    {
      schoolName: "Birla Institute of Technology and Science, Pilani",
      logo: require("./assets/images/bitsLogo.png"),
      subHeader: "Bachelor of Engineering in Mechanical Engineering",
      duration: "August 2016 - May 2021",
    }
  ]
};


const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Backend Development", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Mobile App Development",
      progressPercentage: "80%"
    },
    {
      Stack: "Webapp Development",
      progressPercentage: "60%"
    },
    {
      Stack: "DevOps",
      progressPercentage: "50%"
    },
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Product Engineer",
      company: "Dashtoon",
      companylogo: require("./assets/images/dashtoonLogo.png"),
      date: "June 2023 – Present",
      descBullets: [
        "Architected and scaled Dashtoon's consumer app, propelling it from zero to a thriving community of 500,000 monthly active users",        "Led a seamless, zero-downtime migration of a massive database to Cosmos DB, ensuring data consistency",
        "Optimized data access and availability across regions with Cosmos DB, significantly reducing latency",
        "Architected a robust notification system, boosting user retention through timely and targeted notifications",
        "Enhanced Flutter app performance, delivering a smoother user experience and reducing crashes and ANRs",
        "Significantly reduced CDN costs and improved cache efficiency through image transformation optimization",
        "Established a robust CI/CD pipeline, accelerating build times and improving deployment reliability",
        "Engineered a successful referral program, driving significant organic traffic growth",
        "Implemented a flexible A/B testing framework, enabling data-driven decision-making",
        "Developed an automated testing framework, reducing manual testing efforts and improving test coverage",
        "Architected a highly engaging and modular Reader Screen, facilitating seamless integration of add-on features"
      ]
    },
    {
      role: "Founding Engineer",
      company: "Teknofeet",
      companylogo: require("./assets/images/teknofeetLogo.jpeg"),
      date: "Oct 2021 – June 2023",
      descBullets: [
        "Led a high-performing team to develop a robust, scalable, and cost-effective e-commerce platform, leveraging CI/CD, microservices, and cloud technologies.",        "Architected and implemented a multi-vendor marketplace, significantly expanding product offerings and enhancing user experience",
        "Streamlined operations and reduced costs through automation and efficient system design",
        "Collaborated effectively with cross-functional teams to deliver high-quality solutions on time and within budget",
        "Deployed a reverse proxy on nginx layer with basic authentication to accurately direct incoming requests to their respective docker container",
        "Implemented of a robust notification service for multi-channel automated messaging, resulting in increased user engagement and improved system reliability",
        "Streamlined customer invoice generation by implementing an automated feature, securely storing invoices in AWS S3 and saving $129/month by cutting out third-party services",
        "Implemented Redis caching in microservices, reducing response times by up to 30%",
      ],
    },
    {
      role: "Software Engineer",
      company: "Addverb",
      companylogo: require("./assets/images/addverbLogo.jpg"),
      date: "Aug 2021 – Oct 2021",
      descBullets: [
        "Implemented Midbound Service which enabled Inventory tracking once it is inside the warehouse and reduce the manual effort",
        "Developed Highly configurable and scalable microservice",
        "Designed Kafka based task scheduling and execution",
        "Developed and maintained a Single Sign-On (SSO) platform for Addverb products with Role-Based Access Control (RBAC) and JWT authentication to enhance API security."
      ],
    },
    {
      role: "Software Engineer Intern",
      company: "Addverb",
      companylogo: require("./assets/images/addverbLogo.jpg"),
      date: "Aug 2020 – Jan 2021",
      descBullets: [
        "Worked on Warehouse Management System (WMS)",        
        "Implemented SMTP-based license expiration notifications",
        "Enhanced security with license authentication and compliance",
        "Enabled robust password reset with OTP verification"
      ]
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: false // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME STARTUPS AND COMPANIES THAT I HELPED TO CREATE THEIR TECH",
  projects: [
    {
      image: require("./assets/images/saayaHealthLogo.webp"),
      projectName: "Saayahealth",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://saayahealth.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "Nextu",
      projectDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      footerLink: [
        {
          name: "Visit Website",
          url: "http://nextu.se/"
        }
      ]
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements And Certifications 🏆 "),
  subtitle:
    "Achievements, Certifications, Award Letters and Some Cool Stuff that I have done !",

  achievementsCards: [
    {
      title: "Google Code-In Finalist",
      subtitle:
        "First Pakistani to be selected as Google Code-in Finalist from 4000 students from 77 different countries.",
      image: require("./assets/images/codeInLogo.webp"),
      imageAlt: "Google Code-In Logo",
      footerLink: [
        {
          name: "Certification",
          url: "https://drive.google.com/file/d/0B7kazrtMwm5dYkVvNjdNWjNybWJrbndFSHpNY2NFV1p4YmU0/view?usp=sharing"
        },
        {
          name: "Award Letter",
          url: "https://drive.google.com/file/d/0B7kazrtMwm5dekxBTW5hQkg2WXUyR3QzQmR0VERiLXlGRVdF/view?usp=sharing"
        },
        {
          name: "Google Code-in Blog",
          url: "https://opensource.googleblog.com/2019/01/google-code-in-2018-winners.html"
        }
      ]
    },
    {
      title: "Google Assistant Action",
      subtitle:
        "Developed a Google Assistant Action JavaScript Guru that is available on 2 Billion devices world wide.",
      image: require("./assets/images/googleAssistantLogo.webp"),
      imageAlt: "Google Assistant Action Logo",
      footerLink: [
        {
          name: "View Google Assistant Action",
          url: "https://assistant.google.com/services/a/uid/000000100ee688ee?hl=en"
        }
      ]
    },

    {
      title: "PWA Web App Developer",
      subtitle: "Completed Certifcation from SMIT for PWA Web App Development",
      image: require("./assets/images/pwaLogo.webp"),
      imageAlt: "PWA Logo",
      footerLink: [
        {name: "Certification", url: ""},
        {
          name: "Final Project",
          url: "https://pakistan-olx-1.firebaseapp.com/"
        }
      ]
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "With Love for Developing cool stuff, I love to write and teach others what I have learnt.",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  blogs: [
    {
      url: "https://blog.usejournal.com/create-a-google-assistant-action-and-win-a-google-t-shirt-and-cloud-credits-4a8d86d76eae",
      title: "Win a Google Assistant Tshirt and $200 in Google Cloud Credits",
      description:
        "Do you want to win $200 and Google Assistant Tshirt by creating a Google Assistant Action in less then 30 min?"
    },
    {
      url: "https://medium.com/@saadpasta/why-react-is-the-best-5a97563f423e",
      title: "Why REACT is The Best?",
      description:
        "React is a JavaScript library for building User Interface. It is maintained by Facebook and a community of individual developers and companies."
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "TALKS",
  subtitle: emoji(
    "I LOVE TO SHARE MY LIMITED KNOWLEDGE AND GET A SPEAKER BADGE 😅"
  ),

  talks: [
    {
      title: "Build Actions For Google Assistant",
      subtitle: "Codelab at GDG DevFest Karachi 2019",
      slides_url: "https://bit.ly/saadpasta-slides",
      event_url: "https://www.facebook.com/events/2339906106275053/"
    }
  ],
  display: false // Set false to hide this section, defaults to true
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "I LOVE TO TALK ABOUT MYSELF AND TECHNOLOGY",

  // Please Provide with Your Podcast embeded Link
  podcast: [
    "https://anchor.fm/codevcast/embed/episodes/DevStory---Saad-Pasta-from-Karachi--Pakistan-e9givv/a-a15itvo"
  ],
  display: false // Set false to hide this section, defaults to true
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+91-9983583829",
  email_address: "adhikarihrithik@gmail.com"
};


const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  isHireable,
  resumeSection
};
