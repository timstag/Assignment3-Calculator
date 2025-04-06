function appendValue(value) {
  document.getElementById('display').value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function calculateResult() {
  const display = document.getElementById('display');
  try {
    display.value = evaluateExpression(display.value);
  } catch (e) {
    display.value = 'Error';
  }
}

function evaluateExpression(expr) {
  const tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g);
  if (!tokens) throw new Error("Invalid input");

  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };
  const output = [];
  const operators = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      output.push(parseFloat(token));
    } else if (['+', '-', '*', '/'].includes(token)) {
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    } else if (token === '(') {
      operators.push(token);
    } else if (token === ')') {
      while (operators.length && operators[operators.length - 1] !== '(') {
        output.push(operators.pop());
      }
      operators.pop();
    }
  }

  while (operators.length) {
    output.push(operators.pop());
  }

  const stack = [];
  for (let token of output) {
    if (typeof token === 'number') {
      stack.push(token);
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(a / b); break;
      }
    }
  }

  return stack[0];
}
