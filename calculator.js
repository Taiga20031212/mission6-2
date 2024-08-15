let currentInput = '';
let operator = '';
let previousInput = '';
let historyElement = document.getElementById('history');

// ページ読み込み時にCookieから最後の結果を読み込む
window.onload = function() {
    let lastResult = getCookie('lastResult');
    if (lastResult) {
        updateDisplay(lastResult);
    }
};

function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function chooseOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (currentInput === '' || previousInput === '') return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result;
    operator = '';
    previousInput = '';
    updateDisplay(result);

    // 結果をCookieに保存
    setCookie('lastResult', result, 7);

    // 履歴に追加
    addHistory(`${prev} ${operator} ${current} = ${result}`);
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('');

    // 履歴をクリア
    historyElement.innerHTML = '';
}

function updateDisplay(value) {
    document.getElementById('display').value = value;
}

function addHistory(entry) {
    let historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = entry;
    historyElement.appendChild(historyItem);
}

// Cookieの設定
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Cookieの取得
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
