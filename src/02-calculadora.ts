let waiting: boolean = true;
let accumulatedResult: string = "";

const calculate = () => {
  // const number1: number = +( //para pasar de: string >a> number
  //   document.getElementById("number-1") as HTMLInputElement
  // ).value;
  const input1 = document.getElementById("number-1") as HTMLInputElement | null;
  const number1: number = input1 ? +input1.value : NaN;
  // let number1: number;
  // if (document.getElementById<HTMLInputElement>("number-1")) {
  //   number1 = +document.getElementById<HTMLInputElement>("number-1").value;
  // } else {
  //   number1 = 0;
  // }

  const input2 = document.getElementById("number-2") as HTMLInputElement | null;
  const number2: number = input2 ? +input2.value : NaN;

  // const operatorSelect = document.getElementById(
  //   "operator"
  // ) as HTMLSelectElement;
  // const selectedValue = operatorSelect.value;
  const selectedOperator = (
    document.getElementById("operator") as HTMLOptionElement
  ).value;

  const text = document.getElementById("blockResult") as HTMLParagraphElement;

  if (selectedOperator != "") {
    // if (!isNaN(number1) || !isNaN(number2)) {
    if (number1 != 0 || number2 != 0) {
      switch (selectedOperator) {
        case "addition":
          accumulatedResult += `${number1} + ${number2} = ${
            number1 + number2
          }\n`;
          break;
        case "subtraction":
          accumulatedResult += `${number1} - ${number2} = ${
            number1 - number2
          }\n`;
          break;
        case "multiplication":
          accumulatedResult += `${number1} * ${number2} = ${
            number1 * number2
          }\n`;
          break;
        case "division":
          accumulatedResult += `${number1} ÷ ${number2} = ${
            number1 / number2
          }\n`;
          break;
        case "exponent":
          accumulatedResult += `${number1} ^ (${number2}) = ${
            number1 ** number2
          }\n`;
          break;
        case "modulus":
          accumulatedResult += `Residuo de (${number1}/${number2}) es ${
            number1 % number2
          }\n`;
          break;
        // default:
        //   break;
      }
      text.textContent = accumulatedResult;
    } else {
      text.innerHTML =
        '<i class="fas fa-spinner fa-pulse"></i> Esperando datos.';
    }
  } else {
    text.innerHTML =
      '<i class="fas fa-spinner fa-pulse"></i> El tipo de operación es requerido.';
  }
};
