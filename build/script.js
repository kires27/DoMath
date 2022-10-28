"use strict";
const addition = document.getElementById("additionBar");
const subtraction = document.getElementById("subtractionBar");
const multiplication = document.getElementById("multiplicationBar");
const division = document.getElementById("divisionBar");
const mExamples = document.getElementById("mathExamples");
const mExample = document.getElementById("mathExample");
const historyList = document.getElementById("historyList");
const results = document.getElementById("resultInput");
const ofNumbers = document.getElementById("settingsNumber");
const fromNumber = document.getElementById("settingsFrom");
const toNumber = document.getElementById("settingsTo");
function additions(numbers, min, max) {
    const constants = Array(numbers).fill(Math.random() * (max - min + 1) + min);
    console.log(constants);
    mExample.innerText = "add";
}
function subtractions() {
    mExample.innerText = "sub";
}
function multiplications() {
    mExample.innerText = "mul";
}
function divisions() {
    mExample.innerText = "div";
}
function eHistoryList() {
    historyList.innerText = "div";
}
addition.onclick = e => additions(ofNumbers.value, fromNumber.value, toNumber.value);
subtraction.onclick = e => subtractions();
multiplication.onclick = e => multiplications();
division.onclick = e => divisions();
