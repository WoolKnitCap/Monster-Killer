const ATK = 10;
const CRIT_ATK = ATK * 2.5;
const MONSTER_ATK = 20;
const LAY_HANDS = 20;

const MODE_ATK = 'ATK';
const MODE_CRIT_ATK = 'CRIT ATK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER STRONG ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER HEAL';
const LOG_EVENT_GAME_OVER = 'GAME OVER';

let battleLog = [];

function getMaxLifeValues() {
  const pcValue = prompt("Player's max HP?", '100');

  const parsedValue = parseInt(pcValue);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: 'Invalid user input.' };
  }
  return parsedValue;
}

let maxLife;

try {
  maxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  maxLife = 100;
}

let currentMonsterHealth = maxLife * 2;
let currentPlayerHealth = maxLife;
let hasBonusLife = true;

adjustHealthBars(maxLife);

function writeLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  switch (event) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
    default:
      logEntry = {};
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = maxLife * 2;
  currentPlayerHealth = maxLife;
  resetGame(maxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATK);
  currentPlayerHealth -= playerDamage;
  writeLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(currentPlayerHealth);
    alert('Bonus life saved you!');
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!');
    writeLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You Lost!');
    writeLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('You both lost.');
    writeLog(
      LOG_EVENT_GAME_OVER,
      'DRAW',
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  const maxDamage = mode === MODE_ATK ? ATK : CRIT_ATK;
  const logEvent =
    mode === MODE_ATK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
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
  writeLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < battleLog.length; i++) {
    console.log(battleLog[i]);
  }
  let i = 1;
  for (const logEntry of battleLog) {
    console.log(`#${i}`);
    for (const key in logEntry) {
      console.log(`${key}: ${logEntry[key]}`);
    }
    i++;
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
