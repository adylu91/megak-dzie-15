//stałe przechowujące obiekty DOM
const btnGood = document.querySelector(".btn-good");
const btnBad = document.querySelector(".btn-bad");
const pGood = document.querySelector(".p-good");
const pBad = document.querySelector(".p-bad");
const pArrCounter = document.querySelector(".p-arr-counter");

//stała przechowująca nazwę obiektu w pamięci przeglądarki
const localeStorageObjName = "obj";

//pobranie obiektu z localeStorage
const getObjFromLocaleStorage = () => {
  return JSON.parse(localStorage.getItem(localeStorageObjName));
};

//ustawienie danych w dokumencie HTML pobranych z localeStorage
const setValuesInHTML = () => {
  const objParse = getObjFromLocaleStorage();
  const { good, bad, arr } = objParse;
  pGood.innerHTML = good;
  pBad.innerHTML = bad;
  pArrCounter.innerHTML = arr.reduce((x, y) => {
    return Number(x) + Number(y);
  }, 0);
};

//aktualizacja danych w obiekcie zawartym w localeStorage
const setNewDataInObj = (btn) => {
  let counter = prompt("podaj liczbę o której myślisz?");

  //walidacja czy to co wpisał użytkownik jest liczbą
  if (isNaN(counter * 1)) {
    do {
      alert("Miałeś podać liczbę. Wpisz jeszcze raz");
      counter = prompt("podaj liczbę o której myślisz?");
    } while (isNaN(counter * 1));
  }

  const obj = getObjFromLocaleStorage();
  const className = btn.target.className;

  if (className === "btn-good") {
    obj.good = ++obj.good;
  } else if (className === "btn-bad") {
    obj.bad = ++obj.bad;
  }

  obj.arr.push(counter);
  localStorage.setItem(localeStorageObjName, JSON.stringify(obj));
  setValuesInHTML();
};

//funkcja, która jest uruchamiana na samym poczatku. Jeśli obiekt jeszcze nie istnieje, tworzy go w localeStorage
(chceckInitialConditions = () => {
  if (getObjFromLocaleStorage() === null) {
    localStorage.setItem(
      localeStorageObjName,
      JSON.stringify({
        good: 0,
        bad: 0,
        arr: [],
      })
    );
  }
  setValuesInHTML();
})();

//listener przycisk "dobrze"
btnGood.addEventListener("click", (btn) => {
  setNewDataInObj(btn);
});

//listener przycisk "źle"
btnBad.addEventListener("click", (btn) => {
  setNewDataInObj(btn);
});
