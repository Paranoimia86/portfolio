// ===== ROK V PÄTIČKE =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== PREKLADY (SK / EN) =====
const translations = {
  sk: {
    "nav.home": "Domov",
    "nav.about": "O mne",
    "nav.education": "Vzdelanie",
    "nav.tools": "Nástroje",
    "nav.projects": "Projekty",
    "nav.hobby": "Hobby",
    "nav.contact": "Kontakt",
    "burger.open": "Otvoriť menu",
    "hero.greeting": "Ahoj, volám sa",
    "hero.desc":
      "Som absolvent Technickej univerzity v Košiciach s titulom Ing. so záujmom o vývoj webových aplikácií a moderné informačné technológie. Baví ma vytvárať webové riešenia s využitím rôznych nástrojov a technológií, pričom sa neustále snažím rozširovať svoje znalosti a získavať nové skúsenosti. Som pracovitý, zodpovedný a rád by som pracoval v tíme, kde môžem prispieť svojimi nápadmi a zároveň sa učiť od ostatných. Vo voľnom čase sa venujem športu a osobnému rozvoju, pretože verím, že neustále vzdelávanie a aktívny životný štýl sú dôležitou súčasťou profesijného aj osobného rastu.",
    "hero.cta": "Zistiť viac",
    "hero.download": "Stiahnuť CV (PDF)",
    "about.title": "O mne",
    "about.photo": "Foto",
    "about.text":
      "Som absolvent Technickej univerzity v Košiciach s titulom Ing. a nadšením pre vývoj webových aplikácií a moderné technológie. Rád vytváram webové riešenia, spoznávam nové nástroje a neustále rozvíjam svoje technické zručnosti. Som pracovitý, tímovo orientovaný a motivovaný neustále sa zlepšovať. Hľadám príležitosť začať svoju kariéru ako Junior Full-Stack/Web Developer a podieľať sa na vývoji kvalitných softvérových riešení.",
    "about.labelName": "Meno:",
    "about.labelEmail": "Email:",
    "about.labelLocation": "Lokalita:",
    "about.labelAvailability": "Dostupnosť:",
    "about.labelCity": "Mesto:",
    "about.location": "Slovensko",
    "about.availability": "Voľný pre nové projekty",
    "education.title": "Vzdelanie",
    "education.date1": "2017 – 2021",
    "education.item1Title": "Gymnázium Pavla Horova, Michalovce",
    "education.item1Desc": "Trieda so všeobecným zameraním.",
    "education.date2": "2021 – 2026",
    "education.item2Title": "Technická univerzita v Košiciach",
    "education.item2Desc":
      "Fakulta elektrotechniky a informatiky, študijný program Informatika.",
    "tools.title": "Nástroje",
    "projects.title": "Projekty",
    "projects.image": "Projekt",
    "projects.cardTitle1": "SaaS webová aplikácia pre správu úloh",
    "projects.cardDesc1":
      "Webová aplikácia typu SaaS (Software as a Service) zameraná na efektívnu správu úloh a projektov, s moderným dizajnom a intuitívnym používateľským rozhraním.",
    "projects.cardTitle2": "Edukačný web v oblasti skriptovania",
    "projects.cardDesc2":
      "Webová aplikácia zameraná na vzdelávanie v oblasti skriptovania a programovania, využívajúca moderné technológie a interaktívne prvky.",
    "projects.cardTitle3": "E-shop s elektronikou",
    "projects.cardDesc3":
      "Webová aplikácia typu E-shop zameraná na predaj elektroniky, s moderným dizajnom a intuitívnym používateľským rozhraním.",
    "projects.cardLink": "Zobraziť projekt →",
    "hobby.title": "Hobby",
    "hobby.item1": "Cvičenie",
    "hobby.item2": "Plávanie",
    "hobby.item3": "Hudba",
    "hobby.item4": "Čítanie",
    "hobby.item5": "Cestovanie",
    "hobby.item6": "Varenie",
    "contact.title": "Kontakt",
    "contact.text":
      "Máte záujem o spoluprácu alebo len chcete pozdraviť? Napíšte mi, rád sa ozvem späť.",
    "contact.location": "Slovensko",
    "footer.rights": "Všetky práva vyhradené.",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.education": "Education",
    "nav.tools": "Tools",
    "nav.projects": "Projects",
    "nav.hobby": "Hobby",
    "nav.contact": "Contact",
    "burger.open": "Open menu",
    "hero.greeting": "Hi, my name is",
    "hero.desc":
      "I am a graduate of the Technical University of Košice with a Master's degree in Engineering (Ing.) and a strong interest in web application development and modern information technologies. I enjoy building web applications using a variety of tools and technologies while continuously expanding my knowledge and improving my technical skills. I am a hardworking, responsible, and team-oriented person who enjoys collaborating with others and contributing to shared goals. Outside of work, I dedicate my time to sports and personal development, as I believe that continuous learning and an active lifestyle are essential for both professional and personal growth.",
    "hero.cta": "Learn more",
    "hero.download": "Download CV (PDF)",
    "about.title": "About me",
    "about.photo": "Photo",
    "about.text":
      "Master's graduate (Ing.) from the Technical University of Košice with a passion for web development and modern technologies. I enjoy building web applications, learning new tools, and continuously improving my technical skills. I am a hardworking, team-oriented, and motivated person eager to start my career as a Junior Full-Stack/Web Developer and contribute to meaningful projects.",
    "about.labelName": "Name:",
    "about.labelEmail": "Email:",
    "about.labelLocation": "Location:",
    "about.labelAvailability": "Availability:",
    "about.location": "Slovakia",
    "about.labelCity": "City:",
    "about.availability": "Available for new projects",
    "education.title": "Education",
    "education.date1": "2017 – 2021",
    "education.item1Title": "Pavol Horov Gymnasium, Michalovce",
    "education.item1Desc": "General education class.",
    "education.date2": "2021 – 2026",
    "education.item2Title": "Technical University of Košice",
    "education.item2Desc":
      "Faculty of Electrical Engineering and Informatics, study program Informatics.",
    "tools.title": "Tools",
    "projects.title": "Projects",
    "projects.image": "Project",
    "projects.cardTitle1": "SaaS web application for task management",
    "projects.cardDesc1":
      "SaaS (Software as a Service) web application focused on efficient task and project management, with a modern design and intuitive user interface.",
    "projects.cardTitle2": "Educational web application for scripting",
    "projects.cardDesc2":
      "Web application focused on education in scripting and programming, utilizing modern technologies and interactive elements.",
    "projects.cardTitle3": "E-commerce web application for electronics",
    "projects.cardDesc3":
      "E-commerce web application focused on selling electronics, with a modern design and intuitive user interface.",
    "projects.cardLink": "View project →",
    "hobby.title": "Hobbies",
    "hobby.item1": "Exercise",
    "hobby.item2": "Swimming",
    "hobby.item3": "Music",
    "hobby.item4": "Reading",
    "hobby.item5": "Travelling",
    "hobby.item6": "Cooking",
    "contact.title": "Contact",
    "contact.text":
      "Interested in working together or just want to say hi? Drop me a message, I'll get back to you soon.",
    "contact.location": "Slovakia",
    "footer.rights": "All rights reserved.",
  },
};

