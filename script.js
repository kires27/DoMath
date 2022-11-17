/*
css transition
    https://blog.hubspot.com/website/css-hover-animation#:~:text=What%20is%20a%20CSS%20hover,to%20enhance%20your%20site's%20interactivity.
input numeric values
    https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
numerical keyboard
    https://css-tricks.com/finger-friendly-numerical-inputs-with-inputmode/
input types
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
css input range
    https://www.cssportal.com/style-input-range/
animation
    https://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm
convert dates
    https://linuxhint.com/convert-numbers-dates-javascript/#:~:text=To%20convert%20a%20number%20into,into%20date%20format%20in%20JavaScript.
*/
var navbar = document.getElementById("navbar");
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
    return +document.getElementById("settingsTimer").value;
};
var getResults = function () {
    return document.getElementById("resultInput");
};
var hScore1 = document.getElementById("historyScore1");
var hScore2 = document.getElementById("historyScore2");
var rangeNumber = document.getElementById("rangeNumber");
var rangeFrom = document.getElementById("rangeFrom");
var rangeTo = document.getElementById("rangeTo");
var rangeTimer = document.getElementById("rangeTimer");
var result = 1;
var output;
var answer;
var score1 = 0;
var score2 = 0;
var sScore1 = 0;
var sScore2 = 0;
var mode = 1;
var sessionN = 0;
var lastExample;
var lastResult;
navbar.onclick = function () { return insertResults(false); };
var getTimer = function () {
    var endTime = Date.now() + timerS() * 1000;
    var repeat;
    var t = setInterval(function () {
        var present = Date.now();
        var interval = Math.floor((endTime - present) / 1000);
        if (timer())
            timer().innerText = "".concat(interval);
        if (interval <= 0) {
            clearInterval(t);
            timer().innerText = "";
            sessionN += 1;
            session(sessionN, timerS(), sScore1, sScore2);
            switchMode(false);
        }
        navbar.onclick = function () {
            insertResults(false);
            if (interval) {
                clearInterval(t);
                timer().innerText = "";
                sessionN += 1;
                session(sessionN, timerS() - interval, sScore1, sScore2);
                interval = 0;
            }
        };
        repeat = 1000;
    }, repeat);
};
// let time = timerS();
// function getTimer() {
//     if (timer()) timer().innerText = ""+time;
//     setTimeout(() => {
//         time--;
//         console.log(time);
//         if (time < 0) {
//             modeSwitch = 0;
//             sessionN += 1;
//             switchMode();
//             session(sessionN, timerS(), sScore1, sScore2);
//             return () => cancelTimer();
//         }
//         timerFrameId = window.requestAnimationFrame(getTimer);
//     }, 1000);
// }
// const cancelTimer = () => window.cancelAnimationFrame(timerFrameId);
function starter() {
    switchMode();
    getTimer();
}
function insertResults(condition, output) {
    if (condition) {
        mExample.innerHTML = "\n            <h2 id=\"mathExample\">".concat(output, "</h2>\n            <input type=\"text\" id=\"resultInput\" inputmode=\"numeric\" \n                class=\"inputs\" oninput=\"inputRedexResult()\">\n        ");
        getResults().select();
    }
    else {
        mExample.innerHTML = "<button class=\"starter\" \n            onclick=\"starter()\">START</button>\n        ";
    }
}
function randomNumbers() {
    var constants = [];
    var number;
    for (var n = 0; n < +ofNumbers(); n++) {
        var randomNumber = function () { return Math.floor(Math.random() *
            (+toNumber() - +fromNumber() + 1)) + +fromNumber(); };
        number = randomNumber();
        if (number === 0) {
            console.log("0 detected");
            n--;
        }
        else
            constants.push(number);
    }
    if (lastExample === constants)
        randomNumbers();
    else
        lastExample = constants;
    return constants;
}
function additions() {
    mode = 1;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a + b; });
    if (lastResult === result) {
        console.log("corrected results");
        additions();
    }
    else {
        lastResult = result;
        output = constants.join(" + ") + " = ";
        insertResults(true, output);
    }
}
function subtractions() {
    mode = 2;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a - b; });
    output = constants.join(" - ") + " = ";
    insertResults(true, output);
}
function multiplications() {
    mode = 3;
    var constants = randomNumbers();
    result = constants.reduce(function (a, b) { return a * b; });
    output = constants.join(" x ") + " = ";
    insertResults(true, output);
}
function divisions() {
    mode = 4;
    var constants = randomNumbers();
    result = Math.round(constants.reduce(function (a, b) { return a / b; }) * 10) / 10;
    output = constants.join(" ÷ ") + " = ";
    insertResults(true, output);
}
function eHistoryList(e) {
    console.log(e);
    if (e.key === "Enter") {
        e.preventDefault();
        var statement = "";
        if (result === +getResults().value) {
            statement = "correct";
            score1 += 1;
            sScore1 += 1;
            answer = "";
            hScore1.innerText = "" + score1;
        }
        else {
            statement = "incorrect";
            score2 += 1;
            sScore2 += 1;
            answer = "<span class=\"answer\">\n                (".concat(getResults().value, ")</span>");
            hScore2.innerText = "" + score2;
        }
        historyList.innerHTML += "<span class=\"".concat(statement, "\"> \n            ").concat(output + "" + result, " ").concat(answer, " </span>");
        getResults().value = "";
        switchMode();
        getResults().select();
    }
}
function session(sessionN, time, score1, score2) {
    historyList.innerHTML += "\n    <div class=\"historyScore\">\n        <p id=\"sessionScore1\" class=\"correct\">".concat(score1, "</p>\n        <p>-</p>\n        <p id=\"sessionScore2\" class=\"incorrect\">").concat(score2, "</p>\n    </div>\n    <h3 class=\"sessionTitle\">Session ").concat(sessionN, " - ").concat(time, " sec</h3>\n    ");
    sScore1 = 0;
    sScore2 = 0;
}
function switchMode(nsp) {
    if (nsp === void 0) { nsp = true; }
    if (!nsp)
        return insertResults(false);
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
        default: break;
    }
}
function inputRange() {
    rangeNumber.innerText = "" + ofNumbers();
    rangeFrom.innerText = "" + fromNumber();
    rangeTo.innerText = "" + toNumber();
    rangeTimer.innerText = "" + timerS();
}
function inputRedexResult() {
    getResults().value = getResults()
        .value
        .replace(/[^-0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1")
        .replace(/(\--*?)\--*/g, "$1");
    getResults().onkeydown = function (e) { return eHistoryList(e); };
}
insertResults(false);
inputRange();
