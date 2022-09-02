const COLUMNS = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D'];
export const validateText = str => {
  if (!str) return false;
  let splited = str?.split(/([-+*()\/])/).filter(e => e);
  if (splited && splited?.length == 0) return false;
  let valid = true;
  for (let i = 0; i < splited?.length; i++) {
    if (splited[i].length == 0 && splited[i].length > 3) {
      valid = false;
      break;
    }
    if (splited[i] == '%' || splited[i] == '/' || splited[i] == '-') {
      valid = false;
      break;
    }

    if (
      splited[i].length == 1 &&
      splited[i].toLowerCase() != splited[i].toUpperCase()
    ) {
      valid = false;
      break;
    }
    if (
      typeof splited[i]?.charAt(0) !== 'string' ||
      isNaN(splited[i]?.charAt(1) * 1)
    ) {
      console.log('herer------>1');
      valid = false;
      break;
    }
    if (
      splited[i]?.length !== 1 &&
      isNaN(splited[i].charAt(0)) &&
      !COLUMNS.includes(splited[i].charAt(0))
    ) {
      console.log('herer------>2');
      valid = false;
      break;
    }
    if (Number(splited[i].substring(1)) > 50) {
      valid = false;
      break;
    }
  }
  if (str.endsWith('+') || str.endsWith('*')) return false
  if(!checkExpression(str)) return false
  return valid;
};


export const checkSameCell=(str,cell)=>{
  return (str.indexOf(cell) > -1) 
}

export const convertString = variable => {
  if (variable == 'a' || variable == 'A') return 0;
  if (variable == 'b' || variable == 'B') return 1;
  if (variable == 'c' || variable == 'C') return 2;
  if (variable == 'd' || variable == 'D') return 3;
};

export const checkPremtive = text => {
  let arr = text.split(/([-+*()\/])/).filter(e => e);
  if (arr.length !== 1) return false;
  return !(arr.includes('+') || arr.includes('*'));
};

export const isHaveValidParanthesis = str => {
  return str.charAt(0) == '(' && str.charAt(str.length - 1) == ')';
};

export const isValidBracket = str => {
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

const findPremtiveValue = (param, rawData) => {
  let colOne = convertString(param.charAt(0));
  let rowOne = Number(param.replace(/^\D+/g, ''));
  if (rawData?.[rowOne]?.[colOne] && !isNaN(rawData?.[rowOne]?.[colOne])) {
    return rawData?.[rowOne]?.[colOne];
  } else {
    return '';
  }
};

const findValue = (param, rawData) => {
  if (!isNaN(param)) {
    return param;
  } else if (param == '+' || param == '*' || param == ')' || param == '(') {
    return param;
  } else {
    let colOne = convertString(param.charAt(0));
    let rowOne = Number(param.replace(/^\D+/g, ''));
    if (rawData?.[rowOne]?.[colOne]) {
      return rawData?.[rowOne]?.[colOne];
    } else {
      return '0';
    }
  }
};

const checkValue = va => {
  if (va == '(' || va == ')' || va == '+' || va == '*' || !isNaN(va)) {
    return true;
  } else {
    return false;
  }
};

const checkValueExlcudeNumber = va => {
  if (va == '(' || va == ')' || va == '+' || va == '*' ) {
    return true;
  } else {
    return false;
  }
};


export const checkExpression=(text)=>{
  if(!isNaN(text)) return true
  if(checkPremtive(text)) return true
  let splited = text?.split(/([-+*()\/])/).filter(e => e);
  let count=0
   if(splited?.length>0){
     for(let i=0;i<splited.length;i++){
        if(!checkValueExlcudeNumber(splited[i])) count++
     }
   }
   return count==2?true:false
}

const doesConvertionCompleted = arr => {
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

export const stringConvertion = (text, rowData) => {
  let updatedEx = '';
  let splited = text.split(/([-+*()\/])/).filter(e => e);
  if (checkPremtive(text)) {
    return findPremtiveValue(text, rowData);
  }
  let i = 0;
  while (true) {
    let temp = findValue(splited[i], rowData);
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
    } catch(err) {
      return '';
    }
  }
};
