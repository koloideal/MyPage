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

// Hacker Text Decode Animation
class HackerTextDecoder {
  constructor(element, options = {}) {
    this.element = element;
    this.originalText = element.textContent.trim();
    this.duration = options.duration || 1500;
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&{}[]<>@!?';
    this.updateInterval = 50; // Update every 50ms instead of every frame
    this.isDecoding = false;
  }

  getRandomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  decode() {
    if (this.isDecoding) return;
    this.isDecoding = true;

    const textLength = this.originalText.length;
    const iterations = Math.ceil(this.duration / this.updateInterval);
    let currentIteration = 0;

    // Create array to track which characters are decoded
    const decodedIndices = new Array(textLength).fill(false);
    const decodeOrder = [];
    
    // Create random decode order
    for (let i = 0; i < textLength; i++) {
      decodeOrder.push(i);
    }
    // Shuffle array for random decode effect
    for (let i = decodeOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [decodeOrder[i], decodeOrder[j]] = [decodeOrder[j], decodeOrder[i]];
    }

    let lastUpdate = 0;

    const animate = (timestamp) => {
      if (!lastUpdate) lastUpdate = timestamp;
      const elapsed = timestamp - lastUpdate;

      if (elapsed >= this.updateInterval) {
        lastUpdate = timestamp;
        currentIteration++;
        const progress = currentIteration / iterations;

        // Determine how many characters should be decoded by now
        const charsToDecodeCount = Math.floor(progress * textLength);
        
        // Mark characters as decoded based on progress
        for (let i = 0; i < charsToDecodeCount; i++) {
          if (i < decodeOrder.length) {
            decodedIndices[decodeOrder[i]] = true;
          }
        }

        // Build display text
        let displayText = '';
        for (let i = 0; i < textLength; i++) {
          if (decodedIndices[i]) {
            displayText += this.originalText[i];
          } else {
            // Show random character for undecoded positions
            displayText += this.originalText[i] === ' ' ? ' ' : this.getRandomChar();
          }
        }

        this.element.textContent = displayText;
      }

      if (currentIteration < iterations) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final text is correct
        this.element.textContent = this.originalText;
        this.isDecoding = false;
      }
    };

    requestAnimationFrame(animate);
  }
}

// Initialize hacker text effect with IntersectionObserver
function initHackerText() {
  const hackerElements = document.querySelectorAll('.hacker-text, h1');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.decoded) {
        entry.target.dataset.decoded = 'true';
        const decoder = new HackerTextDecoder(entry.target);
        decoder.decode();
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px'
  });

  hackerElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHackerText);
} else {
  initHackerText();
}


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




var Input = {
  keys: [],
  mouse: {
    left: false,
    right: false,
    middle: false,
    x: 0,
    y: 0
  }
};
for (var i = 0; i < 230; i++) {
  Input.keys.push(false);
}
document.addEventListener("keydown", function(event) {
  Input.keys[event.keyCode] = true;
});
document.addEventListener("keyup", function(event) {
  Input.keys[event.keyCode] = false;
});
document.addEventListener("mousedown", function(event) {
  if ((event.button = 0)) {
    Input.mouse.left = true;
  }
  if ((event.button = 1)) {
    Input.mouse.middle = true;
  }
  if ((event.button = 2)) {
    Input.mouse.right = true;
  }
});
document.addEventListener("mouseup", function(event) {
  if ((event.button = 0)) {
    Input.mouse.left = false;
  }
  if ((event.button = 1)) {
    Input.mouse.middle = false;
  }
  if ((event.button = 2)) {
    Input.mouse.right = false;
  }
});
document.addEventListener("mousemove", function(event) {
  Input.mouse.x = event.clientX;
  Input.mouse.y = event.clientY;
});
//Sets up canvas
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = Math.max(window.innerWidth, window.innerWidth);

//canvas.height = Math.max(window.innerWidth, window.innerWidth);

