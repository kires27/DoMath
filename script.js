// https://blog.hubspot.com/website/css-hover-animation#:~:text=What%20is%20a%20CSS%20hover,to%20enhance%20your%20site's%20interactivity.
// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
// https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/
// <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />
////////////////////////////////////////////
// const addition = document.getElementById("additionBar") as HTMLDivElement;
// const subtraction = document.getElementById("subtractionBar") as HTMLDivElement;
// const multiplication = document.getElementById("multiplicationBar") as HTMLDivElement;
// const division = document.getElementById("divisionBar") as HTMLDivElement;
var mExamples = document.getElementById("mathExamples");
var timer = function () { return document.getElementById("timer"); };
var mExample = document.getElementById("mathExample");
var historyList = document.getElementById("historyList");
var ofNumbers = function () {
    return document.getElementById("settingsNumber").value;
};
var fromNumber = function () {
    return document.getElementById("settingsFrom").value;
};
var toNumber = function () {
    return document.getElementById("settingsTo").value;
};
var timerS = function () {
    return +document.getElementById("settingsTimer").value * 120;
};
var getResults = function () {
    return document.getElementById("resultInput");
};
var hScore1 = document.getElementById("historyScore1");
var hScore2 = document.getElementById("historyScore2");
var result = 1;
var output = "";
var mode = 1;
var modeSwitch = 0;
var time = timerS();
var timeLength = ("" + time).length;
var score1 = 0;
var score2 = 0;
var sScore1 = 0;
var sScore2 = 0;
var timerFrameId;
var sessionN = 0;
function starter() {
    modeSwitch = mode;
    time = timerS();
    switchMode();
    getTimer();
}
function getTimer() {
    // let seconds = ((time % 60000) / 1000).toFixed(0);
    // let minutes = Math.floor(time / 60000);
    // timer().innerText = minutes+":"+seconds;
    if (timer())
        timer().innerText = "" + Math.floor(time / 120);
    time--;
    if (time <= 0) {
        modeSwitch = 0;
        sessionN += 1;
        switchMode();
        session(sessionN, timerS() / 120, sScore1, sScore2);
        return function () {
            window.cancelAnimationFrame(timerFrameId);
        };
    }
    timerFrameId = window.requestAnimationFrame(getTimer);
}
function insertResults(condition, output) {
    if (condition) {
        mExamples.innerHTML = "\n            <div id=\"timer\"></div>\n            <div class=\"mathExample\">\n                <h2 id=\"mathExample\">".concat(output, "</h2>\n                <input type=\"number\" id=\"resultInput\" class=\"inputs\" oninput=\"inputRedexResult()\">\n            </div>");
        getResults().select();
    }
    else {
        mExamples.innerHTML = "<button class=\"starter\" onclick=\"starter()\">START</button>";
    }
}
function randomNumbers() {
    var constants = [];
    for (var n = 0; n < +ofNumbers(); n++) {
        constants.push(Math.floor(Math.random() * (+toNumber() - +fromNumber() + 1)) +
            +fromNumber());
    }
    return constants;
}
function additions() {
    mode = 1;
    var constants = randomNumbers();
    // TODO if number is negative put it in brackets
    result = constants.reduce(function (a, b) { return a + b; });
    output = constants.join(" + ") + " = ";
    mode === modeSwitch ? insertResults(true, output) : insertResults(false);
}
function subtractions() {
    mode = 2;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a - b; });
    output = constants.join(" - ") + " = ";
    mode === modeSwitch ? insertResults(true, output) : insertResults(false);
}
function multiplications() {
    mode = 3;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a * b; });
    output = constants.join(" x ") + " = ";
    mode === modeSwitch ? insertResults(true, output) : insertResults(false);
}
function divisions() {
    mode = 4;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a / b; });
    output = constants.join(" ÷ ") + " = ";
    mode === modeSwitch ? insertResults(true, output) : insertResults(false);
}
function eHistoryList(e) {
    console.log("history");
    if (e.key === "Enter") {
        e.preventDefault();
        var statement = "";
        if (result === +getResults().value) {
            statement = "correct";
            score1 += 1;
            score1 += 1;
            hScore1.innerText = "" + score1;
        }
        else {
            statement = "incorrect";
            score2 += 1;
            sScore2 += 1;
            hScore2.innerText = "" + score2;
        }
        historyList.innerHTML += "<span class=\"".concat(statement, "\"> ").concat(output + "" + result, "</span>");
        getResults().value = "";
        switchMode();
        getResults().select();
    }
}
function session(sessionN, time, score1, score2) {
    historyList.innerHTML += "\n    <div class=\"historyScore\">\n        <p id=\"sessionScore1\" class=\"correct\">".concat(score1, "</p>\n        <p>-</p>\n        <p id=\"sessionScore2\" class=\"incorrect\">").concat(score2, "</p>\n    </div>\n    <h3 class=\"sessionTitle\">Session ").concat(sessionN, " - ").concat(time, " sec</h3>\n    ");
    console.log(sScore2);
    console.log(sScore2);
    sScore1 = 0;
    sScore2 = 0;
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
    // TODO input only numbers
    var inputId = document.activeElement
        ? (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id
        : "";
    var element = document.getElementById(inputId);
    if (inputId === "settingsNumber") {
        element.value = element.value.replace(/[^2-5]/, "");
        // if (element.value.length > 1) element.value = element.value.slice(0, 1);
    }
    else if (inputId === "settingsFrom" || inputId === "settingsTo") {
        element.value = element.value
            .replace(/[^0-9-]/g, "")
            .replace(/(\--*?)\--*/g, "$1")
            .replace(/^0[^-]/, "0");
    }
    else if (inputId === "settingsTimer") {
        element.value = element.value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*?)\..*/g, "$1")
            .replace(/^0[^.]/, "0");
    }
}
function inputRedexResult() {
    var _a;
    var input = document.activeElement
        ? (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.id
        : "";
    if (input === getResults().id) {
        document.getElementById(input).value = document.getElementById(input).value
            // .replace(/[^0-9.-]/g, '').replace(/(\--*?)\--*/g, '$1').replace(/^0[^-]/, '0');
            .replace(/[^0-9.-]/g, "")
            .replace(/(\..*?)\..*/g, "$1")
            .replace(/(\--*?)\--*/g, "$1");
        getResults().onkeydown = function (e) { return eHistoryList(e); };
    }
}
switchMode();
