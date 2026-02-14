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
  const paragraphs = element.getElementsByTagName('h1');
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
    setTimeout(() => { span.style.opacity = '1'; }, index * 100);
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
        "about_text": "I am a Python Backend Dev. I work with Django, FastAPI and Flask. I design APIs, solve scaling problems.\n\n" +
                    "I am not afraid of difficult challenges. I \"revive\" legacy code without losing functionality. I try to adhere to best practices, I work for the future.\n\n" +
                    "I work with REST, task queues (Celery, RabbitMQ) and cloud services. I write tests, set up CI/CD.\n\n" +
                    "I strive for clean code, but I maintain balance. I am always ready to learn new things. I am open to cooperation and constructive criticism.",
        "skills_title": "Stack",
        "contact_title": "Contacts"
    },
    "ru": {
        "menu_about": "Обо мне",
        "menu_skills": "Стек",
        "menu_contacts": "Контакты",
        "about_title": "Обо мне",
        "about_text": "Я бэкенд-разработчик на Python. Работаю с Django, FastAPI и Flask. Проектирую API, решаю задачи масштабирования.\n\n" +
                    "Не боюсь сложных вызовов. «Оживляю» legacy-код без потери функционала. Стараюсь придерживаться best practices.\n\n" +
                    "Работаю с REST,  очередями задач (Celery, RabbitMQ) и облачными сервисами. Пишу тесты, настраиваю CI/CD.\n\n" +
                    "Стремлюсь к чистому коду, но придерживаюсь баланса. Всегда готов изучать новое. Открыт к сотрудничеству.",
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




// Centipede Canvas Animation - Complete Rewrite
(function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '5';
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Vector utilities
    class Vec2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        
        add(v) {
            return new Vec2(this.x + v.x, this.y + v.y);
        }
        
        sub(v) {
            return new Vec2(this.x - v.x, this.y - v.y);
        }
        
        mult(n) {
            return new Vec2(this.x * n, this.y * n);
        }
        
        mag() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        
        normalize() {
            const m = this.mag();
            if (m > 0) return this.mult(1 / m);
            return new Vec2(0, 0);
        }
        
        setMag(n) {
            return this.normalize().mult(n);
        }
        
        limit(max) {
            if (this.mag() > max) {
                return this.setMag(max);
            }
            return this;
        }
        
        heading() {
            return Math.atan2(this.y, this.x);
        }
        
        dist(v) {
            const dx = this.x - v.x;
            const dy = this.y - v.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }
    
    // Centipede with proper steering behaviors
    class Centipede {
        constructor() {
            this.pos = new Vec2(canvas.width / 2, canvas.height / 2);
            this.vel = new Vec2(2, 0);
            this.acc = new Vec2(0, 0);
            
            this.maxSpeed = 2;
            this.maxForce = 0.05;
            
            // Wander behavior
            this.wanderTheta = Math.random() * Math.PI * 2;
            this.wanderRadius = 50;
            this.wanderDistance = 80;
            this.wanderChange = 0.1;
            
            // Body segments
            this.segmentCount = 45;
            this.segmentGap = 6;
            this.history = [];
            this.maxHistory = this.segmentCount * this.segmentGap;
            
            // Leg animation
            this.legPhase = 0;
            
            // Initialize history
            for(let i = 0; i < this.maxHistory; i++) {
                this.history.push({
                    pos: new Vec2(this.pos.x, this.pos.y),
                    angle: 0
                });
            }
        }
        
        applyForce(force) {
            this.acc = this.acc.add(force);
        }
        
        wander() {
            // Calculate circle position in front
            const circlePos = this.vel.normalize().mult(this.wanderDistance);
            const target = this.pos.add(circlePos);
            
            // Random point on circle
            this.wanderTheta += (Math.random() - 0.5) * this.wanderChange;
            const wanderPoint = new Vec2(
                this.wanderRadius * Math.cos(this.wanderTheta),
                this.wanderRadius * Math.sin(this.wanderTheta)
            );
            
            // Rotate to velocity direction
            const angle = this.vel.heading();
            const rotatedWander = new Vec2(
                wanderPoint.x * Math.cos(angle) - wanderPoint.y * Math.sin(angle),
                wanderPoint.x * Math.sin(angle) + wanderPoint.y * Math.cos(angle)
            );
            
            const targetPos = target.add(rotatedWander);
            return this.seek(targetPos);
        }
        
        seek(target) {
            const desired = target.sub(this.pos);
            desired.x = desired.x;
            desired.y = desired.y;
            const d = desired.mag();
            
            let speed = this.maxSpeed;
            if (d < 100) {
                speed = (d / 100) * this.maxSpeed;
            }
            
            const steer = desired.setMag(speed).sub(this.vel).limit(this.maxForce);
            return steer;
        }
        
        avoidEdges() {
            const margin = 100;
            let steer = new Vec2(0, 0);
            
            if (this.pos.x < margin) {
                steer.x = this.maxSpeed;
            } else if (this.pos.x > canvas.width - margin) {
                steer.x = -this.maxSpeed;
            }
            
            if (this.pos.y < margin) {
                steer.y = this.maxSpeed;
            } else if (this.pos.y > canvas.height - margin) {
                steer.y = -this.maxSpeed;
            }
            
            if (steer.mag() > 0) {
                steer = steer.setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce * 3);
            }
            
            return steer;
        }
        
        avoidSelf() {
            const lookAhead = 60;
            const futurePos = this.pos.add(this.vel.normalize().mult(lookAhead));
            
            let closestDist = Infinity;
            let avoidForce = new Vec2(0, 0);
            
            // Check against body segments (skip first 15 to allow natural curves)
            for(let i = 15 * this.segmentGap; i < this.history.length; i += this.segmentGap) {
                const seg = this.history[i];
                const d = futurePos.dist(seg.pos);
                
                if (d < 40 && d < closestDist) {
                    closestDist = d;
                    // Steer away from body segment
                    const away = futurePos.sub(seg.pos).normalize();
                    avoidForce = away.mult(this.maxSpeed);
                }
            }
            
            if (avoidForce.mag() > 0) {
                avoidForce = avoidForce.setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce * 4);
            }
            
            return avoidForce;
        }
        
        update() {
            // Apply steering behaviors
            const wanderForce = this.wander();
            const edgeForce = this.avoidEdges();
            const selfForce = this.avoidSelf();
            
            this.applyForce(wanderForce);
            this.applyForce(edgeForce);
            this.applyForce(selfForce);
            
            // Update velocity and position
            this.vel = this.vel.add(this.acc);
            this.vel = this.vel.limit(this.maxSpeed);
            this.pos = this.pos.add(this.vel);
            this.acc = this.acc.mult(0);
            
            // Store in history
            this.history.unshift({
                pos: new Vec2(this.pos.x, this.pos.y),
                angle: this.vel.heading()
            });
            
            if (this.history.length > this.maxHistory) {
                this.history.pop();
            }
            
            this.legPhase += 0.12;
        }
        
        draw() {
            const isDarkTheme = !document.body.classList.contains('light-theme');
            ctx.strokeStyle = isDarkTheme ? '#FFFFFF' : '#333333';
            ctx.fillStyle = isDarkTheme ? '#FFFFFF' : '#333333';
            ctx.lineWidth = 1.5;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // Draw spine
            ctx.beginPath();
            for(let i = 0; i < this.segmentCount; i++) {
                const index = i * this.segmentGap;
                if (index >= this.history.length) break;
                
                const seg = this.history[index];
                if (i === 0) {
                    ctx.moveTo(seg.pos.x, seg.pos.y);
                } else {
                    ctx.lineTo(seg.pos.x, seg.pos.y);
                }
            }
            ctx.stroke();
            
            // Draw segments with ribs and legs
            for(let i = 0; i < this.segmentCount; i++) {
                const index = i * this.segmentGap;
                if (index >= this.history.length) break;
                
                const seg = this.history[index];
                const isHead = i === 0;
                
                if (isHead) {
                    this.drawHead(seg.pos.x, seg.pos.y, seg.angle);
                } else {
                    this.drawSegment(seg.pos.x, seg.pos.y, seg.angle, i);
                }
            }
        }
        
        drawHead(x, y, angle) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            
            // Head shape
            ctx.beginPath();
            ctx.arc(0, 0, 8, 0, Math.PI * 2);
            ctx.stroke();
            
            // Antennae
            ctx.beginPath();
            ctx.moveTo(6, 0);
            ctx.lineTo(18, -10);
            ctx.moveTo(6, 0);
            ctx.lineTo(18, 10);
            ctx.stroke();
            
            // Eyes
            ctx.beginPath();
            ctx.arc(2, -4, 2, 0, Math.PI * 2);
            ctx.arc(2, 4, 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
        
        drawSegment(x, y, angle, segmentIndex) {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            
            // Calculate rib width (wider in middle, narrower at ends)
            const t = segmentIndex / this.segmentCount;
            const ribWidth = 12 * Math.sin(t * Math.PI);
            
            // Draw rib (perpendicular to spine)
            ctx.beginPath();
            ctx.moveTo(0, -ribWidth);
            ctx.lineTo(0, ribWidth);
            ctx.stroke();
            
            // Leg animation with phase shift
            const legPhaseOffset = segmentIndex * 0.6;
            const legWave = Math.sin(this.legPhase + legPhaseOffset);
            
            // Left leg (from top of rib)
            this.drawLeg(0, -ribWidth, legWave, -1);
            
            // Right leg (from bottom of rib)
            this.drawLeg(0, ribWidth, legWave, 1);
            
            ctx.restore();
        }
        
        drawLeg(startX, startY, wave, side) {
            const legLength1 = 14;
            const legLength2 = 12;
            
            // First segment angle
            const angle1 = side * (Math.PI / 2.5 + wave * 0.4);
            const joint1X = startX + Math.cos(angle1) * legLength1;
            const joint1Y = startY + Math.sin(angle1) * legLength1;
            
            // Second segment angle
            const angle2 = angle1 + side * (0.6 - wave * 0.3);
            const footX = joint1X + Math.cos(angle2) * legLength2;
            const footY = joint1Y + Math.sin(angle2) * legLength2;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(joint1X, joint1Y);
            ctx.lineTo(footX, footY);
            ctx.stroke();
            
            // Foot tip
            ctx.beginPath();
            ctx.arc(footX, footY, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    const centipede = new Centipede();
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        centipede.update();
        centipede.draw();
        requestAnimationFrame(animate);
    }
    
    animate();
})();
