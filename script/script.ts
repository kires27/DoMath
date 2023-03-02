const navbar = document.getElementById("navbar") as HTMLDivElement;

const timer = () => document.getElementById("timer") as HTMLDivElement;
const mExample = document.getElementById("mathExample") as HTMLDivElement;
const historyList = document.getElementById("historyList") as HTMLDivElement;

const ofNumbers = () =>
    (document.getElementById("settingsNumber") as HTMLInputElement).value;
const fromNumber = () =>
    (document.getElementById("settingsFrom") as HTMLInputElement).value;
const toNumber = () =>
    (document.getElementById("settingsTo") as HTMLInputElement).value;
const timerS = () =>
    +(document.getElementById("settingsTimer") as HTMLInputElement).value;
const getResults = () =>
    document.getElementById("resultInput") as HTMLInputElement;

const hScore1 = document.getElementById(
    "historyScore1"
) as HTMLParagraphElement;
const hScore2 = document.getElementById(
    "historyScore2"
) as HTMLParagraphElement;

const rangeNumber = document.getElementById("rangeNumber") as HTMLInputElement;
const rangeFrom = document.getElementById("rangeFrom") as HTMLInputElement;
const rangeTo = document.getElementById("rangeTo") as HTMLInputElement;
const rangeTimer = document.getElementById("rangeTimer") as HTMLInputElement;

let result: number = 1;
let output: string;
let answer: string;

let score1 = 0;
let score2 = 0;
let sScore1 = 0;
let sScore2 = 0;

let mode = 1;
let sessionN = 0;

let lastExample: number[];
let lastResult: any;

let highlight: string;


navbar.onclick = (e) => {
    insertResults(false);

    for (const child of navbar.children) {
        child.classList.remove("highlight");
        if (child == e.target) child.classList.add("highlight");
    }
} 


const getTimer = () => {
    const endTime = Date.now() + timerS() * 1000;
    let repeat;
    
    let t = setInterval(() => {
        let present = Date.now();
        let interval = Math.floor((endTime - present)/1000);

        if (timer()) timer().innerText = `${interval}`;
    
        if (interval <= 0) {
            clearInterval(t);
            timer().innerText = "";
            sessionN += 1;
            session(sessionN, timerS(), sScore1, sScore2);
            switchMode(false);
        }

        navbar.onclick = () => {
            insertResults(false);
            
            if (interval) {
                clearInterval(t);
                timer().innerText = "";
                sessionN += 1;
                session(sessionN, timerS()-interval, sScore1, sScore2);
                interval = 0;
            }
        }

        repeat = 1000;
    }, repeat);
}

function starter() {
    switchMode();
    getTimer();
}

function insertResults(condition: boolean, output?: any) {
    if (condition) {
        mExample.innerHTML = `
            <h2 id="mathExample">${output}</h2>
            <input type="text" id="resultInput" inputmode="numeric" 
                class="inputs" oninput="inputRedexResult()">
        `;

        getResults().select();
    } else {
        mExample.innerHTML = `<button class="starter" 
            onclick="starter()">START</button>
        `;
    }
}

function randomNumbers() {
    const constants: Array<number> = [];
    let number: number;

    for (let n = 0; n < +ofNumbers(); n++) {
        const randomNumber = () => Math.floor(Math.random() * 
            (+toNumber() - +fromNumber() + 1)) + +fromNumber();
        
        number = randomNumber();

        if (number === 0) {
            n-- 
        }
        else constants.push(number);
    }

    if (lastExample === constants) randomNumbers();
    else lastExample = constants;

    return constants;
}

function additions() {
    mode = 1;
    const constants = randomNumbers();

    result = constants.reduce((a, b) => a + b);
    
    if (lastResult === result) {
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
    const constants = randomNumbers();

    result = constants.reduce((a, b) => a - b);
    output = constants.join(" - ") + " = ";

    insertResults(true, output);
}

function multiplications() {
    mode = 3;
    const constants = randomNumbers();

    result = constants.reduce((a, b) => a * b);
    output = constants.join(" x ") + " = ";

    insertResults(true, output);
}

function divisions() {
    mode = 4;
    let constants = randomNumbers();

    while (
        (constants.some((e, i, arr) => arr.indexOf(e) !== i))
        ||
        (constants.reduce((a, b) => a/b) % 1 !== 0)
    ) {
        constants = randomNumbers();
    }

    result = constants.reduce((a, b) => a / b);
    output = constants.join(" ÷ ") + " = ";

    insertResults(true, output);
}

function eHistoryList(e: any) {
    if (e.key === "Enter") {
        e.preventDefault();

        let statement = "";

        if (result === +getResults().value) {
            statement = "correct";
            score1 += 1;
            sScore1 += 1;
            answer = "";
            hScore1.innerText = "" + score1;
        } else {
            statement = "incorrect";
            score2 += 1;
            sScore2 += 1;
            answer = `<span class="answer">
                (${getResults().value})</span>`
            hScore2.innerText = "" + score2;
        }

        historyList.innerHTML += `<span class="${statement}"> 
            ${output + ""+result} ${answer} </span>`;

        getResults().value = "";
        switchMode();
        getResults().select();

        historyList.scrollBy(0, -28);
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

    sScore1 = 0;
    sScore2 = 0;
}

function switchMode(nsp: boolean = true) {  // nsp: new session pause
    if (!nsp) return insertResults(false);

    switch (mode) {
        case 1:
            console.log(mode)
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
        
    getResults().onkeydown = (e) => eHistoryList(e);
}

insertResults(false);
inputRange();
