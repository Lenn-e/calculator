// store the value before and after clicking an operator so we can perform operations on those numbers
let previousDisplayValue = '';
let currentDisplayValue = '';

let currentOperator;

// DOM nodes
let calcDisplay = document.querySelector('.calc-display');
let numButtons = document.querySelectorAll('.calc-button-num');
let operationButtons = document.querySelectorAll('.calc-button-operation');
let evaluationButton = document.querySelector('.calc-button-evaluate');

// switch to true after getting a result so that pressing num buttons doesn't concat but starts from a new value
let resultFlag = false;

function setDisplayText(text) {
    calcDisplay.textContent = text;
}

// calc operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if(operator === "+") {
        return add(a, b);
    } else if(operator === "-") {
        return subtract(a, b);
    } else if(operator === "x") {
        return multiply(a, b);
    } else if(operator === "/") {
        return divide(a, b);
    }
}

function checkLongNumber(num) {
    if(num.includes(".")) {
        let numParts = num.split(".");
        if(numParts[1].length > 4) {
            num = Math.round((num + Number.EPSILON) * 10000) / 10000
        }
    }
    if(num.length > 20) {
        num = "You made a big boy number.";
        disableAllButtons();
    }

    return num;
}

function disableAllButtons() {
    document.querySelectorAll('.calc-button').forEach(button => {
        button.style.pointerEvents = 'none';
    });
}

function enableAllButtons() {
    document.querySelectorAll('.calc-button').forEach(button => {
        button.style.pointerEvents = 'auto';
    });
}

// button callback functions
function numButtonPress(event) {
    currentDisplayValue += event.target.textContent.trim();
    setDisplayText(currentDisplayValue);
}

function operationButtonPress(event) {
    currentOperator = event.target.textContent.trim();
    // in case the user clicks operation buttons multiple times in a row don't wipe the previous value
    if(currentDisplayValue != '') {
        previousDisplayValue = currentDisplayValue;
    }
    currentDisplayValue = '';

    console.log(previousDisplayValue, currentDisplayValue)
}

function evaluationButtonPress(event) {
    let result = String(operate(currentOperator, Number(previousDisplayValue), Number(currentDisplayValue)));
    result = checkLongNumber(result);
    setDisplayText(result);
    currentDisplayValue = (result);
    previousDisplayValue = '';
}

numButtons.forEach(button => {
    button.addEventListener('click', numButtonPress);
});

operationButtons.forEach(button => {
    button.addEventListener('click', operationButtonPress);
})

evaluationButton.addEventListener('click', evaluationButtonPress);



