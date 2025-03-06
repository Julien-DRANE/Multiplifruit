/***** Initialisation des sons *****/
const dingSound = new Audio('sounds/ding.mp3');
dingSound.volume = 0.3; // Faible volume pour le ding

const ambianceSound = new Audio('sounds/ambiance.mp3');
ambianceSound.volume = 0.2; // Faible volume pour l'ambiance
ambianceSound.loop = true;

const winSound = new Audio('sounds/win.mp3');
winSound.volume = 0.3; // Volume pour le son win

// Démarrer le fond sonore dès la première interaction de l'utilisateur
function startAmbiance() {
  if (ambianceSound.paused) {
    ambianceSound.play().catch(err => console.log(err));
  }
  document.removeEventListener('click', startAmbiance);
}
document.addEventListener('click', startAmbiance);

/***** Variables et initialisation du jeu *****/
let factor1, factor2, targetValue;
const slotValues = [null, null];
let score = 0;
let selectedTable = null; // Pour le mode table

// Variables pour gérer les opérations
let lastOperation = { factor1: null, factor2: null };  // Permet d'éviter la répétition consécutive
let failedQueue = []; // File des opérations erronées à retester

const targetElement = document.getElementById('target');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const digitsContainer = document.getElementById('digits-container');
const fruitContainer = document.getElementById('fruit-container');
const basin = document.getElementById('basin');
const scoreElement = document.getElementById('score');
const scoreboard = document.getElementById('scoreboard');
const solutionContainer = document.getElementById('solution');
const tableSelector = document.getElementById('table-selector');

/*
  Fonction d'initialisation du jeu.
  - Décrémente le compteur des opérations ratées.
  - Si une opération ratée est prête (compteur <= 0), on la réutilise.
  - Sinon, on génère une nouvelle opération en évitant de répéter la précédente.
*/
function initGame() {
  // Décrémenter le compteur pour chaque opération ratée
  for (let op of failedQueue) {
    op.retryCounter--;
  }

  // Vérifier si une opération ratée est prête à être retestée (retryCounter <= 0)
  let retestOpIndex = failedQueue.findIndex(op => op.retryCounter <= 0);
  if (retestOpIndex !== -1) {
    // Utiliser cette opération et la retirer de la file
    let op = failedQueue.splice(retestOpIndex, 1)[0];
    factor1 = op.factor1;
    factor2 = op.factor2;
    targetValue = factor1 * factor2;
  } else {
    // Génération d'une nouvelle opération en évitant la répétition de la dernière
    if (selectedTable !== null) {
      let newFactor2;
      do {
        newFactor2 = Math.floor(Math.random() * 9) + 2; // entre 2 et 10
      } while (selectedTable === lastOperation.factor1 && newFactor2 === lastOperation.factor2);
      factor1 = selectedTable;
      factor2 = newFactor2;
      targetValue = factor1 * factor2;
    } else {
      let newFactor1, newFactor2, newTarget;
      do {
        newFactor1 = Math.floor(Math.random() * 9) + 2; // entre 2 et 10
        newFactor2 = Math.floor(Math.random() * 9) + 2; // entre 2 et 10
        newTarget = newFactor1 * newFactor2;
      } while (newTarget <= 10 || (newFactor1 === lastOperation.factor1 && newFactor2 === lastOperation.factor2));
      factor1 = newFactor1;
      factor2 = newFactor2;
      targetValue = newTarget;
    }
  }
  
  // Mettre à jour la dernière opération proposée
  lastOperation = { factor1: factor1, factor2: factor2 };

  targetElement.textContent = targetValue;
  // Réinitialiser les emplacements de l'opération
  slot1.textContent = '';
  slot2.textContent = '';
  slotValues[0] = null;
  slotValues[1] = null;
  solutionContainer.innerHTML = '';
}

