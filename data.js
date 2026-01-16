// =================== TEMEL PROFİL BİLGİLERİ ===================

const GORKEM_PROFILE = {
  fullName: "Halil Görkem Yiğit",
  title: "Bilgisayar Mühendisliği Öğrencisi",
  location: "İzmir, Türkiye",
  languages: ["Türkçe (ana dil)", "İngilizce (Profesyonel)", "Almanca (B1)"],
  technologies: ["Java", "JavaScript (React)", "Dart & Flutter", "Python", "Temel Machine Learning"],
  education: [
    {
      school: "İzmir Ekonomi Üniversitesi - Bilgisayar Mühendisliği",
      years: "2022 - (devam ediyor)",
      notes:
        "Veri yapıları, algoritmalar, yazılım geliştirme ve web teknolojileri üzerine dersler."
    },
    {
      school: "Technische Hochschule Würzburg-Schweinfurt (THWS)",
      years: "6 aylık Erasmus Programı",
      notes:
        "Almanya’da 6 aylık Erasmus deneyimi. Data Science / Machine Learning odaklı dersler ve projeler ile veri analizi ve modern ML konularında kendini geliştirme."
    }
  ],
  goals: [
    "Data Science ve Machine Learning alanında uzmanlaşmak.",
    "Almanya’da staj ve sonrasında tam zamanlı pozisyon bulmak.",
    "Hem backend / full-stack hem de veri odaklı projelerde yer almak."
  ],
  projects: [
    {
      name: "Machine Learning ile Resim Tamamlama",
      tech: ["Python", "Jupyter", "Neural Networks"],
      description:
        "Belirli bir patterni verilen resmi machine learning kullanarak tahmin etmeye çalıştım."
    },
    {
      name: "Online Kütüphane",
      tech: ["Dart", "Flutter"],
      description:
        "Flutter ile yapılmış basit bir kütüphane uygulaması. API kullanarak kitapların ismi ve yazarlarını bulabilmek için geliştirildi."
    }
  ]
};

// =================== TR SORU - CEVAP BLOKLARI ===================

