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

// Variables pour gérer les modes
// gameMode peut être "random", "inverse" ou "classic"
let gameMode = "random";

// En mode inversé, on cache un facteur et on attend la réponse dans le slot correspondant.
let missingFactor; // le facteur à deviner
let hideIndex;    // 0 ou 1 : quel slot doit être complété

// En mode classique, l’équation est affichée sous forme "3 x 3 = ?" et la réponse (le produit) est saisie
let classicAnswer = ""; // Chaîne qui stocke la réponse en mode classique

// Variables pour éviter la répétition consécutive et pour gérer les opérations erronées
// Chaque opération ratée est stockée avec un compteur (retryCounter) et le mode auquel elle appartient.
let lastOperation = { factor1: null, factor2: null, hideIndex: null, mode: null };
let failedQueue = [];

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
  Pour chaque opération ratée correspondant au mode courant, on décrémente son compteur.
  Si une opération est prête (retryCounter <= 0), on la réintroduit.
  Sinon, on génère une nouvelle opération en évitant de répéter la précédente.
  
  Chaque mode gère l’affichage de l’équation différemment.
*/
function initGame() {
  // Réinitialisation des slots et variables spécifiques selon le mode
  slot1.textContent = '';
  slot2.textContent = '';
  slotValues[0] = null;
  slotValues[1] = null;
  solutionContainer.innerHTML = '';

  if (gameMode === "classic") {
    classicAnswer = "";
  }

  // Décrémenter le compteur des opérations ratées correspondant au mode courant
  for (let op of failedQueue) {
    if (op.mode === gameMode) {
      op.retryCounter--;
    }
  }
  let retestOpIndex = failedQueue.findIndex(op => op.retryCounter <= 0 && op.mode === gameMode);
  
  if (retestOpIndex !== -1) {
    // Réutilisation d'une opération ratée
    let op = failedQueue.splice(retestOpIndex, 1)[0];
    factor1 = op.factor1;
    factor2 = op.factor2;
    targetValue = factor1 * factor2;
    
    if (gameMode === "random") {
      targetElement.textContent = targetValue;
      // Les deux slots restent vides pour la réponse
    } else if (gameMode === "inverse") {
      missingFactor = op.missingFactor;
      hideIndex = op.hideIndex;
      if (hideIndex === 0) {
        slot1.textContent = '';
        slotValues[0] = null;
        slot2.textContent = factor2;
        slotValues[1] = factor2;
        targetElement.textContent = `? x ${factor2} = ${targetValue}`;
      } else {
        slot1.textContent = factor1;
        slotValues[0] = factor1;
        slot2.textContent = '';
        slotValues[1] = null;
        targetElement.textContent = `${factor1} x ? = ${targetValue}`;
      }
    } else if (gameMode === "classic") {
      // Afficher l'équation avec les facteurs et un espace pour la réponse
      targetElement.innerHTML = `${factor1} x ${factor2} = <span id="answer-display">?</span>`;
    }
    lastOperation = { factor1, factor2, hideIndex: (gameMode === "inverse" ? hideIndex : null), mode: gameMode };
  } else {
    // Génération d'une nouvelle opération en évitant la répétition de la précédente
    if (selectedTable !== null) {
      // Si une table est fixée, le premier facteur est imposé.
      factor1 = selectedTable;
      factor2 = Math.floor(Math.random() * 9) + 2; // entre 2 et 10
    } else {
      factor1 = Math.floor(Math.random() * 9) + 2;
      factor2 = Math.floor(Math.random() * 9) + 2;
    }
    targetValue = factor1 * factor2;
    
    if (gameMode === "random") {
      // Mode aléatoire : l’utilisateur doit reconstituer les deux facteurs
      // On évite la répétition de la précédente opération
      while (lastOperation.mode === "random" &&
             factor1 === lastOperation.factor1 &&
             factor2 === lastOperation.factor2) {
        factor1 = (selectedTable !== null) ? selectedTable : Math.floor(Math.random() * 9) + 2;
        factor2 = Math.floor(Math.random() * 9) + 2;
        targetValue = factor1 * factor2;
      }
      targetElement.textContent = targetValue;
    } else if (gameMode === "inverse") {
      // Mode inversé : on masque aléatoirement l’un des deux facteurs
      while (lastOperation.mode === "inverse" &&
             factor1 === lastOperation.factor1 &&
             factor2 === lastOperation.factor2) {
        factor1 = (selectedTable !== null) ? selectedTable : Math.floor(Math.random() * 9) + 2;
        factor2 = Math.floor(Math.random() * 9) + 2;
        targetValue = factor1 * factor2;
      }
      // Choisir aléatoirement lequel masquer (0 = masquer factor1, 1 = masquer factor2)
      hideIndex = Math.floor(Math.random() * 2);
      if (hideIndex === 0) {
        missingFactor = factor1;
        slot1.textContent = '';     // Réponse attendue ici
        slotValues[0] = null;
        slot2.textContent = factor2;
        slotValues[1] = factor2;
        targetElement.textContent = `? x ${factor2} = ${targetValue}`;
      } else {
        missingFactor = factor2;
        slot1.textContent = factor1;
        slotValues[0] = factor1;
        slot2.textContent = '';      // Réponse attendue ici
        slotValues[1] = null;
        targetElement.textContent = `${factor1} x ? = ${targetValue}`;
      }
    } else if (gameMode === "classic") {
      // Mode classique : les deux facteurs sont affichés et l’utilisateur doit saisir le produit.
      while (lastOperation.mode === "classic" &&
             factor1 === lastOperation.factor1 &&
             factor2 === lastOperation.factor2) {
        factor1 = (selectedTable !== null) ? selectedTable : Math.floor(Math.random() * 9) + 2;
        factor2 = Math.floor(Math.random() * 9) + 2;
        targetValue = factor1 * factor2;
      }
      targetElement.innerHTML = `${factor1} x ${factor2} = <span id="answer-display">?</span>`;
      // On peut laisser les slots vides (ils ne sont pas utilisés en mode classique)
    }
    lastOperation = { factor1, factor2, hideIndex: (gameMode === "inverse" ? hideIndex : null), mode: gameMode };
  }
}