/*
  Création des éléments chiffres de 2 à 10.
  Les événements sont ajoutés selon le support tactile ou non.
*/
function createDigits() {
  digitsContainer.innerHTML = ''; // Réinitialise la palette
  for (let i = 2; i <= 10; i++) {
    const digit = document.createElement('div');
    digit.classList.add('digit');
    digit.textContent = i;
    digit.setAttribute('draggable', 'true');
    // Glisser-déposer (desktop)
    digit.addEventListener('dragstart', dragStart);
    // Si l'appareil supporte les événements tactiles, utiliser touchstart et touchend
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      digit.addEventListener('touchstart', touchStart, {passive: false});
      digit.addEventListener('touchend', onDigitClick);
    } else {
      // Sinon, utiliser l'événement click
      digit.addEventListener('click', onDigitClick);
    }
    digitsContainer.appendChild(digit);
  }
}

/*
  Fonction appelée lors d'un clic/tap sur un chiffre.
  Le chiffre est ajouté dans le premier emplacement vide de l'opération.
*/
function onDigitClick(e) {
  const value = e.target.textContent;
  if (slotValues[0] === null) {
    slot1.textContent = value;
    slotValues[0] = parseInt(value);
  } else if (slotValues[1] === null) {
    slot2.textContent = value;
    slotValues[1] = parseInt(value);
  }
  if (slotValues[0] !== null && slotValues[1] !== null) {
    checkOperation();
  }
}

/***** Gestion du Drag and Drop pour desktop *****/
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.textContent);
}

// Ajout des événements de drop sur les emplacements
function addDropEvents(slot) {
  slot.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    const value = e.dataTransfer.getData('text/plain');
    slot.textContent = value;
    slot.dataset.value = value;
    const index = slot.getAttribute('data-index');
    slotValues[index] = parseInt(value);
    checkOperation();
  });
  // Permet de réinitialiser le slot par un clic
  slot.addEventListener('click', () => {
    slot.textContent = '';
    slotValues[slot.getAttribute('data-index')] = null;
  });
}
addDropEvents(slot1);
addDropEvents(slot2);

/***** Gestion du Drag & Drop pour mobile via les événements tactiles *****/
let touchItem = null;
function touchStart(e) {
  e.preventDefault();
  touchItem = e.target;
  touchItem.style.opacity = '0.5';
  document.addEventListener('touchmove', touchMove, {passive: false});
  document.addEventListener('touchend', touchEnd);
}
function touchMove(e) {
  e.preventDefault();
  if (!touchItem) return;
  const touch = e.touches[0];
  if (!touchItem.clone) {
    touchItem.clone = touchItem.cloneNode(true);
    touchItem.clone.style.position = 'absolute';
    touchItem.clone.style.pointerEvents = 'none';
    document.body.appendChild(touchItem.clone);
  }
  touchItem.clone.style.left = (touch.pageX - touchItem.offsetWidth / 2) + 'px';
  touchItem.clone.style.top = (touch.pageY - touchItem.offsetHeight / 2) + 'px';
}
function touchEnd(e) {
  if (touchItem && touchItem.clone) {
    const touch = e.changedTouches[0];
    const droppedElem = document.elementFromPoint(touch.clientX, touch.clientY);
    if (droppedElem && droppedElem.classList.contains('slot')) {
      const value = touchItem.textContent;
      droppedElem.textContent = value;
      droppedElem.dataset.value = value;
      const index = droppedElem.getAttribute('data-index');
      slotValues[index] = parseInt(value);
      checkOperation();
    }
    if (touchItem.clone && touchItem.clone.parentNode) {
      touchItem.clone.parentNode.removeChild(touchItem.clone);
    }
    touchItem.style.opacity = '1';
  }
  touchItem = null;
  document.removeEventListener('touchmove', touchMove);
  document.removeEventListener('touchend', touchEnd);
}

