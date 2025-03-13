const menuLinks = document.querySelectorAll('.menu a');

for (let link of menuLinks) {
  link.addEventListener('click', smoothScroll);
}

function smoothScroll(event) {
  event.preventDefault();

  const targetId = this.href.substring(this.href.indexOf('#'));
  const targetElement = document.querySelector(targetId);

  const targetPosition = targetElement.offsetTop;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

function fadeTextIn(element) {
  const paragraphs = element.getElementsByTagName('p');
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const text = paragraph.innerText;

    paragraph.innerHTML = '';

    for (let j = 0; j < text.length; j++) {
      const span = document.createElement('span');
      span.innerText = text.charAt(j);
      span.classList.add('fad-in');
      paragraph.appendChild(span);
    }
  }

  const spanArray = Array.from(element.getElementsByTagName('span'));
  spanArray.forEach((span, index) => {
    setTimeout(() => { span.style.opacity = '1'; }, index * 20);
  });
}

const textContainer = document.getElementById('text-container');
fadeTextIn(textContainer);


const translations = {
    "en": {
        "menu_about": "About Me",
        "menu_skills": "Skills",
        "menu_contacts": "Contacts",
        "about_title": "About Me",
        "about_text": "I am a Backend Python Dev, focused on continuous learning and personal growth.\n\n" +
                    "I have practical experience deploying and maintaining web applications and bots.\n\n"+
                    "I create clean, efficient and well-structured code, I try to adhere to best practices such as SOLID and DRY principles.\n\n" +
                    "I am open to cooperation and always ready for new challenges, do not hesitate to contact me using the contact information below\n\n",
        "skills_title": "Tech Stack",
        "skill_1": "Python / Kotlin(in progress)",
        "contact_title": "Contacts"
    },
    "ru": {
        "menu_about": "Обо мне",
        "menu_skills": "Навыки",
        "menu_contacts": "Контакты",
        "about_title": "Обо мне",
        "about_text": "Я Backend Python Dev, нацеленный на постоянное обучение и личностный рост\n\n" +
                    "У меня есть практический опыт развертывания и поддержки веб-приложений и ботов\n\n" +
                    "Я создаю чистый, эффективный и хорошо структурированный код, стараюсь придерживаться лучших практик, таких как принципы SOLID и DRY\n\n" +
                    "Я открыт для сотрудничества и всегда готов к новым вызовам, не стесняйтесь обращаться ко мне по контактной информации ниже",
        "skills_title": "Тех. Стек",
        "skill_1": "Python / Kotlin(в процессе)",
        "contact_title": "Контакты"
    }
};

let currentLanguage = "en";

function switchLanguage() {
    currentLanguage = currentLanguage === "en" ? "ru" : "en";
    document.querySelectorAll("[data-lang-key]").forEach(element => {
        const key = element.getAttribute("data-lang-key");
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    document.getElementById("language-toggle").textContent = currentLanguage === "en" ? "en" : "ru";
}

document.getElementById("language-toggle").addEventListener("click", switchLanguage);


