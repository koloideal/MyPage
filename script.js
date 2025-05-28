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
    const text = paragraph.innerText.trim();

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
    setTimeout(() => { span.style.opacity = '1'; }, index * 10);
  });
}

const textContainer = document.getElementById('text-container');
fadeTextIn(textContainer);


const translations = {
    "en": {
        "menu_about": "About Me",
        "menu_skills": "Stack",
        "menu_contacts": "Contacts",
        "about_title": "About Me",
        "about_text": "I am a Python Backend Dev. I work with Django, FastAPI and Flask. I design APIs, integrate databases and solve scaling problems.\n\n" +
                    "I am not afraid of difficult challenges. I \"revive\" legacy code without losing functionality. I always try to adhere to best practices, I work for the future.\n\n" +
                    "I work with REST, task queues (Celery, RabbitMQ) and cloud services. I write tests, set up CI/CD, monitor security.\n\n" +
                    "I strive for clean code, but I maintain balance. I am always ready to learn new things. I am open to cooperation and constructive criticism.",
        "skills_title": "Stack",
        "contact_title": "Contacts"
    },
    "ru": {
        "menu_about": "Обо мне",
        "menu_skills": "Стек",
        "menu_contacts": "Контакты",
        "about_title": "Обо мне",
        "about_text": "Я бэкенд-разработчик на Python. Работаю с Django, FastAPI и Flask. Проектирую API, интегрирую базы данных и решаю задачи масштабирования.\n\n" +
                    "Не боюсь сложных вызовов. «Оживляю» legacy-код без потери функционала. Всегда стараюсь придерживаться best practices, работаю на перспективу.\n\n" +
                    "Работаю с REST,  очередями задач (Celery, RabbitMQ) и облачными сервисами. Пишу тесты, настраиваю CI/CD, слежу за безопасностью.\n\n" +
                    "Стремлюсь к чистому коду, но придерживаюсь баланса. Всегда готов изучать новое. Открыт к сотрудничеству и конструктивной критике.",
        "skills_title": "Стек",
        "contact_title": "Контакты"
    }
};

let currentLanguage = "en";

function switchLanguage() {
    currentLanguage = currentLanguage === "en" ? "ru" : "en";
    document.querySelectorAll("[data-lang-key]").forEach(element => {

        element.classList.add('hidden');

        setTimeout(() => {
            const key = element.getAttribute("data-lang-key");
            if (translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
            setTimeout(() => {
                element.classList.remove('hidden');
            }, 30);
        }, 150);
    });
    document.getElementById("language-toggle").textContent = currentLanguage === "en" ? "ru" : "en";
}

document.getElementById("language-toggle").addEventListener("click", switchLanguage);




let currentTheme = "dark";

function switchTheme(){
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.classList.toggle('light-theme');
    document.getElementById("theme-toggle").textContent = currentTheme === "dark" ? "light" : "dark";

    const gh_logo = document.getElementById("gh-logo");
    const cw_logo = document.getElementById("cw-logo");

    gh_logo.classList.add('hidden');
    cw_logo.classList.add('hidden');

    setTimeout(() => {
        gh_logo.src = currentTheme === "light" ? "logo/github-dark.png" : "logo/github.png";
        gh_logo.classList.remove('hidden');
    }, 150);

    setTimeout(() => {
        cw_logo.src = currentTheme === "light" ? "logo/codewars-dark.png" : "logo/codewars.png";
        cw_logo.classList.remove('hidden');
    }, 150);
}

document.getElementById("theme-toggle").addEventListener("click", switchTheme);