canvas.height = window.innerHeight;
canvas.style.position = "fixed";
canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style.zIndex = "1";
canvas.style.pointerEvents = "none";
// document.body.style.overflow = "hidden";
var ctx = canvas.getContext("2d");
//Necessary classes
var segmentCount = 0;
class Segment {
  constructor(parent, size, angle, range, stiffness) {
    segmentCount++;
    this.isSegment = true;
    this.parent = parent; //Segment which this one is connected to
    if (typeof parent.children == "object") {
      parent.children.push(this);
    }
    this.children = []; //Segments connected to this segment
    this.size = size; //Distance from parent
    this.relAngle = angle; //Angle relative to parent
    this.defAngle = angle; //Default angle relative to parent
    this.absAngle = parent.absAngle + angle; //Angle relative to x-axis
    this.range = range; //Difference between maximum and minimum angles
    this.stiffness = stiffness; //How closely it conforms to default angle
    this.updateRelative(false, true);
  }
  updateRelative(iter, flex) {
    this.relAngle =
      this.relAngle -
      2 *
        Math.PI *
        Math.floor((this.relAngle - this.defAngle) / 2 / Math.PI + 1 / 2);
    if (flex) {
      //		this.relAngle=this.range/
      //				(1+Math.exp(-4*(this.relAngle-this.defAngle)/
      //				(this.stiffness*this.range)))
      //			  -this.range/2+this.defAngle;
      this.relAngle = Math.min(
        this.defAngle + this.range / 2,
        Math.max(
          this.defAngle - this.range / 2,
          (this.relAngle - this.defAngle) / this.stiffness + this.defAngle
        )
      );
    }
    this.absAngle = this.parent.absAngle + this.relAngle;
    this.x = this.parent.x + Math.cos(this.absAngle) * this.size; //Position
    this.y = this.parent.y + Math.sin(this.absAngle) * this.size; //Position
    if (iter) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].updateRelative(iter, flex);
      }
    }
  }
  draw(iter) {
    ctx.beginPath();
    ctx.moveTo(this.parent.x, this.parent.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    if (iter) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].draw(true);
      }
    }
  }
  follow(iter) {
    var x = this.parent.x;
    var y = this.parent.y;
    var dist = ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
    this.x = x + this.size * (this.x - x) / dist;
    this.y = y + this.size * (this.y - y) / dist;
    this.absAngle = Math.atan2(this.y - y, this.x - x);
    this.relAngle = this.absAngle - this.parent.absAngle;
    this.updateRelative(false, true);
    //this.draw();
    if (iter) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].follow(true);
      }
    }
  }
}
class LimbSystem {
  constructor(end, length, speed, creature) {
    this.end = end;
    this.length = Math.max(1, length);
    this.creature = creature;
    this.speed = speed;
    creature.systems.push(this);
    this.nodes = [];
    var node = end;
    for (var i = 0; i < length; i++) {
      this.nodes.unshift(node);
      //node.stiffness=1;
      node = node.parent;
      if (!node.isSegment) {
        this.length = i + 1;
        break;
      }
    }
    this.hip = this.nodes[0].parent;
  }
  moveTo(x, y) {
    this.nodes[0].updateRelative(true, true);
    var dist = ((x - this.end.x) ** 2 + (y - this.end.y) ** 2) ** 0.5;
    var len = Math.max(0, dist - this.speed);
    for (var i = this.nodes.length - 1; i >= 0; i--) {
      var node = this.nodes[i];
      var ang = Math.atan2(node.y - y, node.x - x);
      node.x = x + len * Math.cos(ang);
      node.y = y + len * Math.sin(ang);
      x = node.x;
      y = node.y;
      len = node.size;
    }
    for (var i = 0; i < this.nodes.length; i++) {
      var node = this.nodes[i];
      node.absAngle = Math.atan2(
        node.y - node.parent.y,
        node.x - node.parent.x
      );
      node.relAngle = node.absAngle - node.parent.absAngle;
      for (var ii = 0; ii < node.children.length; ii++) {
        var childNode = node.children[ii];
        if (!this.nodes.includes(childNode)) {
          childNode.updateRelative(true, false);
        }
      }
    }
    //this.nodes[0].updateRelative(true,false)
  }
  update() {
    this.moveTo(Input.mouse.x, Input.mouse.y);
  }
}
class LegSystem extends LimbSystem {
  constructor(end, length, speed, creature) {
    super(end, length, speed, creature);
    this.goalX = end.x;
    this.goalY = end.y;
    this.step = 0; //0 stand still, 1 move forward,2 move towards foothold
    this.forwardness = 0;

    //For foot goal placement
    this.reach =
      0.9 *
      ((this.end.x - this.hip.x) ** 2 + (this.end.y - this.hip.y) ** 2) ** 0.5;
    var relAngle =
      this.creature.absAngle -
      Math.atan2(this.end.y - this.hip.y, this.end.x - this.hip.x);
    relAngle -= 2 * Math.PI * Math.floor(relAngle / 2 / Math.PI + 1 / 2);
    this.swing = -relAngle + (2 * (relAngle < 0) - 1) * Math.PI / 2;
    this.swingOffset = this.creature.absAngle - this.hip.absAngle;
    //this.swing*=(2*(relAngle>0)-1);
  }
  update(x, y) {
    this.moveTo(this.goalX, this.goalY);
    //this.nodes[0].follow(true,true)
    if (this.step == 0) {
      var dist =
        ((this.end.x - this.goalX) ** 2 + (this.end.y - this.goalY) ** 2) **
        0.5;
      if (dist > 1) {
        this.step = 1;
        //this.goalX=x;
        //this.goalY=y;
        this.goalX =
          this.hip.x +
          this.reach *
            Math.cos(this.swing + this.hip.absAngle + this.swingOffset) +
          (2 * Math.random() - 1) * this.reach / 2;
        this.goalY =
          this.hip.y +
          this.reach *
            Math.sin(this.swing + this.hip.absAngle + this.swingOffset) +
          (2 * Math.random() - 1) * this.reach / 2;
      }
    } else if (this.step == 1) {
      var theta =
        Math.atan2(this.end.y - this.hip.y, this.end.x - this.hip.x) -
        this.hip.absAngle;
      var dist =
        ((this.end.x - this.hip.x) ** 2 + (this.end.y - this.hip.y) ** 2) **
        0.5;
      var forwardness2 = dist * Math.cos(theta);
      var dF = this.forwardness - forwardness2;
      this.forwardness = forwardness2;
      if (dF * dF < 1) {
        this.step = 0;
        this.goalX = this.hip.x + (this.end.x - this.hip.x);
        this.goalY = this.hip.y + (this.end.y - this.hip.y);
      }
    }
    //	ctx.strokeStyle='blue';
    //	ctx.beginPath();
    //	ctx.moveTo(this.end.x,this.end.y);
    //	ctx.lineTo(this.hip.x+this.reach*Math.cos(this.swing+this.hip.absAngle+this.swingOffset),
    //				this.hip.y+this.reach*Math.sin(this.swing+this.hip.absAngle+this.swingOffset));
    //	ctx.stroke();
    //	ctx.strokeStyle='black';
  }
}
class Creature {
  constructor(
    x,
    y,
    angle,
    fAccel,
    fFric,
    fRes,
    fThresh,
    rAccel,
    rFric,
    rRes,
    rThresh
  ) {
    this.x = x; //Starting position
    this.y = y;
    this.absAngle = angle; //Staring angle
    this.fSpeed = 0; //Forward speed
    this.fAccel = fAccel; //Force when moving forward
    this.fFric = fFric; //Friction against forward motion
    this.fRes = fRes; //Resistance to motion
    this.fThresh = fThresh; //minimum distance to target to keep moving forward
    this.rSpeed = 0; //Rotational speed
    this.rAccel = rAccel; //Force when rotating
    this.rFric = rFric; //Friction against rotation
    this.rRes = rRes; //Resistance to rotation
    this.rThresh = rThresh; //Maximum angle difference before rotation
    this.children = [];
    this.systems = [];
  }
  follow(x, y) {
    var dist = ((this.x - x) ** 2 + (this.y - y) ** 2) ** 0.5;
    var angle = Math.atan2(y - this.y, x - this.x);
    //Update forward
    var accel = this.fAccel;
    if (this.systems.length > 0) {
      var sum = 0;
      for (var i = 0; i < this.systems.length; i++) {
        sum += this.systems[i].step == 0;
      }
      accel *= sum / this.systems.length;
    }
    this.fSpeed += accel * (dist > this.fThresh);
    this.fSpeed *= 1 - this.fRes;
    this.speed = Math.max(0, this.fSpeed - this.fFric);
    //Update rotation
    var dif = this.absAngle - angle;
    dif -= 2 * Math.PI * Math.floor(dif / (2 * Math.PI) + 1 / 2);
    if (Math.abs(dif) > this.rThresh && dist > this.fThresh) {
      this.rSpeed -= this.rAccel * (2 * (dif > 0) - 1);
    }
    this.rSpeed *= 1 - this.rRes;
    if (Math.abs(this.rSpeed) > this.rFric) {
      this.rSpeed -= this.rFric * (2 * (this.rSpeed > 0) - 1);
    } else {
      this.rSpeed = 0;
    }

    //Update position
    this.absAngle += this.rSpeed;
    this.absAngle -=
      2 * Math.PI * Math.floor(this.absAngle / (2 * Math.PI) + 1 / 2);
    this.x += this.speed * Math.cos(this.absAngle);
    this.y += this.speed * Math.sin(this.absAngle);
    this.absAngle += Math.PI;
    for (var i = 0; i < this.children.length; i++) {
      this.children[i].follow(true, true);
    }
    for (var i = 0; i < this.systems.length; i++) {
      this.systems[i].update(x, y);
    }
    this.absAngle -= Math.PI;
    this.draw(true);
  }
  draw(iter) {
    var r = 4;
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      r,
      Math.PI / 4 + this.absAngle,
      7 * Math.PI / 4 + this.absAngle
    );
    ctx.moveTo(
      this.x + r * Math.cos(7 * Math.PI / 4 + this.absAngle),
      this.y + r * Math.sin(7 * Math.PI / 4 + this.absAngle)
    );
    ctx.lineTo(
      this.x + r * Math.cos(this.absAngle) * 2 ** 0.5,
      this.y + r * Math.sin(this.absAngle) * 2 ** 0.5
    );
    ctx.lineTo(
      this.x + r * Math.cos(Math.PI / 4 + this.absAngle),
      this.y + r * Math.sin(Math.PI / 4 + this.absAngle)
    );
    ctx.stroke();
    if (iter) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].draw(true);
      }
    }
  }
}
//Initializes and animates
var critter;

