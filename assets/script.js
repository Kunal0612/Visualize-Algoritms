const MIN_SIZE = 4;
const MAX_SIZE = 64;
const DEFAULT_SIZE = 32;

const MIN_SPEED = 1;
const MAX_SPEED = 4;
const DEFAULT_SPEED = 3;

const MIN = 20;
const MAX = 300;

const WAITING_TIME = 100;

const UNSORTED = 'deepskyblue';
const SORTED = 'mediumspringgreen';
const COMPARE = 'crimson';
const SELECTED = 'blueviolet';
const LEFT = 'gold';
const RIGHT = 'orangered';

let size;
let delay;

let arr = [];

let array_container_width;
let element_width;
let element_width_max;
let margin_element;

let algo_selected;

function updateValues() {
  const arrayContainer = document.getElementById("array-container");
  array_container_width = Math.floor(arrayContainer.offsetWidth);
  element_width_max = Math.floor(array_container_width / 20);

  margin_element = window.innerWidth < 1200 ? 1 : 2;
}

function findElementWidth() {
  element_width = Math.floor(array_container_width / size) - 2 * margin_element;

  if (element_width > element_width_max) {
    element_width = element_width_max;
  }
}

function createArray() {
  arr = [];
  const arrayDiv = document.getElementById("array");
  arrayDiv.innerHTML = '';

  for (let i = 0; i < size; i++) {
    const n = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    arr.push(n);

    const element = document.createElement("div");
    element.id = "e" + i;
    element.className = "element";
    element.style.backgroundColor = UNSORTED;
    element.style.width = `${element_width}px`;
    element.style.height = `${n}px`;
    element.style.marginLeft = `${margin_element}px`;
    element.style.marginRight = `${margin_element}px`;

    arrayDiv.appendChild(element);
  }
}

function setHeight(id, height) {
  const element = document.getElementById("e" + id);
  if (element) {
    element.style.height = height + "px";
  }
}

function setColor(id, color) {
  const element = document.getElementById("e" + id);
  if (element) {
    element.style.backgroundColor = color;
  }
}

function setColorRange(p, r, color) {
  for (let i = p; i <= r; i++) {
    setColor(i, color);
  }
}

function swap(a, b) {
  // Swap values in the array
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;

  // Swap heights in the DOM
  const elementA = document.getElementById("e" + a);
  const elementB = document.getElementById("e" + b);

  if (elementA && elementB) {
    const heightA = elementA.style.height;
    const heightB = elementB.style.height;

    elementA.style.height = heightB;
    elementB.style.height = heightA;
  }
}

function disableOthers() {
  document.getElementById("sort").disabled = true;
  document.getElementById("randomize").disabled = true;
  document.getElementById("size-slider").disabled = true;
}

function enableOthers() {
  document.getElementById("sort").disabled = false;
  document.getElementById("randomize").disabled = false;
  document.getElementById("size-slider").disabled = false;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
  const sizeSlider = document.getElementById("size-slider");
  const speedSlider = document.getElementById("speed-slider");

  sizeSlider.min = MIN_SIZE;
  sizeSlider.max = MAX_SIZE;
  sizeSlider.value = DEFAULT_SIZE;

  speedSlider.min = MIN_SPEED;
  speedSlider.max = MAX_SPEED;
  speedSlider.value = DEFAULT_SPEED;

  size = DEFAULT_SIZE;
  delay = WAITING_TIME * Math.pow(2, MAX_SPEED - DEFAULT_SPEED);

  updateValues();
  findElementWidth();
  createArray();

  document.getElementById("randomize").addEventListener("click", createArray);

  document.querySelectorAll(".algo-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      algo_selected = btn.innerHTML;

      document.querySelector(".algo-btn-active")?.classList.remove("algo-btn-active");
      btn.classList.add("algo-btn-active");

      const warning = document.getElementById("no-algo-warning");
      warning.classList.remove("display-flex");
      warning.classList.add("display-none");
    });
  });

  document.getElementById("sort").addEventListener("click", async () => {
    disableOthers();

    setColorRange(0, size - 1, UNSORTED);

    if (algo_selected === "Bubble Sort") await bubbleSort();
    else if (algo_selected === "Selection Sort") await selectionSort();
    else if (algo_selected === "Insertion Sort") await insertionSort();
    else if (algo_selected === "Merge Sort") await mergeSort(0, size - 1);
    else if (algo_selected === "Quicksort") await quicksort(0, size - 1);
    else if (algo_selected === "Heapsort") await heapsort();
    else {
      const warning = document.getElementById("no-algo-warning");
      warning.classList.remove("display-none");
      warning.classList.add("display-flex");
    }

    enableOthers();
  });

  sizeSlider.addEventListener("input", () => {
    size = parseInt(sizeSlider.value, 10);
    findElementWidth();
    createArray();
  });

  speedSlider.addEventListener("input", () => {
    delay = WAITING_TIME * Math.pow(2, MAX_SPEED - parseInt(speedSlider.value, 10));
  });

  window.addEventListener("resize", () => {
    const arrayContainer = document.getElementById("array-container");
    if (array_container_width !== Math.floor(arrayContainer.offsetWidth)) {
      updateValues();
      findElementWidth();

      for (let i = 0; i < size; i++) {
        const element = document.getElementById("e" + i);
        if (element) {
          element.style.width = `${element_width}px`;
          element.style.marginLeft = `${margin_element}px`;
          element.style.marginRight = `${margin_element}px`;
        }
      }
    }
  });
});