/*
  Création des éléments chiffres de 2 à 10.
  Les événements sont ajoutés en fonction du support tactile.
*/
function createDigits() {
  digitsContainer.innerHTML = ''; // Réinitialise la palette
  for (let i = 2; i <= 10; i++) {
    const digit = document.createElement('div');
    digit.classList.add('digit');
    digit.textContent = i;
    digit.setAttribute('draggable', 'true');
    digit.addEventListener('dragstart', dragStart);
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      digit.addEventListener('touchstart', touchStart, {passive: false});
      digit.addEventListener('touchend', onDigitClick);
    } else {
      digit.addEventListener('click', onDigitClick);
    }
    digitsContainer.appendChild(digit);
  }
}

/*
  Fonction appelée lors d'un clic/tap sur un chiffre.
  Le comportement diffère selon le mode de jeu.
*/
function onDigitClick(e) {
  const value = e.target.textContent;
  
  if (gameMode === "classic") {
    // En mode classique, la réponse (le produit) est saisie directement
    let answerDisplay = document.getElementById('answer-display');
    if (!classicAnswer || answerDisplay.textContent === "?") {
      classicAnswer = value;
    } else {
      classicAnswer += value;
    }
    answerDisplay.textContent = classicAnswer;
  } else if (gameMode === "inverse") {
    // En mode inversé, seule la case correspondant au facteur manquant est concernée
    if (hideIndex === 0 && slotValues[0] === null) {
      slot1.textContent = value;
      slotValues[0] = parseInt(value);
    } else if (hideIndex === 1 && slotValues[1] === null) {
      slot2.textContent = value;
      slotValues[1] = parseInt(value);
    }
  } else {
    // En mode random, on complète les deux slots dans l'ordre
    if (slotValues[0] === null) {
      slot1.textContent = value;
      slotValues[0] = parseInt(value);
    } else if (slotValues[1] === null) {
      slot2.textContent = value;
      slotValues[1] = parseInt(value);
    }
  }
  checkOperation();
}

/***** Gestion du Drag and Drop pour desktop *****/
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.textContent);
}

