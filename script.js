// const addition = document.getElementById("additionBar") as HTMLDivElement;
// const subtraction = document.getElementById("subtractionBar") as HTMLDivElement;
// const multiplication = document.getElementById("multiplicationBar") as HTMLDivElement;
// const division = document.getElementById("divisionBar") as HTMLDivElement;
var mExamples = document.getElementById("mathExamples");
var mExample = document.getElementById("mathExample");
var historyList = document.getElementById("historyList");
var ofNumbers = document.getElementById("settingsNumber").value;
var fromNumber = document.getElementById("settingsFrom").value;
var toNumber = document.getElementById("settingsTo").value;
var timer = document.getElementById("settingsTimer").value;
var result = 1;
var output = "";
var lastMode = 0;
var start = false;
function starter() {
    start = true;
    switchMode();
    console.log(start);
}
function getResults() {
    return document.getElementById("resultInput");
}
function additions() {
    var constants = [];
    for (var n = 0; n < +ofNumbers; n++) {
        constants.push(Math.floor(Math.random() * ((+toNumber) - (+fromNumber) + 1)) + (+fromNumber));
    }
    result = constants.reduce(function (a, b) { return a + b; });
    output = constants.join(' + ') + ' = ';
    if (start) {
        mExamples.innerHTML = "\n            <h2 id=\"mathExample\">".concat(output, "</h2>\n            <input type=\"text\" id=\"resultInput\" class=\"inputs\" oninput=\"inputRedex()\">");
    }
    else {
        mExamples.innerHTML = "<button class=\"starter\" onclick=\"starter()\">START</button>";
    }
    lastMode = 1;
    start = false;
}
function subtractions() {
    var constants = [];
    for (var n = 0; n < +ofNumbers; n++) {
        constants.push(Math.floor(Math.random() * ((+toNumber) - (+fromNumber) + 1)) + (+fromNumber));
    }
    result = constants.reduce(function (a, b) { return a - b; });
    output = constants.join(' - ') + ' = ';
    if (start) {
        mExamples.innerHTML = "\n            <h2 id=\"mathExample\">".concat(output, "</h2>\n            <input type=\"text\" id=\"resultInput\" class=\"inputs\" oninput=\"inputRedex()\">");
    }
    else {
        mExamples.innerHTML = "<button class=\"starter\" onclick=\"starter()\">START</button>";
    }
    lastMode = 2;
    start = false;
}
function multiplications() {
    var constants = [];
    for (var n = 0; n < +ofNumbers; n++) {
        constants.push(Math.floor(Math.random() * ((+toNumber) - (+fromNumber) + 1)) + (+fromNumber));
    }
    result = constants.reduce(function (a, b) { return a * b; });
    output = constants.join(' x ') + ' = ';
    if (start) {
        mExamples.innerHTML = "\n            <h2 id=\"mathExample\">".concat(output, "</h2>\n            <input type=\"text\" id=\"resultInput\" class=\"inputs\" oninput=\"inputRedex()\">");
    }
    else {
        mExamples.innerHTML = "<button class=\"starter\" onclick=\"starter()\">START</button>";
    }
    lastMode = 3;
    start = false;
}
function divisions() {
    var constants = [];
    for (var n = 0; n < +ofNumbers; n++) {
        constants.push(Math.floor(Math.random() * ((+toNumber) - (+fromNumber) + 1)) + (+fromNumber));
    }
    result = constants.reduce(function (a, b) { return a / b; });
    output = constants.join(' ÷ ') + ' = ';
    if (start) {
        mExamples.innerHTML = "\n            <h2 id=\"mathExample\">".concat(output, "</h2>\n            <input type=\"text\" id=\"resultInput\" class=\"inputs\" oninput=\"inputRedex()\">");
    }
    else {
        mExamples.innerHTML = "<button class=\"starter\" onclick=\"starter()\">START</button>";
    }
    lastMode = 4;
    start = false;
}
function eHistoryList(e) {
    console.log("history");
    if (e.key === "Enter") {
        e.preventDefault();
        var statement = "";
        result === +getResults().value ? statement = "correct" : statement = "incorrect";
        historyList.innerHTML +=
            "<span class=\"".concat(statement, "\"> ").concat(output + "" + result, "</span>");
        getResults().value = "";
        switchMode();
        getResults().select();
    }
}
function switchMode() {
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
    start = true;
}
function inputRedex() {
    var _a;
    var input = document.activeElement ? (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id : "";
    if (input === getResults().id) {
        document.getElementById(input).value =
            document.getElementById(input).value
                .replace(/[^0-9-]/g, '').replace(/(\--*?)\--*/g, '$1').replace(/^0[^-]/, '0');
        getResults().onkeydown = function (e) { return eHistoryList(e); };
    }
    else if (input === "settingsNumber") {
        document.getElementById(input).value =
            document.getElementById(input).value
                .replace(/[^1-5]/d, '');
    }
    else if (input === "settingsFrom" || input === "settingsTo") {
        document.getElementById(input).value =
            document.getElementById(input).value
                .replace(/[^0-9-]/g, '').replace(/(\--*?)\--*/g, '$1').replace(/^0[^-]/, '0');
    }
    else if (input === "settingsTimer") {
        document.getElementById(input).value =
            document.getElementById(input).value
                .replace(/[^0-9.]/g, '')
                .replace(/(\..*?)\..*/g, '$1')
                .replace(/^0[^.]/, '0');
    }
}
function ipt() {
    setTimeout(switchMode, +timer);
}
additions();
