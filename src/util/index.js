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
  } else if (param == '+' || param == '*') {
    return param;
  } else {
    let colOne = convertString(param.charAt(0));
    let rowOne = Number(param.replace(/^\D+/g, ''));
    if (rawData?.[rowOne]?.[colOne]) {
      return rawData?.[rowOne]?.[colOne];
    } else {
      return '';
    }
  }
};


export const checkValue = va => {
  if (va !== '+' && va !== '*' && isNaN(va)) {
    return false;
  } else {
    return true;
  }
};

export const doesConvertionCompleted = arr => {
  let returnValue = true;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '+' && arr[i] !== '*' && isNaN(arr[i])) {
      returnValue = false;
    }
  }
  return returnValue;
};

export const convertion = (text, rawData) => {
  if (text?.length == 0) return;
  let updatedEx = '';
  let splited = text.split(/([-+*\/])/);
  let i = 0;
  while (true) {
    let temp = findValue(splited[i], rawData);
    if (checkValue(temp)) {
      splited[i] = temp;
      i++;
    } else {
      let tempArray=temp.split(/([-+*\/])/)
      splited.splice(...[i,1].concat(tempArray))
      i=0
    }
    if (doesConvertionCompleted(splited)) break;
  }
  if (splited && splited?.length > 0) {
    updatedEx = updatedEx + splited.join('');
  }
  if (updatedEx) {
    if (updatedEx.endsWith('+') || updatedEx.endsWith('*')) {
      updatedEx = updatedEx.slice(0, -1);
    }
    return eval(updatedEx).toString();
  }
};
