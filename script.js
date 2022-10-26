var addition = document.getElementById("additionBar");
var subtraction = document.getElementById("subtractionBar");
var multiplication = document.getElementById("multiplicationBar");
var division = document.getElementById("divisionBar");
var mExamples = document.getElementById("mathExamples");
var mExample = document.getElementById("mathExample");
var results = document.getElementById("resultInput");
var eHistory = document.getElementById("examplesHistory");
function additions() {
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
    eHistory.innerText = "div";
}
addition.onclick = function (e) { return additions(); };
subtraction.onclick = function (e) { return subtractions(); };
multiplication.onclick = function (e) { return multiplications(); }, eHistoryList();
division.onclick = function (e) { return divisions(); };
