const resultEl = document.querySelector('.result');
const btns = document.querySelectorAll('#btn');

let result = ''; 
let currentInput = '';

const operators = ['+', '-', 'x', '/', '%'];

const isOperator = (value) => operators.includes(value);

const calculate = (num1, operator, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return 'Error';
            }
            return num1 / num2;
        case '%':
            return num1 % num2;
        default:
            return num2;
    }
};

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const inputValue = e.target.textContent;

        if (inputValue === 'AC') {
            result = '';
            currentInput = '';
        } else if (inputValue === '+/-') {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) * -1).toString();
            }
        } else if (inputValue === '=') {
            if (currentInput) {
                result += currentInput;
                currentInput = '';
                result = calculate(...result.split(/([+\-x/])/)).toString();
            }
        } else if (isOperator(inputValue)) {
            if (currentInput) {
                result += currentInput + inputValue;
                currentInput = '';
            } else if (result && !isOperator(result.slice(-1))) {
                result += inputValue;
            }
        } else if (inputValue === '.') {
            if (!currentInput.includes('.')) {
                currentInput += inputValue;
            }
        } else {
            currentInput += inputValue;
        }

        resultEl.textContent = currentInput || result || '0';
    });
});