const QA_PAIRS = [
  {
    patterns: [
      "kendini tanıt",
      "kendini kısaca tanıt",
      "kimsin",
      "hakkında",
      "özet",
      "genel bilgi",
      "kimdir",
      "cv özeti",
      "özgeçmiş özeti"
    ],
    answer:
      "Ben Görkem, bilgisayar mühendisliği öğrencisiyim. Java, JavaScript/React, Python ve Flutter ile projeler geliştirdim. Almanya’da THWS’te 6 aylık Erasmus deneyimim oldu ve kariyerimi Data Science / Machine Learning odaklı olarak şekillendirmek istiyorum."
  },

  {
    patterns: [
      "eğitim",
      "egitim",
      "okul",
      "üniversite",
      "universite",
      "lisans",
      "bölüm",
      "hangi üniversite",
      "hangi universite",
      "akademik"
    ],
    answer:
      "İzmir Ekonomi Üniversitesinde Bilgisayar Mühendisliği lisans öğrencisiyim. Veri yapıları, algoritmalar,OOP, yazılım geliştirme ve web teknolojileri gibi temel bilgisayar mühendisliği derslerini aldım. Ayrıca Erasmus kapsamında Almanya’daki THWS’te 6 ay okudum ve burada Data Science / Machine Learning odaklı dersler ve projelerle kendimi geliştirdim."
  },

  {
    patterns: [
      "erasmus",
      "thws",
      "almanya deneyimi",
      "almanya'daki deneyim",
      "erasmus deneyimi",
      "erasmus süresi",
      "kaç ay erasmus"
    ],
    answer:
      "6 aylık Erasmus programı ile Almanya’da, THWS (Technische Hochschule Würzburg-Schweinfurt)’te eğitim gördüm. Bu süreçte hem teknik anlamda (özellikle Data Science ve Machine Learning dersleri) hem de kültürel ve dil açısından kendimi geliştirdim."
  },

  {
    patterns: ["nerelisin", "nerede yaşıyorsun", "konum", "hangi şehirde", "hangi ülkede"],
    answer:
      "Aslen Aydınlıyım, eğitimim için İzmir’de yaşıyorum ve Almanya’da THWS’te 6 aylık Erasmus deneyimi yaşadım."
  },

  {
    patterns: ["hangi dilleri konuşuyorsun", "dil becerileri", "yabancı dil", "ingilizce seviyen", "almanca seviyen"],
    answer:
      "Türkçe ana dilim. İngilizceyi profesyonel seviyede kullanabiliyorum. Almanca seviyem ise B1 ve Erasmus sürecimde aktif kullandım."
  },

  {
    patterns: [
      "teknoloji",
      "neleri biliyorsun",
      "tech stack",
      "framework",
      "hangi teknolojiler",
      "java",
      "react",
      "flutter",
      "python"
    ],
    answer:
      "Ağırlıklı olarak Java,  Dart & Flutter ve Python ile çalışıyorum. Git & GitHub kullanıyorum. Data Science tarafında Python ile temel ML kütüphanelerine giriş yaptım."
  },

  {
    patterns: ["data science", "veri bilimi", "machine learning", "ml", "yapay zeka", "ai", "veri analizi"],
    answer:
      "Uzun vadeli hedefim Data Science ve Machine Learning alanında uzmanlaşmak. THWS’te aldığım derslerde veri analizi, temel ML kavramları ve modelleme konularına odaklandım."
  },

  {
    patterns: ["kariyer hedefi", "kariyer planı", "gelecek planların", "5 yıl sonra", "uzun vadeli hedef", "hedeflerin"],
    answer:
      "Kısa vadede Almanya’da Data Science veya yazılım geliştirme odaklı bir staj hedefliyorum. Uzun vadede ise DS/ML alanında uzmanlaşıp uluslararası bir şirkette çalışmak istiyorum."
  },

  {
    patterns: ["staj", "intern", "deneyim", "iş tecrübesi", "tecrübe"],
    answer:
      "Şu anda özellikle Almanya’da, Data Science veya yazılım geliştirme odaklı bir staj yapmayı hedefliyorum. Ekip çalışması içinde sorumluluk almayı önemsiyorum."
  },

  {
    patterns: ["güçlü yan", "strength", "avantaj", "pozitif yön", "artıların"],
    answer:
      "Disiplinli çalışırım, yeni teknolojileri hızlı öğrenirim ve sorumluluk almaktan çekinmem. Erasmus deneyimim adaptasyon ve iletişim becerilerimi güçlendirdi."
  },

  {
    patterns: ["zayıf yan", "weakness", "geliştirmek istediğin", "eksik", "negatif yön"],
    answer:
      "Detaylara fazla odaklanıp mükemmeliyetçi davranabiliyorum. Bunu dengelemek için zaman planlaması ve önceliklendirme yapıyorum."
  },

  {
    patterns: ["takım çalışması", "ekip", "teamwork", "iletişim", "ekipte çalışma"],
    answer:
      "Açık iletişimi ve iş birliğini önemserim. Erasmus sürecimde uluslararası ekiplerle çalışmak farklı bakış açılarına adapte olma becerimi geliştirdi."
  },

  {
    patterns: ["neden almanya", "almanya'da çalışmak", "almanya kariyer", "almanya hedefi"],
    answer:
      "Almanya’da eğitim deneyimim olduğu için çalışma kültürünü tanıyorum. Teknoloji ekosistemi güçlü ve uluslararası ortamda çalışmak istediğim için kariyerimi Almanya’da sürdürmek istiyorum."
  },

  {
    patterns: ["proje", "projelerin", "neler yaptın", "örnek proje", "hangi projeler"],
    answer:
      "Flutter ile bir kütüphane uygulaması ve ML ile resim tamamlama projesi gibi çalışmalar yaptım. GitHub profilimde detaylarını inceleyebilirsiniz."
  },

  {
    patterns: ["github", "profil linki", "portföy", "portfolio", "projeleri nerede görebilirim"],
    answer:
      "GitHub profilim: https://github.com/hgorkemy — projelerimin kodlarını ve gelişim sürecimi oradan görebilirsiniz."
  },

  {
    patterns: ["bizden beklentin", "şirketten beklentin", "pozisyondan beklentin", "işten beklentilerin"],
    answer:
      "Öğrenmenin desteklendiği, geri bildirim kültürünün olduğu bir ortam benim için önemli. Kod kalitesine önem verilmesi ve ürünün kullanıcıya değer katması beni motive eder."
  },

  {
    patterns: ["ortalama", "ortalaman", "gpa", "not ortalaması", "gno"],
    answer: "3. sınıfın başı itibariyle not ortalamam 2.8."
  },

  {
    patterns: ["maaş", "maas", "maaş beklentisi", "ücret", "salary", "salary expectation"],
    answer:
      "Maaş beklentim pozisyona ve paket detaylarına bağlı olarak esnek. Önceliğim öğrenebileceğim ve değer katabileceğim bir ekipte yer almak; rakamsal konuyu süreç ilerledikçe konuşmayı tercih ederim."
  }
];

