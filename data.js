// =================== TEMEL PROFİL BİLGİLERİ ===================

const GORKEM_PROFILE = {
  fullName: "Halil Görkem Yiğit",
  title: "Bilgisayar Mühendisliği Öğrencisi ",
  location: "İzmir,Türkiye",
  languages: [
    "Türkçe (ana dil)",
    "İngilizce(Profesyonel)",
    "Almanca (B1)"
  ],
  technologies: [
    "Java",
    "JavaScript (React)",
    "Dart & Flutter",
    "Python",
    "Temel Machine Learning",
    
    
  ],
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
  // İstersen ileride doldurmak için proje listesi:
  projects: [
    {
      name: "Machine Learning ile Resim Tamamlama",
      tech: ["Python", "Jupyter","nueral networks"],
      description:
        "Belirli bir patterni verilen resmi machine learning kullanarak tahmin etmeye çalıştım "
    },
    {
      name: "Online kütüphane",
      tech: ["Dart", "Flutter"],
      description:
        "Flutter ile yapılmış basit bir Kütüphane uygulaması API kullanarak kitapların ismi ve yazarlarını bulabilmek için geliştirrildi."
    }
  ]
};

// =================== SORU - CEVAP BLOKLARI ===================

const QA_PAIRS = [
  // GENEL TANITIM
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

  // EĞİTİM
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
      "Akademik"
    ],
    answer:
      "Bilgisayar Mühendisliği lisans öğrencisiyim. Veri yapıları, algoritmalar, yazılım geliştirme ve web teknolojileri gibi temel bilgisayar mühendisliği derslerini aldım. Ayrıca Erasmus kapsamında Almanya’daki THWS’te 6 ay okudum ve burada Data Science / Machine Learning odaklı dersler ve projelerle kendimi geliştirdim."
  },

  // ERASMUS & THWS
  {
    patterns: [
      "erasmus",
      "thws",
      "almanya'daki eğitim",
      "almanya egitim",
      "almanya deneyimi",
      "almanya'daki deneyim",
      "erasmus deneyimi",
      "erasmus süresi",
      "kaç ay erasmus"
    ],
    answer:
      "6 aylık Erasmus programı ile Almanya’da, THWS (Technische Hochschule Würzburg-Schweinfurt)’te eğitim gördüm. Bu süreçte hem teknik anlamda (özellikle Data Science ve Machine Learning dersleri) hem de kültürel ve dil açısından kendimi geliştirdim. Uluslararası bir ortamda proje yürütme, ekip çalışması ve İngilizce/Almanca iletişim becerilerim güçlendi."
  },

  // KONUM & ARKA PLAN
  {
    patterns: [
      "nerelisin",
      "nerede yaşıyorsun",
      "konum",
      "şu anda neredesin",
      "hangi şehirde",
      "hangi ülkede"
    ],
    answer:
      "Aslen Aydınlıyım, eğitimim için İzmir’de yaşıyorum ve Almanya’da THWS’te 6 aylık Erasmus deneyimi yaşadım. Uluslararası ortamda bulunmak ve Avrupa’da kariyerimi sürdürmek istiyorum."
  },

  // DİLLER
  {
    patterns: [
      "hangi dilleri konuşuyorsun",
      "dil becerileri",
      "yabancı dil",
      "ingilizce seviyen",
      "almanca seviyen",
      "languages"
    ],
    answer:
      "Türkçe ana dilim. İngilizceyi profesyonel seviyede kullanabiliyorum, akademik ve teknik iletişim kurabiliyorum. Almanca seviyem ise B1 ve Almanya’daki Erasmus sürecimde hem günlük hayatta hem de ders ortamında aktif olarak kullandım."
  },

  // TEKNOLOJİLER / TEKNİK YETKİNLİK
  {
    patterns: [
      "teknoloji",
      "hangi dilleri",
      "neleri biliyorsun",
      "tech stack",
      "yazılım dilleri",
      "framework",
      "hangi teknolojiler",
      "hangi teknolojilerle çalışıyorsun",
      "java",
      "react",
      "flutter",
      "python"
    ],
    answer:
      "Ağırlıklı olarak Java, JavaScript (özellikle React), Dart & Flutter ve Python ile çalışıyorum. Veri yapıları ve algoritmalar konusunda üniversite derslerim ve projelerim var. Git & GitHub kullanarak versiyon kontrolü yapıyorum. Data Science alanında da Python ile temel ML kütüphanelerine giriş yaptım."
  },

  // DATA SCIENCE & ML HEDEFLERİ
  {
    patterns: [
      "data science",
      "veri bilimi",
      "machine learning",
      "ml",
      "yapay zeka",
      "ai",
      "veri analizi",
      "data analyst",
      "data scientist"
    ],
    answer:
      "Uzun vadeli hedefim Data Science ve Machine Learning alanında uzmanlaşmak. THWS’te aldığım derslerde veri analizi, temel ML kavramları ve modelleme konularına odaklandım. Şu anda Python ile veri analizi ve ML konularında kendimi geliştirmeye devam ediyorum ve bu alanda staj / iş fırsatlarıyla günümüz problemleri üzerinde çalışmak istiyorum."
  },

  // KARİYER HEDEFLERİ & GELECEK PLANLARI
  {
    patterns: [
      "kariyer hedefi",
      "kariyer planı",
      "gelecek planların",
      "gelecek hedeflerin",
      "5 yıl sonra",
      "uzun vadeli hedef",
      "hedeflerin",
      "hedefin",
      "hedef"
    ],
    answer:
      "Kısa vadede Data Science veya yazılım geliştirme alanında, özellikle Almanya’da bir staj yaparak öenmli  projelerde yer almak istiyorum. Uzun vadede ise Data Science / Machine Learning alanında uzmanlaşıp uluslararası bir şirkette veri odaklı ürünler geliştiren bir pozisyonda çalışmayı hedefliyorum."
  },

  // STAJ & DENEYİM
  {
    patterns: [
      "staj",
      "intern",
      "deneyim",
      "iş tecrübesi",
      "tecrübe",
      "deneyimin var mı"
    ],
    answer:
      "Üniversite ve Erasmus dönemim boyunca çeşitli projeler geliştirdim. Şu anda özellikle Almanya’da, Data Science veya yazılım geliştirme odaklı bir staj yapmayı hedefliyorum. Ekip çalışması içinde sorumluluk almayı ve gerçek ürün geliştirme süreçlerinde yer almayı önemsiyorum."
  },

  // GÜÇLÜ YANLAR
  {
    patterns: [
      "güçlü yan",
      "strength",
      "avantaj",
      "pozitif yön",
      "artıların",
      "kendinde sevdiğin özellik"
    ],
    answer:
      "Disiplinli çalışırım, yeni teknolojileri hızlı öğrenirim ve proje geliştirme sürecinde sorumluluk almaktan çekinmem. Takım arkadaşlarımla iletişimim güçlü ve geri bildirim almaya/açık biriyim. Farklı ülkelerde bulunmuş olmam kültürel adaptasyon ve iletişim yeteneğimi güçlendirdi."
  },

  // GELİŞTİRMEK İSTEDİĞİ YANLAR
  {
    patterns: [
      "zayıf yan",
      "weakness",
      "geliştirmek istediğin",
      "eksik",
      "kendinde geliştirmek istediğin",
      "negatif yön"
    ],
    answer:
      "Detaylara fazla odaklanıp zaman zaman mükemmeliyetçi davranabiliyorum. Bunu dengelemek için zaman planlaması yapmaya ve önceliklendirmeye dikkat ediyorum. Ayrıca, teknik tarafta da Data Science ve Machine Learning konularında kendimi daha derinlemesine geliştirmeye odaklanmış durumdayım."
  },

  // TAKIM ÇALIŞMASI & İLETİŞİM
  {
    patterns: [
      "takım çalışması",
      "ekip",
      "teamwork",
      "iletişim becerisi",
      "ekipte çalışma",
      "takım içinde rolün"
    ],
    answer:
      "Projelerde genellikle aktif rol almayı ve ekip arkadaşlarımla yakın iletişimde olmayı tercih ediyorum. Fikir alışverişine ve ortak çözüm üretmeye önem veriyorum. Erasmus sürecimde uluslararası ekiplerle çalışmak, farklı bakış açılarına adapte olma ve açık iletişim kurma becerimi geliştirdi."
  },

  // NEDEN ALMANYA
  {
    patterns: [
      "neden almanya",
      "neden burada",
      "almanya'da çalışmak",
      "almanya kariyer",
      "almanya hedefi"
    ],
    answer:
      "Halihazırda Almanya’da eğitim deneyimim olduğu için buranın çalışma kültürünü ve yaşam düzenini biliyorum ve seviyorum. Teknoloji ekosistemi güçlü ve uluslararası bir ortamda çalışmak istiyorum. Bu yüzden kariyerimi Almanya’da, özellikle Data Science veya yazılım geliştirme alanında devam ettirmek istiyorum."
  },

  // PROJELER (GENEL)
  {
    patterns: [
      "proje",
      "projelerin",
      "neler yaptın",
      "örnek proje",
      "github projelerin",
      "hangi projeler"
    ],
    answer:
      "Üniversite ve kişisel zamanımda hem web hem de mobil tarafta projeler geliştirdim. Örneğin Flutter ile bir kütüphane uygulaması, machine learning ile resim tamamlama projesi ve veri yapıları ve algoritmalar dersi kapsamında çeşitli veri yapıları implementasyonları gibi çalışmalar yaptım. GitHub profilimde projelerimi ayrıntılı olarak inceleyebilirsiniz."
  },

  // GITHUB & PORTFÖY
  {
    patterns: [
      "github",
      "profil linki",
      "portföy",
      "portfolio",
      "projeleri nerede görebilirim"
    ],
    answer:
      "Projelerimin büyük bir kısmını GitHub üzerinde tutuyorum. Kod yapım, commit alışkanlığım ve projelerimin detaylarını GitHub profilim üzerinden inceleyebilirsiniz(https://github.com/hgorkemy). İlgili pozisyona göre özellikle öne çıkan projeleri de ayrıca vurgulayabilirim."
  },

  // GENEL CV SORULARI
  {
    patterns: [
      "cv",
      "özgeçmiş",
      "detaylı cv",
      "hakkında daha fazla bilgi",
      "detaylı bilgi"
    ],
    answer:
      "Özetle: Bilgisayar Mühendisliği öğrencisiyim, Java, JavaScript/React, Python ve Flutter ve ML ile ilgili projeler geliştirdim, Almanya’da THWS’te 6 aylık Erasmus deneyimim oldu ve Data Science / Machine Learning alanında kariyer hedefliyorum. Eğitim, projeler, teknik beceriler veya kariyer hedeflerim hakkında daha spesifik bir soru sorarsanız detaylı yanıt verebilirim."
  },
  {
  patterns: [
    "bize ne katabilirsin",
    "şirkete ne katarsın",
    "neden seni alalım",
    "katkı",
    "bize katkın ne olur",
    "seni neden işe alalım"
  ],
  answer:
    "Teknik olarak hızlı öğrenen, sorumluluk almayı seven ve ekip içinde aktif rol oynayan bir yapıya sahibim. Hem yazılım geliştirme hem de Data Science alanındaki birikimimle projelere analitik bakış açısı katabilirim. Ayrıca Almanya’daki uluslararası ortam tecrübem sayesinde iletişim ve takım uyumu konusunda güçlü bir katkı sağlayacağıma inanıyorum. Yeni teknolojilere hızlı adapte olurum ve projelerde verimlilik odaklı çalışırım."
},
{
  patterns: [
    "kendini ilerde nerede görüyorsun",
    "5 yıl sonra kendini nerede görüyorsun",
    "gelecek planların",
    "kariyer hedefi",
    "kariyer vizyonu",
    "uzun vadeli hedef"
  ],
  answer:
    "Orta vadede Data Science veya yazılım geliştirme alanında uzmanlaşmış, gerçek ürünler üzerinde çalışan bir pozisyonda kendimi görüyorum. Teknik anlamda derinleşmek, aynı zamanda takım içinde sorumluluk alabileceğim bir rol edinmek istiyorum. Uzun vadede ise uluslararası bir şirkette veri odaklı çözümler üreten, karar süreçlerine katkı sağlayan ve teknik liderliğe doğru ilerleyen biri olmayı hedefliyorum."
},
{
  patterns: [
    "takım içinde nasıl çalışırsın",
    "ekip içinde çalışmak",
    "takım çalışması",
    "teamwork",
    "ekip uyumu"
  ],
  answer:
    "Takım çalışmalarında aktif iletişimi, şeffaflığı ve yapıcı geri bildirim kültürünü ön planda tutarım. Sorumluluk almaktan çekinmem ve gerekli olduğunda inisiyatif kullanırım. Farklı bakış açılarını değerlendirmeyi ve ortak noktada çözüm üretmeyi önemserim. Erasmus deneyimim boyunca uluslararası ekiplerle çalıştığım için farklı kültürlere hızlı uyum sağlayabilirim."
},
{
  patterns: [
    "stres",
    "zor durum",
    "baskı altında çalışma",
    "stresli durum",
    "kriz anı",
    "deadline baskısı"
  ],
  answer:
    "Baskı altında çalışma konusunda organize ve çözüm odaklı bir yaklaşım sergilerim. Genellikle problemi daha küçük parçalara ayırıp önceliklendirme yaparak yönetirim. Sakinliği korumaya dikkat ederim ve gerektiğinde ekip arkadaşlarımla hızlı iletişime geçerek en verimli çözümü oluşturmayı tercih ederim."
},
{
  patterns: [
    "zayıf yön",
    "weakness",
    "geliştirmen gereken",
    "geliştirmek istediğin yön",
    "eksik yan"
  ],
  answer:
    "Mükemmeliyetçi tarafım zaman zaman bir göreve gereğinden fazla odaklanmama yol açabiliyor. Bunu dengelemek için zaman yönetimi tekniklerini ve önceliklendirmeyi aktif şekilde kullanıyorum. Bu yaklaşım hem hızımı artırdı hem de kaliteyi korumama yardımcı oluyor."
},
{
    patterns: [
        "hobiler",
        "zevkler",
        "boş zaman aktiviteleri",
        "ilgi alanları"
    ],
    answer: "Spor yapmak mental sağlığım için çok önemli olduğunu düşünüyorum,sporu açarsak futbol basketbol oynamak ve haftada en az 3 kere koşu yapmaya özen gösteriyorum. Bilim ve Felsefe hakkında araştırma yapmayı,kitap okumayı seviyorum ayrıca dinler tarihi de sevdiğim alanlardan, Evrim biyolojisine büyük ilgi duyuyorum. Bunlar haricinde küçük bir çizgi roman koleksiyonum var .  "

},
{
  patterns: [
    "bize ne katabilirsin",
    "ekibe ne katarsın",
    "takıma ne katarsın",
    "neden seni işe alalım",
    "neden seni secelim",
    "neden seni seçelim",
    "neden seni tercih edelim",
    "seni diger adaylardan ayiran",
    "seni diğer adaylardan ayıran"
  ],
  answer:
    "Ekibe hem teknik hem de kültürel açıdan katkı sağlayabileceğimi düşünüyorum. Teknik tarafta Java, JavaScript/React, Python ve Flutter ile projeler geliştirmiş durumdayım ve yeni teknolojilere hızlı adapte olabiliyorum. Erasmus ve Almanya deneyimim sayesinde uluslararası ekiplerde çalışma, farklı bakış açılarını anlama ve iletişim kurma konusunda rahatım. Sorumluluk almaktan çekinmem, işi sahiplenirim ve sürecin sadece kod yazmak değil; iletişim, planlama ve sürekli iyileştirme olduğunu bilerek hareket ederim."
},
{
  patterns: [
    "bizden beklentin ne",
    "şirketten beklentin",
    "pozisyondan beklentin",
    "çalışma ortamından ne beklersin",
    "işten beklentilerin"
  ],
  answer:
    "Teknik olarak kendimi geliştirebileceğim, öğrenmenin desteklendiği ve geri bildirim kültürünün olduğu bir ortam benim için çok önemli. Ekibin bilgi paylaşımına açık olması, kod kalitesine ve iyi mühendislik pratiklerine önem verilmesi beni motive eder. Ayrıca, yapılan işin gerçekten kullanılan bir ürüne dönüşmesi ve kullanıcıya değer katması da benim için büyük bir motivasyon kaynağı."
},
{
patterns: [
  "ortalaman",
  "gpa",
  "not ortalaması",
  "gno"
],
  answer:"3. sınıfın başı itibariyle not ortalamam 2.8  "


},
{
  patterns: [
    "maaş",
    "maas",
    "maaş beklentisi",
    "maas beklentin",
    "ücret",
    "ücret beklentisi",
    "salary",
    "salary expectation"
  ],
  answer:
    "Maaş beklentim pozisyona, şirketin sunduğu yan haklara ve çalışma modeline bağlı olarak esnek. Temelde önemli olan teknik olarak gelişebileceğim, değer katabileceğim ve uzun vadeli bir yol haritasına sahip bir ekipte yer almak. Bu yüzden süreç ilerlediğinde karşılıklı beklentileri konuşmayı tercih ederim."
}
];

