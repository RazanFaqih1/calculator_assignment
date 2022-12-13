let numbers = [];
let opperations = [];
let ans = false;
let currentNumber = '0';
let operationMode = false;

function numberPress(num) {

    if (currentNumber === '0') {
        currentNumber = num;
    }
    else {
        currentNumber += num;
    }

    display(currentNumber);
    operationMode = true;
}
function reset(num = '0') {
    numbers = [];
    opperations = [];
    ans = false;
    currentNumber = num;

}
function display(num = '0') {
    const displaied_num = document.getElementById('display');
    num_lenght = num.length;
    displiedLength = displaied_num.length;
    if (num_lenght >= 1 && num_lenght <= 5) {
        displaied_num.style.fontSize = '40px';
    }
    else if (num_lenght == 6) {
        displaied_num.style.fontSize = '35px';
    }
    else if (num_lenght == 7) {
        displaied_num.style.fontSize = '30px';
    }
    else if (num_lenght == 8) {
        displaied_num.style.fontSize = '25px';
    }
    else if (num_lenght == 9) {
        displaied_num.style.fontSize = '20px';
    }

    if (num == 'Error') {
        displaied_num.style.fontSize = '25px';
    }
    displaied_num.textContent = num;


}
function operatorPress(oprator) {
    if (currentNumber === '0' && oprator === 'subtract') {
        currentNumber = '-';
        display(currentNumber);
    }
    if (!operationMode) {
        return -1;
    }
    opperations.push(oprator);
    if (!ans) {
        numbers.push(currentNumber);
    }
    if (oprator === 'equal') {
        if (ans) {
            numbers.push(currentNumber);
        }
        currentNumber = claculate();

        display(currentNumber);

    } else {
        display(currentNumber);
        currentNumber = '0';
        operationMode = false;
    }

}

function claculate() {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (i === 0) {
            total = Number.parseFloat(numbers[i]);
        }

        else {
            total = operate(total, Number.parseFloat(numbers[i]), opperations[i - 1]);
        }
    }
    reset();
    let total_str;
    total_str = total.toString();
    numbers.push(total_str);
    if (total_str.length > 9) {
        total_str = parseFloat(total_str);
        total_str = total_str.toFixed(7);
    }

    if (total_str == 'NaN' || total_str == 'Infinity') {
        total_str = 'Error';
    }

    currentNumber = total_str;
    ans = true;
    operationMode = true;
    return currentNumber;
}



function operate(val1, val2, op) {
    switch (op) {
        case 'add':
            return val1 + val2;
        case 'subtract':
            return val1 - val2;
        case 'multiply':
            return val1 * val2;
        case 'divide':
            return val1 / val2;
        default:
            return '0';

    }
}
function handelButtonPress(btnId) {
    if (btnId === 'dot') {
        const dot_char = /[.]/;
        let result = dot_char.test(currentNumber);
        if (result == false) {
            currentNumber = currentNumber.concat('.');
        } else {
            return -1;
        }
        display(currentNumber);
    }
    else if (btnId == 'clear') {
        reset();
        display('0');
    }
    else if (!isNaN(Number.parseInt(btnId))) {
        numberPress(btnId);
    } else {
        operatorPress(btnId);
    }

}



function the_calculator() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => handelButtonPress(button.id))
    });
}

the_calculator();