function setupSimple() {
  //(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
  var critter = new Creature(
    window.innerWidth / 2,
    window.innerHeight / 2,
    0,
    12,
    1,
    0.5,
    16,
    0.5,
    0.085,
    0.5,
    0.3
  );
  var node = critter;
  //(parent,size,angle,range,stiffness)
  for (var i = 0; i < 128; i++) {
    var node = new Segment(node, 8, 0, 3.14159 / 2, 1);
  }
  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    critter.follow(Input.mouse.x, Input.mouse.y);
  }, 33);
}

function setupTentacle() {
  //(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
  critter = new Creature(
    window.innerWidth / 2,
    window.innerHeight / 2,
    0,
    12,
    1,
    0.5,
    16,
    0.5,
    0.085,
    0.5,
    0.3
  );
  var node = critter;
  //(parent,size,angle,range,stiffness)
  for (var i = 0; i < 32; i++) {
    var node = new Segment(node, 8, 0, 2, 1);
  }
  //(end,length,speed,creature)
  var tentacle = new LimbSystem(node, 32, 8, critter);
  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    critter.follow(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.arc(Input.mouse.x, Input.mouse.y, 2, 0, 6.283);
    ctx.fill();
  }, 33);
}

function setupArm() {
  //(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
  var critter = new Creature(
    window.innerWidth / 2,
    window.innerHeight / 2,
    0,
    12,
    1,
    0.5,
    16,
    0.5,
    0.085,
    0.5,
    0.3
  );
  var node = critter;
  //(parent,size,angle,range,stiffness)
  for (var i = 0; i < 3; i++) {
    var node = new Segment(node, 80, 0, 3.1416, 1);
  }
  var tentacle = new LimbSystem(node, 3, critter);
  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    critter.follow(canvas.width / 2, canvas.height / 2);
  }, 33);
  ctx.beginPath();
  ctx.arc(Input.mouse.x, Input.mouse.y, 2, 0, 6.283);
  ctx.fill();
}

