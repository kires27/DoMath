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
const mExample = document.getElementById("mathExample") as HTMLHeadingElement;
const historyList = document.getElementById("historyList") as HTMLDivElement;

const ofNumbers = (document.getElementById("settingsNumber") as HTMLInputElement).value;
const fromNumber = (document.getElementById("settingsFrom") as HTMLInputElement).value;
const toNumber = (document.getElementById("settingsTo") as HTMLInputElement).value;
const timer = (document.getElementById("settingsTimer") as HTMLInputElement).value;

let result:number = 1;
let output:string = "";
let mode:number = 0;
let previousMode: number = 0; // TODO previous mode is for turning off timer and starting over
let start:boolean = false;

function starter() {
    start = true;
    switchMode();
    console.log(start);
}

function getResults() {
    return document.getElementById("resultInput") as HTMLInputElement;
}

function additions() {
    const constants: Array<number> = [];

    for (let n=0; n<+ofNumbers; n++) {
        constants.push(
            Math.floor(Math.random() * ((+toNumber)-(+fromNumber)+1))+(+fromNumber)
        );  
    }

    result = constants.reduce((a,b)=> a+b);
    output = constants.join(' + ')+' = ';

    if (start) {
        mExamples.innerHTML = `
            <h2 id="mathExample">${output}</h2>
            <input type="text" id="resultInput" class="inputs" oninput="inputRedex()">`
    } else {
        mExamples.innerHTML = `<button class="starter" onclick="starter()">START</button>`
    } 

    mode = 1;
    start = false;
}

function subtractions() {
    const constants: Array<number> = [];

    for (let n=0; n<+ofNumbers; n++) {
        constants.push(
            Math.floor(Math.random() * ((+toNumber)-(+fromNumber)+1))+(+fromNumber)
        );  
    }

    result = constants.reduce((a,b)=> a-b);
    output = constants.join(' - ')+' = ';

    if (start) {
        mExamples.innerHTML = `
            <h2 id="mathExample">${output}</h2>
            <input type="text" id="resultInput" class="inputs" oninput="inputRedex()">`
    } else {
        mExamples.innerHTML = `<button class="starter" onclick="starter()">START</button>`
    } 

    mode = 2;
    start = false;
}

function multiplications() {
    const constants: Array<number> = [];

    for (let n=0; n<+ofNumbers; n++) {
        constants.push(
            Math.floor(Math.random() * ((+toNumber)-(+fromNumber)+1))+(+fromNumber)
        );  
    }

    result = constants.reduce((a,b)=> a*b);
    output = constants.join(' x ')+' = ';

    if (start) {
        mExamples.innerHTML = `
            <h2 id="mathExample">${output}</h2>
            <input type="text" id="resultInput" class="inputs" oninput="inputRedex()">`
    } else {
        mExamples.innerHTML = `<button class="starter" onclick="starter()">START</button>`
    } 

    mode = 3;
    start = false;
}

function divisions() {
    const constants: Array<number> = [];

    for (let n=0; n<+ofNumbers; n++) {
        constants.push(
            Math.floor(Math.random() * ((+toNumber)-(+fromNumber)+1))+(+fromNumber)
        );  
    }

    result = constants.reduce((a,b)=> a/b);
    output = constants.join(' ÷ ')+' = ';

    if (start) {
        mExamples.innerHTML = `
            <h2 id="mathExample">${output}</h2>
            <input type="text" id="resultInput" class="inputs" oninput="inputRedex()">`
    } else {
        mExamples.innerHTML = `<button class="starter" onclick="starter()">START</button>`
    } 

    mode = 4;
    start = false;
}

function eHistoryList(e:any) {
    console.log("history");
    if(e.key === "Enter") {
        e.preventDefault();
        let statement = "";

        result === +getResults().value ? statement = "correct" : statement = "incorrect";

        historyList.innerHTML += 
            `<span class="${statement}"> ${output + ""+result}</span>`

        getResults().value = "";

        switchMode();

        getResults().select();
    }
}

function switchMode() {
    switch(mode) {
        case 1: additions(); break; 
        case 2: subtractions(); break; 
        case 3: multiplications(); break; 
        case 4: divisions(); break; 
        default: additions(); break; 
    }

    start = true
}

function inputRedex() {  // input only numbers
    const input:string = document.activeElement ? document.activeElement?.id : "";

    if (input === getResults().id) {
        (document.getElementById(input) as HTMLInputElement).value =
        (document.getElementById(input) as HTMLInputElement).value
            .replace(/[^0-9-]/g, '').replace(/(\--*?)\--*/g, '$1').replace(/^0[^-]/, '0');

        getResults().onkeydown = e => eHistoryList(e);
    }
    else if (input === "settingsNumber") {
        (document.getElementById(input) as HTMLInputElement).value =
        (document.getElementById(input) as HTMLInputElement).value
            .replace(/[^1-5]/d, '');
    }
    else if (input === "settingsFrom" || input === "settingsTo") {
        (document.getElementById(input) as HTMLInputElement).value =
        (document.getElementById(input) as HTMLInputElement).value
            .replace(/[^0-9-]/g, '').replace(/(\--*?)\--*/g, '$1').replace(/^0[^-]/, '0');
    }
    else if (input === "settingsTimer") {
        (document.getElementById(input) as HTMLInputElement).value =
        (document.getElementById(input) as HTMLInputElement).value
            .replace(/[^0-9.]/g, '')
            .replace(/(\..*?)\..*/g, '$1')
            .replace(/^0[^.]/, '0');
    }

}

function ipt() {
    setTimeout(switchMode, +timer)
    
}

additions();
