// https://blog.hubspot.com/website/css-hover-animation#:~:text=What%20is%20a%20CSS%20hover,to%20enhance%20your%20site's%20interactivity.
// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
//////////////////////////////////////////////
// TODO js input only numbers
// <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />
// const addition = document.getElementById("additionBar") as HTMLDivElement;
// const subtraction = document.getElementById("subtractionBar") as HTMLDivElement;
// const multiplication = document.getElementById("multiplicationBar") as HTMLDivElement;
// const division = document.getElementById("divisionBar") as HTMLDivElement;
var mExamples = document.getElementById("mathExamples");
var mExample = document.getElementById("mathExample");
var historyList = document.getElementById("historyList");
var ofNumbers = function () { return document.getElementById("settingsNumber").value; };
var fromNumber = function () { return document.getElementById("settingsFrom").value; };
var toNumber = function () { return document.getElementById("settingsTo").value; };
var timerS = function () { return document.getElementById("settingsTimer").value; };
var getResults = function () { return document.getElementById("resultInput"); };
var hScore1 = document.getElementById("historyScore1");
var hScore2 = document.getElementById("historyScore2");
var result = 1;
var output = "";
var mode = 1;
var modeSwitch = 0;
var time = 0.1;
var score1 = 0;
var score2 = 0;
function starter() {
    modeSwitch = mode;
    switchMode();
}
function getTimer() {
    var timer = document.getElementById("timer");
    if (!timer)
        return;
    timer.innerText = "" + (+timerS - 0.1);
    console.log(timer.innerHTML);
    getTimer();
    setTimeout(function () {
        switchMode();
    }, +timerS);
}
function insertResults(condition, output) {
    if (condition) {
        mExamples.innerHTML = "\n            <div id=\"timer\">00.00</div>\n            <div class=\"mathExample\">\n                <h2 id=\"mathExample\">".concat(output, "</h2>\n                <input type=\"text\" id=\"resultInput\" class=\"inputs\" oninput=\"inputRedexResult()\">\n            </div>");
    }
    else {
        mExamples.innerHTML = "<button class=\"starter\" onclick=\"starter()\">START</button>";
    }
}
function randomNumbers() {
    var constants = [];
    console.log(ofNumbers());
    for (var n = 0; n < +ofNumbers(); n++) {
        constants.push(Math.floor(Math.random() * ((+toNumber()) - (+fromNumber()) + 1)) + (+fromNumber()));
    }
    return constants;
}
function additions() {
    mode = 1;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a + b; });
    output = constants.join(' + ') + ' = ';
    mode === modeSwitch ?
        insertResults(true, output)
        :
            insertResults(false);
    // start = false;
}
function subtractions() {
    mode = 2;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a - b; });
    output = constants.join(' - ') + ' = ';
    mode === modeSwitch ?
        insertResults(true, output)
        :
            insertResults(false);
    // start = false;
}
function multiplications() {
    mode = 3;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a * b; });
    output = constants.join(' x ') + ' = ';
    mode === modeSwitch ?
        insertResults(true, output)
        :
            insertResults(false);
    // start = false;
}
function divisions() {
    mode = 4;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a / b; });
    output = constants.join(' ÷ ') + ' = ';
    mode === modeSwitch ?
        insertResults(true, output)
        :
            insertResults(false);
    // start = false;
}
function eHistoryList(e) {
    console.log("history");
    if (e.key === "Enter") {
        e.preventDefault();
        var statement = "";
        if (result === +getResults().value) {
            statement = "correct";
            score1 += 1;
            hScore1.innerText = "" + score1;
        }
        else {
            statement = "incorrect";
            score2 += 1;
            hScore2.innerText = "" + score2;
        }
        historyList.innerHTML +=
            "<span class=\"".concat(statement, "\"> ").concat(output + "" + result, "</span>");
        getResults().value = "";
        switchMode();
        getResults().select();
    }
}
function switchMode() {
    switch (mode) {
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
function inputRedex() {
    var _a;
    var input = document.activeElement ? (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id : "";
    if (input === "settingsNumber") {
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
function inputRedexResult() {
    var _a;
    var input = document.activeElement ? (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id : "";
    if (input === getResults().id) {
        document.getElementById(input).value =
            document.getElementById(input).value
                // .replace(/[^0-9.-]/g, '').replace(/(\--*?)\--*/g, '$1').replace(/^0[^-]/, '0');
                .replace(/[^0-9.-]/g, '')
                .replace(/(\..*?)\..*/g, '$1')
                .replace(/(\--*?)\--*/g, '$1');
        getResults().onkeydown = function (e) { return eHistoryList(e); };
        // getTimer();
    }
}
switchMode();
