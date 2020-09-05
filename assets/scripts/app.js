const ATK = 10;
const CRIT_ATK = ATK * 2.5;
const MONSTER_ATK = 20;
const LAY_HANDS = 20;

let maxLife = 250;
let currentMonsterHealth = maxLife * 2;
let currentPlayerHealth = maxLife;
let hasBonusLife = true;

adjustHealthBars(maxLife);

function reset() {
  let currentMonsterHealth = maxLife * 2;
  let currentPlayerHealth = maxLife;
  resetGame(maxLife);
  hasBonusLife = true;
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATK);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert('Bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You both lost.');
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === 'ATK') {
    maxDamage = ATK;
  } else {
    maxDamage = CRIT_ATK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster('ATK');
}

function strongAttackHandler() {
  attackMonster('CRIT ATK');
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= maxLife - LAY_HANDS) {
    healValue = maxLife - currentPlayerHealth;
  } else {
    healValue = LAY_HANDS;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
