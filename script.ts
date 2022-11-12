// https://blog.hubspot.com/website/css-hover-animation#:~:text=What%20is%20a%20CSS%20hover,to%20enhance%20your%20site's%20interactivity.
// https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
//////////////////////////////////////////////
// TODO js input only numbers
// <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');" />

// const addition = document.getElementById("additionBar") as HTMLDivElement;
// const subtraction = document.getElementById("subtractionBar") as HTMLDivElement;
// const multiplication = document.getElementById("multiplicationBar") as HTMLDivElement;
// const division = document.getElementById("divisionBar") as HTMLDivElement;

const mExamples = document.getElementById("mathExamples") as HTMLDivElement;
const timer = () => document.getElementById("timer") as HTMLDivElement;
const mExample = document.getElementById("mathExample") as HTMLHeadingElement;
const historyList = document.getElementById("historyList") as HTMLDivElement;

const ofNumbers = () =>
    (document.getElementById("settingsNumber") as HTMLInputElement).value;
const fromNumber = () =>
    (document.getElementById("settingsFrom") as HTMLInputElement).value;
const toNumber = () =>
    (document.getElementById("settingsTo") as HTMLInputElement).value;
const timerS = () =>
    +(document.getElementById("settingsTimer") as HTMLInputElement).value * 120;
const getResults = () =>
    document.getElementById("resultInput") as HTMLInputElement;

const hScore1 = document.getElementById(
    "historyScore1"
) as HTMLParagraphElement;
const hScore2 = document.getElementById(
    "historyScore2"
) as HTMLParagraphElement;

let result: number = 1;
let output: string = "";
let mode: number = 1;
let modeSwitch: number = 0;
let time = timerS();
let timeLength = ("" + time).length;
let score1 = 0;
let score2 = 0;
let sScore1 = 0;
let sScore2 = 0;
let timerFrameId: any;
let sessionN = 0;

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
    if (timer()) timer().innerText = "" + Math.floor(time / 120);

    time--;


    if (time <= 0) {
        modeSwitch = 0;
        sessionN += 1;
        switchMode();
        session(sessionN, (timerS() / 120), sScore1, sScore2);
        return () => {
            window.cancelAnimationFrame(timerFrameId);
        };
    }

    timerFrameId = window.requestAnimationFrame(getTimer);
}

function insertResults(condition: boolean, output?: any) {
    if (condition) {
        mExamples.innerHTML = `
            <div id="timer"></div>
            <div class="mathExample">
                <h2 id="mathExample">${output}</h2>
                <input type="text" id="resultInput" class="inputs" pattern="\d*" oninput="inputRedexResult()">
            </div>`;

        getResults().select();
    } else {
        mExamples.innerHTML = `<button class="starter" onclick="starter()">START</button>`;
    }
}

function randomNumbers() {
    const constants: Array<number> = [];

    for (let n = 0; n < +ofNumbers(); n++) {
        constants.push(
            Math.floor(Math.random() * (+toNumber() - +fromNumber() + 1)) +
                +fromNumber()
        );
    }

    return constants;
}

function additions() {
    mode = 1;

    const constants = randomNumbers();

    // TODO if number is negative put it in brackets
    result = constants.reduce((a, b) => a + b);
    output = constants.join(" + ") + " = ";

    mode === modeSwitch ? insertResults(true, output) : insertResults(false);
}

function subtractions() {
    mode = 2;

    const constants = randomNumbers();

    result = constants.reduce((a, b) => a - b);
    output = constants.join(" - ") + " = ";

    mode === modeSwitch ? insertResults(true, output) : insertResults(false);
}

function multiplications() {
    mode = 3;

    const constants = randomNumbers();

    result = constants.reduce((a, b) => a * b);
    output = constants.join(" x ") + " = ";

    mode === modeSwitch ? insertResults(true, output) : insertResults(false);
}

function divisions() {
    mode = 4;

    const constants = randomNumbers();

    result = constants.reduce((a, b) => a / b);
    output = constants.join(" ÷ ") + " = ";

    mode === modeSwitch ? insertResults(true, output) : insertResults(false);
}

function eHistoryList(e: any) {
    console.log("history");
    if (e.key === "Enter") {
        e.preventDefault();
        let statement = "";

        if (result === +getResults().value) {
            statement = "correct";
            score1 += 1;
            score1 += 1;
            hScore1.innerText = "" + score1;
        } else {
            statement = "incorrect";
            score2 += 1;
            sScore2 += 1;
            hScore2.innerText = "" + score2;
        }

        historyList.innerHTML += `<span class="${statement}"> ${
            output + "" + result
        }</span>`;

        getResults().value = "";

        switchMode();

        getResults().select();
    }
}

function session(
    sessionN: number,
    time: number,
    score1: number,
    score2: number
) {
    historyList.innerHTML += `
    <div class="historyScore">
        <p id="sessionScore1" class="correct">${score1}</p>
        <p>-</p>
        <p id="sessionScore2" class="incorrect">${score2}</p>
    </div>
    <h3 class="sessionTitle">Session ${sessionN} - ${time} sec</h3>
    `;

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
    // TODO input only numbers
    const input: string = document.activeElement
        ? document.activeElement?.id
        : "";

    if (input === "settingsNumber") {
        (document.getElementById(input) as HTMLInputElement).value = (
            document.getElementById(input) as HTMLInputElement
        ).value.replace(/[^1-5]/d, "");
    } else if (input === "settingsFrom" || input === "settingsTo") {
        (document.getElementById(input) as HTMLInputElement).value = (
            document.getElementById(input) as HTMLInputElement
        ).value
            .replace(/[^0-9-]/g, "")
            .replace(/(\--*?)\--*/g, "$1")
            .replace(/^0[^-]/, "0");
    } else if (input === "settingsTimer") {
        (document.getElementById(input) as HTMLInputElement).value = (
            document.getElementById(input) as HTMLInputElement
        ).value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*?)\..*/g, "$1")
            .replace(/^0[^.]/, "0");
    }
}

function inputRedexResult() {
    const input: string = document.activeElement
        ? document.activeElement?.id
        : "";

    if (input === getResults().id) {
        (document.getElementById(input) as HTMLInputElement).value = (
            document.getElementById(input) as HTMLInputElement
        ).value
            // .replace(/[^0-9.-]/g, '').replace(/(\--*?)\--*/g, '$1').replace(/^0[^-]/, '0');
            .replace(/[^0-9.-]/g, "")
            .replace(/(\..*?)\..*/g, "$1")
            .replace(/(\--*?)\--*/g, "$1");

        getResults().onkeydown = (e) => eHistoryList(e);
    }
}

switchMode();
