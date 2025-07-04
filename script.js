let expression = '';

function updateDisplay() {

    const display = document.getElementById('display');
    display.value = expression.slice(0, 13);
}

function appendValue(val) {
    const operators = ['+', '-', '*', '/'];

    if (operators.includes(val) && operators.includes(expression.slice(-1))) {
        return;
    }

    if (val === '.' && expression.slice(-1) === '.') {
        return;
    }

    let lastOperatorIndex = Math.max(
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/')
    );
    let lastNumber = expression.slice(lastOperatorIndex + 1);
    if (val === '.' && lastNumber.includes('.')) {
        return;
    }

    if (expression.length < 12) {
        expression += val;
        updateDisplay();
    }
}

function clearDisplay() {

    expression = '';
    updateDisplay();
}

function deleteLast() {
    
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {

    try {

        expression = (new Function('return ' + expression))().toString();
        updateDisplay();
        
    } catch (e) {
        expression = 'Error';
        updateDisplay();
    }
}

document.addEventListener('keydown', function(event) {

    const allowedKeys = '0123456789+-*/.=BackspaceEnter';

    if (allowedKeys.includes(event.key)) {

        if (event.key === 'Enter' || event.key === '=') {
            calculate();
        }
        else if (event.key === 'Backspace') {
            deleteLast();
        }
        else {
            appendValue(event.key);
        }
    }
});