function addDropEvents(slot) {
  slot.addEventListener('dragover', (e) => { e.preventDefault(); });
  slot.addEventListener('drop', (e) => {
    e.preventDefault();
    const value = e.dataTransfer.getData('text/plain');
    slot.textContent = value;
    slot.dataset.value = value;
    const index = slot.getAttribute('data-index');
    slotValues[index] = parseInt(value);
    checkOperation();
  });
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
  Vérification de l'opération en fonction du mode.
  En mode random, on compare le produit des deux slots avec la cible.
  En mode inverse, on vérifie que le chiffre saisi dans le slot vide correspond au facteur manquant.
  En mode classique, on attend que la saisie ait la même longueur que le résultat attendu,
  puis on compare la réponse saisie avec le produit.
  
  En cas d'erreur, l'opération est ajoutée dans la file failedQueue avec un délai de 2 ou 3 manches.
*/
function checkOperation() {
  if (gameMode === "classic") {
    // On attend que l'utilisateur ait saisi un nombre de chiffres suffisant
    let expected = targetValue.toString();
    if (classicAnswer && classicAnswer.length === expected.length) {
      if (classicAnswer === expected) {
        score++;
        scoreElement.textContent = "Score : " + score;
        dingSound.play();
        setTimeout(triggerFruitAnimation, 300);
        if (score === 10) {
          winSound.play();
          triggerWinAnimation();
          setTimeout(showScoreboard, 1000);
          return;
        }
        setTimeout(initGame, 2000);
      } else {
        score = Math.max(score - 1, 0);
        scoreElement.textContent = "Score : " + score;
        solutionContainer.innerHTML = `<strong>La solution était : ${targetValue}</strong>`;
        let retryDelay = Math.floor(Math.random() * 2) + 2;
        failedQueue.push({ factor1, factor2, retryCounter: retryDelay, mode: gameMode });
        setTimeout(initGame, 2000);
      }
    }
  } else if (gameMode === "inverse") {
    if ((hideIndex === 0 && slotValues[0] !== null) ||
        (hideIndex === 1 && slotValues[1] !== null)) {
      let userAnswer = (hideIndex === 0 ? slotValues[0] : slotValues[1]);
      if (userAnswer === missingFactor) {
        score++;
        scoreElement.textContent = "Score : " + score;
        dingSound.play();
        setTimeout(triggerFruitAnimation, 300);
        if (score === 10) {
          winSound.play();
          triggerWinAnimation();
          setTimeout(showScoreboard, 1000);
          return;
        }
        setTimeout(initGame, 2000);
      } else {
        score = Math.max(score - 1, 0);
        scoreElement.textContent = "Score : " + score;
        solutionContainer.innerHTML = `<strong>La solution était : ${missingFactor}</strong>`;
        let retryDelay = Math.floor(Math.random() * 2) + 2;
        failedQueue.push({ factor1, factor2, missingFactor, hideIndex, retryCounter: retryDelay, mode: gameMode });
        setTimeout(initGame, 2000);
      }
    }
  } else { // Mode random
    if (slotValues[0] !== null && slotValues[1] !== null) {
      if (slotValues[0] * slotValues[1] === targetValue) {
        score++;
        scoreElement.textContent = "Score : " + score;
        dingSound.play();
        setTimeout(triggerFruitAnimation, 300);
        if (score === 10) {
          winSound.play();
          triggerWinAnimation();
          setTimeout(showScoreboard, 1000);
          return;
        }
        setTimeout(initGame, 2000);
      } else {
        score = Math.max(score - 1, 0);
        scoreElement.textContent = "Score : " + score;
        solutionContainer.innerHTML = `<strong>La solution était : ${factor1} x ${factor2} = ${targetValue}</strong>`;
        let retryDelay = Math.floor(Math.random() * 2) + 2;
        failedQueue.push({ factor1, factor2, retryCounter: retryDelay, mode: gameMode });
        setTimeout(initGame, 2000);
      }
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
    fruit.style.animation = 'fall 2s linear forwards';
    fruitContainer.appendChild(fruit);
    
    const randomDelay = Math.random() * 1000;
    setTimeout(() => {
      const randomSoundIndex = Math.floor(Math.random() * popSounds.length);
      const popSound = new Audio(popSounds[randomSoundIndex]);
      popSound.volume = 0.3;
      popSound.play().catch(error => console.log("Erreur de lecture du son pop :", error));
    }, randomDelay);
    
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

/***** Gestion de la sélection du mode de jeu *****/
// Les boutons de sélection de mode sont définis dans index.html.
document.getElementById('random-mode').addEventListener('click', () => {
  gameMode = "random";
  selectedTable = null;
  tableSelector.style.display = 'none';
  document.getElementById('mode-indicator').textContent = "Mode aléatoire";
  initGame();
});
document.getElementById('inverse-mode').addEventListener('click', () => {
  gameMode = "inverse";
  selectedTable = null;
  tableSelector.style.display = 'none';
  document.getElementById('mode-indicator').textContent = "Mode inversé";
  initGame();
});
document.getElementById('classic-mode').addEventListener('click', () => {
  gameMode = "classic";
  selectedTable = null;
  tableSelector.style.display = 'none';
  document.getElementById('mode-indicator').textContent = "Mode classique";
  initGame();
});

// Lancement initial
initTableMode();
initGame();
createDigits();
