const ATK = 10;
const CRIT_ATK = ATK * 2.5;
const MONSTER_ATK = 20;

let maxLife = 250;
let currentMonsterHealth = maxLife * 2;
let currentPlayerHealth = maxLife;

adjustHealthBars(maxLife);

function attackHandler() {
  const damage = dealMonsterDamage(ATK);
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

function strongAttackHandler() {
  const damage = dealMonsterDamage(CRIT_ATK);
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

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