function setupTestSquid(size, legs) {
  //(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
  critter = new Creature(
    window.innerWidth / 2,
    window.innerHeight / 2,
    0,
    size * 10,
    size * 3,
    0.5,
    16,
    0.5,
    0.085,
    0.5,
    0.3
  );
  var legNum = legs;
  var jointNum = 32;
  for (var i = 0; i < legNum; i++) {
    var node = critter;
    var ang = Math.PI / 2 * (i / (legNum - 1) - 0.5);
    for (var ii = 0; ii < jointNum; ii++) {
      var node = new Segment(
        node,
        size * 64 / jointNum,
        ang * (ii == 0),
        3.1416,
        1.2
      );
    }
    //(end,length,speed,creature,dist)
    var leg = new LegSystem(node, jointNum, size * 30, critter);
  }
  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    critter.follow(Input.mouse.x, Input.mouse.y);
  }, 33);
}

function setupLizard(size, legs, tail) {
  var s = size;
  //(x,y,angle,fAccel,fFric,fRes,fThresh,rAccel,rFric,rRes,rThresh)
  critter = new Creature(
    window.innerWidth / 2,
    window.innerHeight / 2,
    0,
    s * 10,
    s * 2,
    0.5,
    16,
    0.5,
    0.085,
    0.5,
    0.3
  );
  var spinal = critter;
  //(parent,size,angle,range,stiffness)
  //Neck
  for (var i = 0; i < 6; i++) {
    spinal = new Segment(spinal, s * 4, 0, 3.1415 * 2 / 3, 1.1);
    for (var ii = -1; ii <= 1; ii += 2) {
      var node = new Segment(spinal, s * 3, ii, 0.1, 2);
      for (var iii = 0; iii < 3; iii++) {
        node = new Segment(node, s * 0.1, -ii * 0.1, 0.1, 2);
      }
    }
  }
  //Torso and legs
  for (var i = 0; i < legs; i++) {
    if (i > 0) {
      //Vertebrae and ribs
      for (var ii = 0; ii < 6; ii++) {
        spinal = new Segment(spinal, s * 4, 0, 1.571, 1.5);
        for (var iii = -1; iii <= 1; iii += 2) {
          var node = new Segment(spinal, s * 3, iii * 1.571, 0.1, 1.5);
          for (var iv = 0; iv < 3; iv++) {
            node = new Segment(node, s * 3, -iii * 0.3, 0.1, 2);
          }
        }
      }
    }
    //Legs and shoulders
    for (var ii = -1; ii <= 1; ii += 2) {
      var node = new Segment(spinal, s * 12, ii * 0.785, 0, 8); //Hip
      node = new Segment(node, s * 16, -ii * 0.785, 6.28, 1); //Humerus
      node = new Segment(node, s * 16, ii * 1.571, 3.1415, 2); //Forearm
      for (
        var iii = 0;
        iii < 4;
        iii++ //fingers
      ) {
        new Segment(node, s * 4, (iii / 3 - 0.5) * 1.571, 0.1, 4);
      }
      new LegSystem(node, 3, s * 12, critter, 4);
    }
  }
  //Tail
  for (var i = 0; i < tail; i++) {
    spinal = new Segment(spinal, s * 4, 0, 3.1415 * 2 / 3, 1.1);
    for (var ii = -1; ii <= 1; ii += 2) {
      var node = new Segment(spinal, s * 3, ii, 0.1, 2);
      for (var iii = 0; iii < 3; iii++) {
        node = new Segment(node, s * 3 * (tail - i) / tail, -ii * 0.1, 0.1, 2);
      }
    }
  }
  setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    critter.follow(Input.mouse.x, Input.mouse.y);
  }, 33);
}
//canvas.style.backgroundColor = "black";
ctx.strokeStyle = "#00FF00";
//setupSimple();//Just the very basic string
//setupTentacle();//Tentacle that reaches for mouse
//setupLizard(.5,100,128);//Literal centipede
//setupSquid(2,8);//Spidery thing
var legNum = Math.floor(1 + Math.random() * 12);
setupLizard(
  8 / Math.sqrt(legNum),
  legNum,
  Math.floor(4 + Math.random() * legNum * 8)
);

