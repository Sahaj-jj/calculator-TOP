const keys = Array.from(document.querySelectorAll('.keys-container div'));
const numbers = keys.filter(number => number.classList.contains('num'));
const screen = document.querySelectorAll('.display-container div');

let display;
let A;
let operatorDisplay;
let operator_clicked;

function InitCalc() {
    display = '0';
    A = 0;
    operatorDisplay = ' '
    operator_clicked = false;
    UpdateDisplay();
}

function UpdateDisplay() {
    // let decimalPart = `${parseFloat(display) % 1}`;
    // if (decimalPart > 0 && decimalPart.toString().length > 8) display = `${parseFloat(display).toFixed(4)}`;
    screen[1].textContent = display;
    screen[0].textContent = operatorDisplay;
}

function Clicked() {
    this.classList.add('clicked');
    setTimeout(() => {this.classList.remove('clicked')}, 190);

    if (this.classList.contains('num')) NumClicked(this.textContent);
    if (this.classList.contains('operation')) OperatorClicked(this.textContent);

    if (this.classList.contains('AC')) InitCalc();
    if (this.classList.contains('C')) Clear();
    if (this.classList.contains('perc')) Percentage();

    if (this.classList.contains('sign')) ChangeSign();
    if (this.classList.contains('dec')) AddDecimal();

}

function NumClicked(text) {
    if (operator_clicked) {
        if (operatorDisplay == '=') {
            InitCalc();
        }
        display = text;
        operator_clicked = false;
    }
    else if (display.length > 8) return;
    else if(display != 0 || display.includes('.')) display += text;
    else display = text;
    UpdateDisplay();
}

function OperatorClicked(text) {
    if (!operator_clicked) {
        switch(operatorDisplay) {
            case '+':
                A += parseFloat(display);
                break;
            case '-':
                A -= parseFloat(display);
                break;
            case "\u00D7":
                A *= parseFloat(display);
                break;
            case "\u00F7":
                A /= parseFloat(display);
                break;
            default:
                A += parseFloat(display);
                break;
        }
        display = `${A}`;
        operator_clicked = !operator_clicked;
    }
    operatorDisplay = text;
    UpdateDisplay();
}

function ChangeSign() {
    display *= -1;
    A *= -1;
    UpdateDisplay();
}

function AddDecimal() {
    if (display.includes('.')) return;
    display += '.';
    UpdateDisplay();
}

function Clear() {
    if (operatorDisplay == '=') InitCalc();
    display = display.slice(0, display.length - 1);
    if (display.length == 0) display = '0';
    UpdateDisplay();
}

function Percentage() {
    display = `${parseFloat(display)/100}`;
    A = A/100;
    UpdateDisplay();
}

InitCalc();
keys.forEach(key => key.addEventListener('click', Clicked));