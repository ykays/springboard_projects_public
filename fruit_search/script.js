const input = document.querySelector("#fruit");
const suggestions = document.querySelector(".suggestions ul");

const fruit = [
  "Apple",
  "Apricot",
  "Avocado 🥑",
  "Banana",
  "Bilberry",
  "Blackberry",
  "Blackcurrant",
  "Blueberry",
  "Boysenberry",
  "Currant",
  "Cherry",
  "Coconut",
  "Cranberry",
  "Cucumber",
  "Custard apple",
  "Damson",
  "Date",
  "Dragonfruit",
  "Durian",
  "Elderberry",
  "Feijoa",
  "Fig",
  "Gooseberry",
  "Grape",
  "Raisin",
  "Grapefruit",
  "Guava",
  "Honeyberry",
  "Huckleberry",
  "Jabuticaba",
  "Jackfruit",
  "Jambul",
  "Juniper berry",
  "Kiwifruit",
  "Kumquat",
  "Lemon",
  "Lime",
  "Loquat",
  "Longan",
  "Lychee",
  "Mango",
  "Mangosteen",
  "Marionberry",
  "Melon",
  "Cantaloupe",
  "Honeydew",
  "Watermelon",
  "Miracle fruit",
  "Mulberry",
  "Nectarine",
  "Nance",
  "Olive",
  "Orange",
  "Clementine",
  "Mandarine",
  "Tangerine",
  "Papaya",
  "Passionfruit",
  "Peach",
  "Pear",
  "Persimmon",
  "Plantain",
  "Plum",
  "Pineapple",
  "Pomegranate",
  "Pomelo",
  "Quince",
  "Raspberry",
  "Salmonberry",
  "Rambutan",
  "Redcurrant",
  "Salak",
  "Satsuma",
  "Soursop",
  "Star fruit",
  "Strawberry",
  "Tamarillo",
  "Tamarind",
  "Yuzu",
];

//function to grab the key from the event
function searchHandler(e) {
  const query = e.target.value;
  search(query);
}

//once the key is retrieved, searching for all matching options
function search(str) {
  clearSuggestions();
  if (!str) return;

  const wordLower = str.toLowerCase();
  const results = fruit.filter((oneFruit) => {
    const fruitLower = oneFruit.toLowerCase();
    return fruitLower.includes(wordLower);
  });

  showSuggestions(results, wordLower);
}

function clearSuggestions() {
  const currentLi = suggestions.querySelectorAll("li");
  currentLi.forEach((li) => li.remove());
}

//function to display all the results in the dropdow and to highligth (bold) the input value (query)
function showSuggestions(results, inputVal) {
  results
    .map((resultOrig) => createLi(resultOrig, inputVal))
    .forEach((li) => suggestions.append(li));
}

//create new elements - li to display all of the suggestions
function createLi(resultOrig, inputVal) {
  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");

  const result = resultOrig.toLowerCase();
  const indexValue = result.indexOf(inputVal);
  const left = resultOrig.slice(0, indexValue);
  const middle = resultOrig.slice(indexValue, indexValue + inputVal.length);
  const right = resultOrig.slice(indexValue + inputVal.length);

  newSpan.innerText = middle;
  newSpan.style.fontWeight = "bold";
  newLi.append(newSpan);

  newSpan.insertAdjacentText("beforebegin", left);
  newSpan.insertAdjacentText("afterend", right);

  return newLi;
}

//once the user selects one of the suggestion, the selected only will be populated in the bar
function useSuggestion(e) {
  const selectedValueSpan = e.target.parentElement.innerText;
  const selectedValueLi = e.target.innerText;
  e.target.nodeName === "SPAN"
    ? (input.value = selectedValueSpan)
    : (input.value = selectedValueLi);
  clearSuggestions();
}

input.addEventListener("keyup", searchHandler);
suggestions.addEventListener("click", useSuggestion);
