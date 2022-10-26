
const addition = document.getElementById("additionBar") as HTMLDivElement;
const subtraction = document.getElementById("subtractionBar") as HTMLDivElement;
const multiplication = document.getElementById("multiplicationBar") as HTMLDivElement;
const division = document.getElementById("divisionBar") as HTMLDivElement;

const mExamples = document.getElementById("mathExamples") as HTMLDivElement;
const mExample = document.getElementById("mathExample") as HTMLHeadingElement;
const results = document.getElementById("resultInput") as HTMLInputElement;
const eHistory = document.getElementById("examplesHistory") as HTMLDivElement;

function additions() {
    mExample.innerText = "add";
}

function subtractions() {
    mExample.innerText = "sub"
}

function multiplications() {
    mExample.innerText = "mul"
}

function divisions() {
    mExample.innerText = "div"
}

function eHistoryList() {
    eHistory.innerText = "div"
}

addition.onclick = e => additions();
subtraction.onclick = e => subtractions();
multiplication.onclick = e => multiplications();
division.onclick = e => divisions();