/*
  Vérification de l'opération.
  Si l'utilisateur se trompe, on ajoute l'opération dans la file de retest avec un délai aléatoire de 2 ou 3 opérations.
*/
function checkOperation() {
  if (slotValues[0] !== null && slotValues[1] !== null) {
    if (slotValues[0] * slotValues[1] === targetValue) {
      // Bonne réponse
      score++;
      scoreElement.textContent = "Score : " + score;
      dingSound.play();
      setTimeout(triggerFruitAnimation, 300);
      
      if (score === 10) {
        winSound.play();
        triggerWinAnimation();
        setTimeout(showScoreboard, 1000);
        return; // Fin de la partie
      }
      
      setTimeout(initGame, 2000);
    } else {
      // Réponse incorrecte : baisse de score d'un point (min 0)
      score = Math.max(score - 1, 0);
      scoreElement.textContent = "Score : " + score;
      solutionContainer.innerHTML = `<strong>La solution était : ${factor1} x ${factor2} = ${targetValue}</strong>`;
      
      // Ajouter l'opération ratée dans la file de retest avec un délai de 2 ou 3 opérations
      let retryDelay = Math.floor(Math.random() * 2) + 2; // 2 ou 3
      failedQueue.push({ factor1: factor1, factor2: factor2, retryCounter: retryDelay });
      
      setTimeout(initGame, 2000);
    }
  }
}

/***** Animation des fruits avec sons pop aléatoires *****/
function triggerFruitAnimation() {
  const popSounds = ['sounds/b1.mp3', 'sounds/b2.mp3', 'sounds/b3.mp3', 'sounds/b4.mp3'];
  const numFruits = 5;
  
  for (let i = 0; i < numFruits; i++) {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    const fruitEmojis = ['🍎', '🍌', '🍇', '🍒', '🍍'];
    fruit.textContent = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
    fruit.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    fruit.style.animationDelay = Math.random() + 's';
    // Forcer l'animation de chute
    fruit.style.animation = 'fall 2s linear forwards';
    fruitContainer.appendChild(fruit);
    
    // Jouer un son pop aléatoire après un délai aléatoire
    const randomDelay = Math.random() * 1000;
    setTimeout(() => {
      const randomSoundIndex = Math.floor(Math.random() * popSounds.length);
      const popSound = new Audio(popSounds[randomSoundIndex]);
      popSound.volume = 0.3;
      popSound.play().catch(error => console.log("Erreur de lecture du son pop :", error));
    }, randomDelay);
    
    // Quand l'animation se termine, transférer le fruit dans la bassine
    fruit.addEventListener('animationend', () => {
      fruit.style.animation = 'none';
      fruit.style.top = 'auto';
      fruit.style.bottom = '0';
      fruit.style.left = Math.random() * (basin.offsetWidth - 30) + 'px';
      basin.appendChild(fruit);
    });
  }
}

/***** Animation de victoire : confettis partout sur l'écran *****/
function triggerWinAnimation() {
  const numberOfConfetti = 150;
  for (let i = 0; i < numberOfConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    const colors = ['#FF0', '#0F0', '#0FF', '#F0F', '#00F', '#F00'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = Math.random() * 100 + '%';
    document.body.appendChild(confetti);
    confetti.addEventListener('animationend', () => {
      confetti.remove();
    });
  }
}

/***** Affichage du tableau des scores et proposition de recommencer *****/
function showScoreboard() {
  scoreboard.style.display = 'block';
  scoreboard.innerHTML = `
    <h2>Bravo ! Vous avez atteint 10 points !</h2>
    <p>Cible : 10 points</p>
    <button id="restartButton">Recommencer la partie</button>
  `;
  document.getElementById('restartButton').addEventListener('click', restartGame);
}

/***** Recommencer la partie *****/
function restartGame() {
  score = 0;
  scoreElement.textContent = "Score : " + score;
  scoreboard.style.display = 'none';
  basin.innerHTML = '';
  fruitContainer.innerHTML = '';
  initGame();
}

/***** Gestion du mode TABLES : sélection de la table à réviser *****/
function initTableMode() {
  const buttons = document.querySelectorAll('.table-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      selectedTable = parseInt(button.dataset.table);
      tableSelector.style.display = 'none';
      document.getElementById('mode-indicator').textContent = `Mode Table de ${selectedTable}`;
      initGame();
    });
  });
}

// Lancement initial du mode TABLES, du jeu et de la création de la palette de chiffres
initTableMode();
initGame();
createDigits();
