// store the value before and after clicking an operator so we can perform operations on those numbers
let previousDisplayValue = '';
let currentDisplayValue = '';

let currentOperator;

// DOM nodes
let calcDisplay = document.querySelector('.calc-display');
let numButtons = document.querySelectorAll('.calc-button-num');
let operationButtons = document.querySelectorAll('.calc-button-operation');
let evaluationButton = document.querySelector('.calc-button-evaluate');
let clearButton = document.querySelector('.calc-button-clear');
let dotButton = document.querySelector('.calc-button-dot');
let backspaceButton = document.querySelector('.calc-button-backspace');

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
            num = Math.round((num + Number.EPSILON) * 100000) / 100000;
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

function checkValuesExist() {
    return currentDisplayValue != '' && previousDisplayValue != '';
}

function disableEvalButton() {
    evaluationButton.style.pointerEvents = 'none';
}

function enableEvalButton() {
    evaluationButton.style.pointerEvents = 'auto';
}

// button callback functions
function clear() {
    enableAllButtons();
    disableEvalButton();
    currentDisplayValue = '';
    previousDisplayValue = '';
    currentOperator = '';
    setDisplayText('0');
}

function numButtonPress(event) {
    if(resultFlag) {
        resultFlag = false;
        currentDisplayValue = '';
    }
    currentDisplayValue += event.target.textContent.trim();
    setDisplayText(currentDisplayValue);

    // if there are 2 values available we can enable the = button
    if(checkValuesExist()) {
        enableEvalButton();
    }
}

function operationButtonPress(event) {
    currentOperator = event.target.textContent.trim();
    // in case the user clicks operation buttons multiple times in a row don't wipe the previous value
    if(currentDisplayValue != '') {
        previousDisplayValue = currentDisplayValue;
    }
    currentDisplayValue = '';
}

function evaluationButtonPress(event) {
    let result = String(operate(currentOperator, Number(previousDisplayValue), Number(currentDisplayValue)));
    // if the number is too long shorten it or display an error so it doesnt overflow
    result = checkLongNumber(result);
    setDisplayText(result);
    currentDisplayValue = (result);
    previousDisplayValue = '';
    resultFlag = true;
    disableEvalButton();
}

function dotButtonPress() {
    if(resultFlag) {
        resultFlag = false;
        currentDisplayValue = '';
    }
    if(currentDisplayValue.includes(".")) {
        currentDisplayValue = currentDisplayValue.replace(".", "");
    }
    currentDisplayValue += ".";
    setDisplayText(currentDisplayValue);
}

function backspace() {
    if(resultFlag) {
        resultFlag = false;
        currentDisplayValue = '';
    }
    currentDisplayValue = currentDisplayValue.slice(0, -1);

    setDisplayText(currentDisplayValue);
}

numButtons.forEach(button => {
    button.addEventListener('click', numButtonPress);
});

operationButtons.forEach(button => {
    button.addEventListener('click', operationButtonPress);
})

evaluationButton.addEventListener('click', evaluationButtonPress);

clearButton.addEventListener('click', clear);

dotButton.addEventListener('click', dotButtonPress);

backspaceButton.addEventListener('click', backspace);

disableEvalButton();
