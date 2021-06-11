//DOM elements

const resultEL = document.getElementById('result');
const lengthEL = document.getElementById('length');
const uppercaseEL = document.getElementById('uppercase');
const lowercaseEL = document.getElementById('lowercase');
const numbersEL = document.getElementById('numbers');
const symbolsEL = document.getElementById('symbols');
const generateEL = document.getElementById('generate');
const clipboardEL = document.getElementById('clipboard');

//Copy Password to ClipBoard
clipboardEL.addEventListener('click', () =>{
  const textarea = document.createElement('textarea');
  const password = resultEL.innerText;
  if(!password)
    return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();

  alert('Password copied to clipboard : '+ password)
});




//Generate Button EveLis
generateEL.addEventListener('click',() =>{

  //Number ( + converts string to Number)
  const length = +lengthEL.value;

  //True or False
  const hasUpper = uppercaseEL.checked;
  const hasLower = lowercaseEL.checked;
  const hasNumber = numbersEL.checked;
  const hasSymbol = symbolsEL.checked;

  resultEL.innerText = generatePassword(length,hasUpper,hasLower,hasNumber,hasSymbol);

})

//Generate Password Function
function  generatePassword(length,upper,lower,number,symbol){
   
  //1. Initialize Password variable
  //2. Filter out Unchecked
  //3. Loop over Length -> call generator function for each type
  //4. Add final Password and return it

  let generatedPassword = '';

  const typesCount = upper+lower+number+symbol;

  if(typesCount===0){
    return '';
  }

  const typesArr = [{upper},{lower},{number},{symbol}].filter(
    item => Object.values(item)[0]
  );

  for(let i=0;i<length;i++){

    let type = typesArr[Math.floor(Math.random()*typesArr.length)];
    const funcName = Object.keys(type)[0];

    generatedPassword+=randomFun[funcName]();

  }
  
  return generatedPassword; 
   
  

}


const randomFun = {
  upper: getUpperChar,
  lower: getLowerChar,
  number: getRandomNumber,
  symbol: getRandomSymbol
};



function getUpperChar(){
  //Upper case : 65 to 90
  return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}

function getLowerChar(){
  //lower case : 97 to 122
  return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}

function getRandomNumber(){
  //Number from 0 to 9  : 48 to 57
  return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}

function getRandomSymbol(){

  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random()*symbols.length)];
}


