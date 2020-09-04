const ATK = 10;
const CRIT_ATK = ATK * 2.5;
const MONSTER_ATK = 20;

let maxLife = 250;
let currentMonsterHealth = maxLife * 2;
let currentPlayerHealth = maxLife;

adjustHealthBars(maxLife);

function attackMonster(mode) {
  let maxDamage;
  if (mode === 'ATK') {
    maxDamage = ATK;
  } else {
    maxDamage = CRIT_ATK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  const playerDamage = dealPlayerDamage(MONSTER_ATK);
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You both lost.');
  }
}

function attackHandler() {
  attackMonster('ATK');
}

function strongAttackHandler() {
  attackMonster('CRIT ATK');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
