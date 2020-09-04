const ATK = 10;

let maxLife = 100;
let currentMonsterHealth = maxLife * 2;
let currentPlayerHealth = maxLife;

adjustHealthBars(maxLife);

function attackHandler() {
  const damage = dealMonsterDamage(ATK);
  currentMonsterHealth -= damage;
}

attackBtn.addEventListener('click', attackHandler);
