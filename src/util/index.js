import Toast from 'react-native-toast-message';

export const containsSpecialChars = str => {
  const specialChars = /[`!@#$%^&()_\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
};

export const convertString = variable => {
  if (variable == 'a' || variable == 'A') return 0;
  if (variable == 'b' || variable == 'B') return 1;
  if (variable == 'c' || variable == 'C') return 2;
  if (variable == 'd' || variable == 'D') return 3;
};

export const findValue = (param, rawData) => {
  if (!isNaN(param)) {
    return param;
  } else if (param == '+' || param == '*' || param == ')' || param == '(') {
    return param;
  } else {
    let colOne = convertString(param.charAt(0));
    let rowOne = Number(param.replace(/^\D+/g, ''));
    if (rawData?.[rowOne]?.[colOne] && !isNaN(rawData?.[rowOne]?.[colOne])) {
      return rawData?.[rowOne]?.[colOne];
    } else {
      return '0';
    }
  }
};

export const checkValue = va => {
  if (va == '(' || va == ')' || va == '+' || va == '*' || !isNaN(va)) {
    return true;
  } else {
    return false;
  }
};

export const doesConvertionCompleted = arr => {
  let returnValue = true;
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i] !== '(' &&
      arr[i] !== ')' &&
      arr[i] !== '+' &&
      arr[i] !== '*' &&
      isNaN(arr[i])
    ) {
      returnValue = false;
    }
  }
  return returnValue;
};

export const isHaveValidParanthesis = str => {
  let brackets = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      brackets.push(str[i]);
    } else if (str[i] === ')') {
      if (brackets[brackets.length - 1] === '(') brackets.pop();
      else brackets.push('#');
    }
  }
  return brackets.length;
};

export const convertion = (text, rawData) => {
  if (text?.length == 0) return;
  let updatedEx = '';
  let splited = text.split(/([-+*()\/])/).filter(e => e);
  let i = 0;
  while (true) {
    let temp = findValue(splited[i], rawData);

    if (checkValue(temp)) {
      splited[i] = temp;
      i++;
    } else {
      let tempArray = temp.split(/([-+*()\/])/).filter(e => e);
      splited.splice(...[i, 1].concat(tempArray));
      i = 0;
    }
    if (doesConvertionCompleted(splited)) break;
  }
  if (splited && splited?.length > 0) {
    let reomvedString = splited.filter(e => e);
    updatedEx = updatedEx + reomvedString.join('');
  }
  if (updatedEx) {
    if (updatedEx.endsWith('+') || updatedEx.endsWith('*')) {
         updatedEx = updatedEx.slice(0, -1);
    }
    try {
      return eval(updatedEx).toString();
    } catch {
      return '';
    }
  }
};
