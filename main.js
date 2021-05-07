const inp = document.getElementById("input-cif");
const out = document.getElementById("output-cif");

let keys = {
  pub1: 0,
  pub2: 0,
  priv: 0,
};

let partInp = document.getElementById("in-part");

function initEvents() {
  document.getElementById("init-keys").addEventListener("click", () => {
    saveKeys();
  });
  partInp.addEventListener("input", (e) => {
    setPartial(Number(e.target.value));
  });
  document.getElementById("translate").addEventListener("click", () => {
    crypt();
  });
  inp.addEventListener("input", () => {
    crypt();
  });
  document.getElementById("revert").addEventListener("click", () => {
    revertMode();
  });
}

let cryptor = {};
function saveKeys() {
  keys.pub1 = Number(document.getElementById("in-pub1").value);
  keys.pub2 = Number(document.getElementById("in-pub2").value);
  keys.priv = Number(document.getElementById("in-priv").value);

  cryptor = new DifHel(keys);
  document.getElementById("out-part").innerHTML = cryptor.generatePartialKey();
  if (partInp.value) setPartial(Number(partInp.value));
  updateState();
}

function setPartial(val) {
  if (cryptor == {}) return;
  cryptor.generateFullKey(val);
  updateState();
}

let mode = true;
function crypt() {
  if (cryptor == {}) return;

  const msg = inp.value;
  const res = mode ? cryptor.encryptMessage(msg) : cryptor.decryptMessage(msg);
  out.value = res;
}

const statePlace = document.getElementById('ready');
function updateState() {
  if (cryptor == {}) return;
  
  statePlace.innerHTML = cryptor.state;
  if (cryptor.state === 'Готов!') {
    statePlace.style.color = 'green'
    inp.disabled = false;
  } else {
    statePlace.style.color = '';
    inp.disabled = true;
  };
}

function revertMode() {
  mode = !mode;
  let btn = document.getElementById("translate");
  if (mode) {
    btn.innerHTML = "Зашифровать";
    inp.placeholder = "Исходный текст";
    out.placeholder = "Зашифрованный текст";
  } else {
    btn.innerHTML = "Расшифровать";
    inp.placeholder = "Зашифрованный текст";
    out.placeholder = "Исходный текст";
  }
  inp.value = out.value;
  crypt();
}

initEvents();
