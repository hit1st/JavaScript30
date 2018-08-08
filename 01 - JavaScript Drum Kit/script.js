const keysDiv = document.querySelector('.keys');
const keys = Array.from(document.querySelectorAll('.key'));

const highlight = (instrument) => {
  instrument.classList.add('playing');
  return window.setTimeout(() => instrument.classList.remove('playing'), 100);
}

const playSound = (dataKey) => {
  const audio = document.querySelector(`audio[data-key="${dataKey}"`);

  audio.currentTime = 0;
  return audio.play();
}

const playAndFlash = ({ dataKey, dataDiv }) => {
  playSound(dataKey);
  return highlight(dataDiv);
}

const clickInstrument = ({ target }) => {
  let instrument;

  if (target.classList.contains('key')) instrument = target;
  if (target.parentElement.classList.contains('key')) instrument = target.parentElement;
  if (!instrument) return;
  return playAndFlash({ dataKey: instrument.getAttribute('data-key'), dataDiv: instrument });
}

const keyInstrument = ({ keyCode }) => {
  const highlightKey = document.querySelector(`div[data-key="${keyCode}"`);

  if (!highlightKey) return;
  return playAndFlash({ dataKey: keyCode, dataDiv: highlightKey });
}

keysDiv.addEventListener('click', clickInstrument);
keys.forEach(key => addEventListener('keydown', keyInstrument));
