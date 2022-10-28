
const addition = document.getElementById("additionBar") as HTMLDivElement;
const subtraction = document.getElementById("subtractionBar") as HTMLDivElement;
const multiplication = document.getElementById("multiplicationBar") as HTMLDivElement;
const division = document.getElementById("divisionBar") as HTMLDivElement;

const mExamples = document.getElementById("mathExamples") as HTMLDivElement;
const mExample = document.getElementById("mathExample") as HTMLHeadingElement;
const historyList = document.getElementById("historyList") as HTMLDivElement;

const results = document.getElementById("resultInput") as HTMLInputElement;
const ofNumbers:number = +(document.getElementById("settingsNumber") as HTMLInputElement).value;
const fromNumber:number = +(document.getElementById("settingsFrom") as HTMLInputElement).value;
const toNumber:number = +(document.getElementById("settingsTo") as HTMLInputElement).value;

let result:number = 1;
let output:string = "";
let lastMode:number = 0;


function additions() {
    const constants: Array<number> = [];

    for (let n=0; n<ofNumbers; n++) {
        constants.push(
            Math.floor(Math.random() * (toNumber-fromNumber+1))+fromNumber
        );  
    }

    result = constants.reduce((a,b)=> a+b);
    output = constants.join(' + ')+' = ';

    mExample.innerText = output;

    lastMode = 1;
}

function subtractions() {
    const constants: Array<number> = [];

    for (let n=0; n<ofNumbers; n++) {
        constants.push(
            Math.floor(Math.random() * (toNumber-fromNumber+1))+fromNumber
        );  
    }

    result = constants.reduce((a,b)=> a-b);
    output = constants.join(' - ')+' = ';

    mExample.innerText = output;

    lastMode = 2;
}

function multiplications() {
    const constants: Array<number> = [];

    for (let n=0; n<ofNumbers; n++) {
        constants.push(
            Math.floor(Math.random() * (toNumber-fromNumber+1))+fromNumber
        );  
    }

    result = constants.reduce((a,b)=> a*b);
    output = constants.join(' x ')+' = ';

    mExample.innerText = output;

    lastMode = 3;
}

function divisions() {
    const constants: Array<number> = [];

    for (let n=0; n<ofNumbers; n++) {
        constants.push(
            Math.floor(Math.random() * (toNumber-fromNumber+1))+fromNumber
        );  
    }

    result = constants.reduce((a,b)=> a/b);
    output = constants.join(' ÷ ')+' = ';

    mExample.innerText = output;

    lastMode = 4;
}

function eHistoryList(e:any) {
    if(e.key === "Enter") {
        e.preventDefault();
        let statement = "";

        console.log(+results.value);

        result === +results.value ? statement = "correct" : statement = "incorrect";

        historyList.innerHTML += 
            `<span class="${statement}"> ${output +""+result}</span>`

        results.value = "";

        switch(lastMode) {
            case 1: additions(); break;
            case 2: subtractions(); break;
            case 3: multiplications(); break;
            case 4: divisions(); break;
            default: additions(); break;
        }
    }
}

addition.onclick = e => additions();
subtraction.onclick = e => subtractions();
multiplication.onclick = e => multiplications();
division.onclick = e => divisions();

results.onkeydown = e => eHistoryList(e);

additions();