// =================== EN SORU - CEVAP BLOKLARI ===================

const QA_PAIRS_EN = [
  // GENERAL INTRO
  {
    patterns: [
      "introduce yourself",
      "introduce",
      "tell me about yourself",
      "who are you",
      "about you",
      "summary",
      "overview",
      "cv summary",
      "resume summary",
      "who is gorkem"
    ],
    answer:
      "I'm Görkem, a Computer Engineering student. I have built projects using Java, JavaScript/React, Python, and Flutter. I also completed a 6-month Erasmus experience at THWS in Germany, and I want to shape my career around Data Science / Machine Learning."
  },

  // EDUCATION
  {
    patterns: [
      "education",
      "university",
      "college",
      "degree",
      "bachelor",
      "major",
      "department",
      "which university",
      "academic"
    ],
    answer:
      "I'm an undergraduate Computer Engineering student at Izmir Universisty of Economics. I’ve taken core CS courses such as data structures, algorithms,OOP, software development, and web technologies. I also studied at THWS in Germany for 6 months via Erasmus, focusing on Data Science / Machine Learning oriented courses and projects."
  },

  // ERASMUS & THWS
  {
    patterns: [
      "erasmus",
      "thws",
      "germany education",
      "germany experience",
      "experience in germany",
      "erasmus experience",
      "erasmus duration",
      "how long was erasmus",
      "how many months erasmus"
    ],
    answer:
      "I studied at THWS (Technische Hochschule Würzburg-Schweinfurt) in Germany for 6 months through the Erasmus program. During this period, I improved both technically (especially DS/ML-related courses) and personally in terms of culture and language. Working in an international environment also strengthened my teamwork and communication skills."
  },

  // LOCATION & BACKGROUND
  {
    patterns: [
      "where are you from",
      "where do you live",
      "location",
      "where are you based",
      "which city",
      "which country"
    ],
    answer:
      "I'm originally from Aydın, and I live in İzmir for my education. I also had a 6-month Erasmus experience at THWS in Germany. I’m aiming to build my career in an international environment in Europe."
  },

  // LANGUAGES
  {
    patterns: [
      "languages",
      "language skills",
      "foreign languages",
      "english level",
      "german level",
      "what languages do you speak"
    ],
    answer:
      "Turkish is my native language. I can use English at a professional level for academic and technical communication. My German level is B1, and I actively used it during my Erasmus period both in daily life and in classes."
  },

  // TECHNOLOGIES / TECHNICAL SKILLS
  {
    patterns: [
      "technology",
      "technologies",
      "what do you know",
      "tech stack",
      "programming languages",
      "frameworks",
      "what technologies",
      "java",
      "react",
      "flutter",
      "python",
      "skills"
    ],
    answer:
      "I mainly work with Java, Dart/Flutter, and Python. I have a strong foundation in data structures and algorithms through coursework and projects. I use Git & GitHub for version control, and I’ve started working with basic ML libraries in Python for Data Science."
  },

  // DATA SCIENCE & ML GOALS
  {
    patterns: [
      "data science",
      "machine learning",
      "ml",
      "ai",
      "artificial intelligence",
      "data analysis",
      "data analyst",
      "data scientist"
    ],
    answer:
      "My long-term goal is to specialize in Data Science and Machine Learning. At THWS, I focused on data analysis, basic ML concepts, and modeling. I’m continuing to improve my skills in data analysis and ML with Python and I want to work on real-world problems via internships or job opportunities."
  },

  // CAREER GOALS & FUTURE PLANS
  {
    patterns: [
      "career goal",
      "career goals",
      "career plan",
      "future plans",
      "future goals",
      "where do you see yourself",
      "5 years",
      "long term goal",
      "your goals"
    ],
    answer:
      "In the short term, I aim to do an internship in Germany and take part in impactful projects in Data Science or software development. In the long term, I want to specialize in Data Science / Machine Learning and work on data-driven products in an international company."
  },

  // INTERNSHIP & EXPERIENCE
  {
    patterns: [
      "internship",
      "intern",
      "experience",
      "work experience",
      "do you have experience"
    ],
    answer:
      "Throughout my university and Erasmus periods, I developed various projects. Currently, I’m aiming for an internship in Germany focused on Data Science or software development. I value taking responsibility in team environments and being involved in real product development processes."
  },

  // STRENGTHS
  {
    patterns: [
      "strengths",
      "strong points",
      "advantages",
      "positive sides",
      "what are you good at"
    ],
    answer:
      "I work in a disciplined way, I learn new technologies quickly, and I’m not afraid to take responsibility during project development. I communicate well with teammates and I’m open to feedback. Living and studying abroad also improved my cultural adaptability and communication."
  },

  // AREAS TO IMPROVE
  {
    patterns: [
      "weakness",
      "weak points",
      "areas to improve",
      "what do you want to improve",
      "negative sides"
    ],
    answer:
      "Sometimes I can be too detail-oriented and a bit perfectionist. I’m balancing this by focusing on time planning and prioritization. Technically, I’m also aiming to deepen my knowledge further in Data Science and Machine Learning."
  },

  // TEAMWORK & COMMUNICATION
  {
    patterns: [
      "teamwork",
      "team work",
      "team",
      "communication skills",
      "working in a team",
      "your role in a team"
    ],
    answer:
      "In projects, I prefer to take an active role and keep close communication with my teammates. I value exchanging ideas and building solutions together. My Erasmus experience with international teams improved my ability to adapt to different perspectives and communicate openly."
  },

  // WHY GERMANY
  {
    patterns: [
      "why germany",
      "why do you want germany",
      "work in germany",
      "germany career",
      "germany goal"
    ],
    answer:
      "Since I already had an education experience in Germany, I know and enjoy the working culture and daily life there. The tech ecosystem is strong, and I want to work in an international environment. That’s why I aim to continue my career in Germany, especially in Data Science or software development."
  },

  // PROJECTS (GENERAL)
  {
    patterns: [
      "projects",
      "your projects",
      "what have you done",
      "project examples",
      "github projects",
      "which projects"
    ],
    answer:
      "I’ve built projects in both web and mobile areas. For example, a Flutter-based library app, an ML-based image completion project, and various data structures implementations for coursework. You can check my GitHub profile(https://github.com/hgorkemy) for more details."
  },

  // GITHUB & PORTFOLIO
  {
    patterns: [
      "github",
      "profile link",
      "portfolio",
      "where can i see your projects",
      "project links"
    ],
    answer:
      "I keep most of my projects on GitHub. You can review my code style, commit habits, and project details on my GitHub profile: https://github.com/hgorkemy"
  },

  // GENERAL CV QUESTIONS
  {
    patterns: [
      "cv",
      "resume",
      "curriculum vitae",
      "more information",
      "detailed info"
    ],
    answer:
      "In short: I’m a Computer Engineering student, I’ve built projects with Java, JavaScript/React, Python, Flutter, and ML-related work. I also completed a 6-month Erasmus experience at THWS in Germany, and I’m aiming for a career in Data Science / Machine Learning. If you ask something more specific about education, projects, technical skills, or career goals, I can answer in more detail."
  },

  // WHAT CAN YOU BRING / WHY HIRE YOU
  {
    patterns: [
      "what can you bring",
      "what do you bring to the team",
      "why should we hire you",
      "your contribution",
      "why hire you"
    ],
    answer:
      "I believe I can contribute both technically and culturally. Technically, I’ve built projects with Java, JavaScript/React, Python, and Flutter, and I adapt quickly to new technologies. My Erasmus and Germany experience also helps me work comfortably in international teams. I take ownership, communicate clearly, and focus on building efficient and reliable solutions."
  },

  // WHERE DO YOU SEE YOURSELF
  {
    patterns: [
      "where do you see yourself",
      "where do you see yourself in 5 years",
      "future vision",
      "long term vision",
      "career vision"
    ],
    answer:
      "In the mid-term, I see myself in a role where I’m working on real products and deepening my expertise in Data Science or software development. In the long term, I aim to work on data-driven solutions in an international company, contribute to decision-making with data, and move towards technical leadership."
  },

  // HOW DO YOU WORK IN A TEAM
  {
    patterns: [
      "how do you work in a team",
      "team dynamics",
      "team compatibility",
      "team fit",
      "working with a team"
    ],
    answer:
      "In team environments, I value active communication, transparency, and constructive feedback. I’m comfortable taking responsibility and using initiative when needed. I also adapt quickly to different cultures thanks to my international teamwork experience during Erasmus."
  },

  // STRESS / DEADLINES
  {
    patterns: [
      "stress",
      "pressure",
      "working under pressure",
      "deadline pressure",
      "crisis"
    ],
    answer:
      "Under pressure, I try to stay organized and solution-oriented. I break the problem into smaller parts, prioritize tasks, and communicate early with the team when needed. I aim to stay calm and produce the most efficient solution together."
  },

  // HOBBIES
  {
    patterns: ["hobbies", "interests", "free time", "what do you do in your free time"],
    answer:
      "Sports are important for my mental health. I like playing football and basketball, and I try to run at least three times a week. I also enjoy reading and exploring topics like science, philosophy, history of religions, and evolutionary biology. Additionally, I have a small comic book collection."
  },

  // COMPANY EXPECTATIONS
  {
    patterns: [
      "what do you expect from us",
      "company expectations",
      "role expectations",
      "work environment expectations",
      "what do you expect from the job"
    ],
    answer:
      "For me, it’s important to be in an environment where learning is supported and feedback culture exists. I’m motivated by teams that value knowledge sharing, engineering best practices, and code quality. I also care about building products that deliver real value to users."
  },

  // GPA
  {
    patterns: ["gpa", "grade point average", "average grade", "cgpa"],
    answer:
      "As of the beginning of my 3rd year, my GPA is 2.8."
  },

  // SALARY EXPECTATION
  {
    patterns: [
      "salary",
      "salary expectation",
      "compensation",
      "pay expectation",
      "salary range"
    ],
    answer:
      "My salary expectation is flexible and depends on the role scope, responsibilities, and the overall compensation package. My priority is joining a team where I can learn, grow, and create impact, so I prefer aligning on numbers later in the process."
  }
];