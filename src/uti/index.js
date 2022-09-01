const COLUMNS = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D'];
export const validateText = str => {
  if (!str) return false;
  let splited = str?.split(/([-+*()\/])/).filter(e => e);
  console.log(splited,"splited")
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
      console.log("herer------>1")
      valid = false;
      break;
    }
    if (
      splited[i]?.length !== 1 &&
      isNaN(splited[i].charAt(0)) &&
      !COLUMNS.includes(splited[i].charAt(0))
    ) {
      console.log("herer------>2")
      valid = false;
      break;
    }
    if (Number(splited[i].substring(1)) > 50) {
      valid = false;
      break;
    }
  }
  if (str.endsWith('+') || str.endsWith('*')) return false;
  // let temp=str.split(/([-+*()\/])/).filter(e => e)
  // console.log(temp,"temptemp")
  // // if(temp?.length>3) return false
  return valid;
};

const convertString = variable => {
  if (variable == 'a' || variable == 'A') return 0;
  if (variable == 'b' || variable == 'B') return 1;
  if (variable == 'c' || variable == 'C') return 2;
  if (variable == 'd' || variable == 'D') return 3;
};

export const checkPremtive = (text) => {
  let arr=text.split(/([-+*()\/])/).filter(e => e)
  if (arr.length !== 1) return false;
  return !(arr.includes('+') || arr.includes('*'));
};


export const isHaveValidParanthesis = str => {
  return (str.charAt(0)=='(' && str.charAt(str.length - 1)==')')
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

export const stringConvertion = (text, rowData) => {
  let updatedEx = '';
  let splited = text.split(/([-+*()\/])/).filter(e => e);
  if (checkPremtive(text)) {
    return findPremtiveValue(text, rowData);
  }

  console.log(splited,"splited")

  return text
};
