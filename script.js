var addition = document.getElementById("additionBar");
var subtraction = document.getElementById("subtractionBar");
var multiplication = document.getElementById("multiplicationBar");
var division = document.getElementById("divisionBar");
var mExamples = document.getElementById("mathExamples");
var mExample = document.getElementById("mathExample");
var historyList = document.getElementById("historyList");
var results = document.getElementById("resultInput");
var ofNumbers = +document.getElementById("settingsNumber").value;
var fromNumber = +document.getElementById("settingsFrom").value;
var toNumber = +document.getElementById("settingsTo").value;
var result = 1;
var output = "";
var lastMode = 0;
function additions() {
    var constants = [];
    for (var n = 0; n < ofNumbers; n++) {
        constants.push(Math.floor(Math.random() * (toNumber - fromNumber + 1)) + fromNumber);
    }
    result = constants.reduce(function (a, b) { return a + b; });
    output = constants.join(' + ') + ' = ';
    mExample.innerText = output;
    lastMode = 1;
}
function subtractions() {
    var constants = [];
    for (var n = 0; n < ofNumbers; n++) {
        constants.push(Math.floor(Math.random() * (toNumber - fromNumber + 1)) + fromNumber);
    }
    result = constants.reduce(function (a, b) { return a - b; });
    output = constants.join(' - ') + ' = ';
    mExample.innerText = output;
    lastMode = 2;
}
function multiplications() {
    var constants = [];
    for (var n = 0; n < ofNumbers; n++) {
        constants.push(Math.floor(Math.random() * (toNumber - fromNumber + 1)) + fromNumber);
    }
    result = constants.reduce(function (a, b) { return a * b; });
    output = constants.join(' x ') + ' = ';
    mExample.innerText = output;
    lastMode = 3;
}
function divisions() {
    var constants = [];
    for (var n = 0; n < ofNumbers; n++) {
        constants.push(Math.floor(Math.random() * (toNumber - fromNumber + 1)) + fromNumber);
    }
    result = constants.reduce(function (a, b) { return a / b; });
    output = constants.join(' ÷ ') + ' = ';
    mExample.innerText = output;
    lastMode = 4;
}
function eHistoryList(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        var statement = "";
        console.log(+results.value);
        result === +results.value ? statement = "correct" : statement = "incorrect";
        historyList.innerHTML +=
            "<span class=\"".concat(statement, "\"> ").concat(output + "" + result, "</span>");
        results.value = "";
        switch (lastMode) {
            case 1:
                additions();
                break;
            case 2:
                subtractions();
                break;
            case 3:
                multiplications();
                break;
            case 4:
                divisions();
                break;
            default:
                additions();
                break;
        }
    }
}
addition.onclick = function (e) { return additions(); };
subtraction.onclick = function (e) { return subtractions(); };
multiplication.onclick = function (e) { return multiplications(); };
division.onclick = function (e) { return divisions(); };
results.onkeydown = function (e) { return eHistoryList(e); };
additions();
