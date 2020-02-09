// store the value before and after clicking an operator so we can perform operations on those numbers
let previousDisplayValue = '';
let currentDisplayValue = '';

let currentOperator;

// DOM nodes
let calcDisplay = document.querySelector('.calc-display');
let numButtons = document.querySelectorAll('.calc-button-num');
let operationButtons = document.querySelectorAll('.calc-button-operation');
let evaluationButton = document.querySelector('.calc-button-evaluate');

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

    let result = operate(currentOperator, Number(previousDisplayValue), Number(currentDisplayValue));
    console.log(currentOperator)
    console.log(previousDisplayValue)
    console.log(currentDisplayValue)
    console.log(result)
}

numButtons.forEach(button => {
    button.addEventListener('click', numButtonPress);
});

operationButtons.forEach(button => {
    button.addEventListener('click', operationButtonPress);
})

evaluationButton.addEventListener('click', evaluationButtonPress);



