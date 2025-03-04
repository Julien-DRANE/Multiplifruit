/***** Initialisation des sons *****/
const dingSound = new Audio('sounds/ding.mp3');
dingSound.volume = 0.1; // Faible volume pour le ding

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

const targetElement = document.getElementById('target');
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const digitsContainer = document.getElementById('digits-container');
const fruitContainer = document.getElementById('fruit-container');
const basin = document.getElementById('basin');
const scoreElement = document.getElementById('score');
const scoreboard = document.getElementById('scoreboard');
const solutionContainer = document.getElementById('solution'); // Conteneur pour la solution

/*
  La fonction initGame génère deux facteurs compris entre 2 et 10
  et s'assure que leur produit (la cible) est supérieur à 10.
*/
function initGame() {
  do {
    factor1 = Math.floor(Math.random() * 9) + 2; // Valeur entre 2 et 10
    factor2 = Math.floor(Math.random() * 9) + 2; // Valeur entre 2 et 10
    targetValue = factor1 * factor2;
  } while (targetValue <= 10);
  
  targetElement.textContent = targetValue;
  // Réinitialiser les emplacements de l'opération
  slot1.textContent = '';
  slot2.textContent = '';
  slotValues[0] = null;
  slotValues[1] = null;
  // Nettoyer la solution affichée
  solutionContainer.innerHTML = '';
}

/*
  Création des éléments chiffres de 2 à 10 (on oublie le chiffre 1).
*/
function createDigits() {
  for (let i = 2; i <= 10; i++) {
    const digit = document.createElement('div');
    digit.classList.add('digit');
    digit.textContent = i;
    digit.setAttribute('draggable', 'true');
    // Événements pour le drag and drop (desktop)
    digit.addEventListener('dragstart', dragStart);
    // Événements pour le tactile (smartphone)
    digit.addEventListener('touchstart', touchStart, {passive: false});
    digitsContainer.appendChild(digit);
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
  // Créer un clone flottant pour visualiser le déplacement
  if (!touchItem.clone) {
    touchItem.clone = touchItem.cloneNode(true);
    touchItem.clone.style.position = 'absolute';
    touchItem.clone.style.pointerEvents = 'none';
    document.body.appendChild(touchItem.clone);
  }
  touchItem.clone.style.left = (touch.pageX - touchItem.offsetWidth/2) + 'px';
  touchItem.clone.style.top = (touch.pageY - touchItem.offsetHeight/2) + 'px';
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

/***** Vérification de l'opération *****/
function checkOperation() {
  if (slotValues[0] !== null && slotValues[1] !== null) {
    if (slotValues[0] * slotValues[1] === targetValue) {
      // Bonne réponse
      score++;
      scoreElement.textContent = "Score : " + score;
      dingSound.play();
      // Lancer l'animation des fruits après un léger délai
      setTimeout(triggerFruitAnimation, 300);
      
      // Si le score atteint 10, déclencher la victoire
      if (score === 10) {
        winSound.play();
        triggerWinAnimation();
        setTimeout(showScoreboard, 1000);
        return; // Fin de la partie
      }
      
      // Lancer une nouvelle opération après un délai
      setTimeout(initGame, 2000);
    } else {
      // Réponse incorrecte : le score baisse d'un point (mais pas en dessous de 0)
      score = Math.max(score - 1, 0);
      scoreElement.textContent = "Score : " + score;
      
      // Afficher la solution en gras sous les chiffres
      solutionContainer.innerHTML = `<strong>La solution était : ${factor1} x ${factor2} = ${targetValue}</strong>`;
      
      // Lancer une nouvelle opération après un délai pour permettre de lire la solution
      setTimeout(initGame, 2000);
    }
  }
}

/***** Animation des fruits avec sons pop aléatoires et délais aléatoires *****/
function triggerFruitAnimation() {
  const popSounds = ['sounds/b1.mp3', 'sounds/b2.mp3', 'sounds/b3.mp3', 'sounds/b4.mp3'];
  const numFruits = 5;
  
  for (let i = 0; i < numFruits; i++) {
    const fruit = document.createElement('div');
    fruit.classList.add('fruit');
    const fruitEmojis = ['🍎', '🍌', '🍇', '🍒', '🍍'];
    fruit.textContent = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
    // Positionnement pour créer une grappe
    fruit.style.left = Math.random() * (window.innerWidth - 50) + 'px';
    fruit.style.animationDelay = Math.random() + 's';
    fruitContainer.appendChild(fruit);
    
    // Jouer un son pop choisi aléatoirement avec un délai aléatoire pour chaque fruit
    const randomDelay = Math.random() * 1000; // entre 0 et 1000 ms
    setTimeout(() => {
      const randomSoundIndex = Math.floor(Math.random() * popSounds.length);
      const popSound = new Audio(popSounds[randomSoundIndex]);
      popSound.volume = 0.3;
      popSound.play().catch(error => console.log("Erreur de lecture du son pop :", error));
    }, randomDelay);
    
    // Au terme de l'animation, transférer le fruit dans la bassine
    fruit.addEventListener('animationend', () => {
      fruit.style.animation = 'none';
      fruit.style.top = 'auto';
      fruit.style.bottom = '0';
      fruit.style.left = Math.random() * (basin.offsetWidth - 30) + 'px';
      basin.appendChild(fruit);
    });
  }
}

/***** Animation de victoire : confettis qui jaillissent de partout *****/
function triggerWinAnimation() {
  const numberOfConfetti = 150; // Nombre de confettis pour remplir l'écran
  for (let i = 0; i < numberOfConfetti; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    // Choix aléatoire d'une couleur
    const colors = ['#FF0', '#0F0', '#0FF', '#F0F', '#00F', '#F00'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    // Positionnement aléatoire sur toute la surface de l'écran
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = Math.random() * 100 + '%';
    // Ajout au body pour couvrir tout l'écran
    document.body.appendChild(confetti);
    // Suppression du confetti une fois l'animation terminée
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
  // Optionnel : réinitialiser le contenu des autres zones
  basin.innerHTML = '';
  fruitContainer.innerHTML = '';
  initGame();
}

/***** Lancement du jeu *****/
initGame();
createDigits();