const langButtons = document.querySelectorAll(".lang-switch__btn");
const cvDownloadBtn = document.getElementById("cv-download-btn");

const cvFiles = {
  sk: "CV_Petras_SK.pdf",
  en: "CV_Petras_EN.pdf",
};

function applyLanguage(lang) {
  const dict = translations[lang] || translations.sk;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key]) el.setAttribute("aria-label", dict[key]);
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  if (cvDownloadBtn) {
    const file = cvFiles[lang] || cvFiles.sk;
    cvDownloadBtn.setAttribute("href", file);
    cvDownloadBtn.setAttribute("download", file);
  }

  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem("lang", lang);
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () =>
    applyLanguage(btn.getAttribute("data-lang")),
  );
});

applyLanguage(localStorage.getItem("lang") || "sk");

// ===== MOBILNÉ MENU (BURGER) =====
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("is-open");
  burger.classList.toggle("is-active");
});

// Zatvorenie menu po kliknutí na odkaz (mobil)
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.classList.remove("is-active");
  });
});

// ===== ZVÝRAZNENIE AKTÍVNEHO ODKAZU PODĽA SEKCIE =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function setActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight * 0.35;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav__link[href="#${id}"]`);

    if (!link) return;

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

// ===== HEADER TIENOVANIE PRI SCROLLI =====
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.style.boxShadow =
    window.scrollY > 10 ? "0 4px 20px rgba(0,0,0,0.3)" : "none";
});

// ===== SCROLL REVEAL ANIMÁCIA =====
const revealElements = document.querySelectorAll(".section, .hero__text");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((el) => observer.observe(el));

// ===== KARUSEL OBRÁZKOV PROJEKTU =====
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevBtn = carousel.querySelector(".carousel-btn--prev");
  const nextBtn = carousel.querySelector(".carousel-btn--next");
  let current = 0;
  let timer;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) =>
      slide.classList.toggle("active", i === current),
    );
  }

  function startAutoplay() {
    timer = setInterval(() => showSlide(current + 1), 4000);
  }

  function stopAutoplay() {
    clearInterval(timer);
  }

  prevBtn?.addEventListener("click", () => {
    stopAutoplay();
    showSlide(current - 1);
    startAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    stopAutoplay();
    showSlide(current + 1);
    startAutoplay();
  });

  if (slides.length > 1) startAutoplay();
});

// ===== LIGHTBOX PRE OBRÁZKY PROJEKTOV =====
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

let lightboxImages = [];
let lightboxIndex = 0;

function updateLightboxImage() {
  const img = lightboxImages[lightboxIndex];
  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;
}

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex = index;
  updateLightboxImage();
  lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden";

  const showNav = lightboxImages.length > 1;
  lightboxPrev.style.display = showNav ? "flex" : "none";
  lightboxNext.style.display = showNav ? "flex" : "none";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".project-card__image").forEach((imageBox) => {
  const images = Array.from(imageBox.querySelectorAll("img"));
  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(images, index));
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

lightboxPrev?.addEventListener("click", () => {
  lightboxIndex =
    (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
});

lightboxNext?.addEventListener("click", () => {
  lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
  updateLightboxImage();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox?.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") lightboxPrev?.click();
  if (e.key === "ArrowRight") lightboxNext?.click();
});
