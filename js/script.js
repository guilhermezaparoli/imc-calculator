import { Modal } from "./modal.js";
import { AlertError } from "./alert-error.js";
import { CalcIMC, notANumber } from "./utils.js";

const form = document.querySelector("form");
const inputWeight = document.querySelector("#weight");
const inputHeight = document.querySelector("#height");

form.onsubmit = function (event) {
  event.preventDefault();

  const weight = inputWeight.value;
  const height = inputHeight.value;

  const weigthOrHeightIsNotANumber = notANumber(weight) || notANumber(height);
  if (weigthOrHeightIsNotANumber) {
    AlertError.open();
    return;
  }

  AlertError.close();

  const resultImc = CalcIMC(weight, height);

  displayResultMessage(resultImc);
};
inputWeight.oninput = () => AlertError.close();
inputHeight.oninput = () => AlertError.close();

function displayResultMessage(resultImc) {
  const message = `Seu IMC é de: ${resultImc} 
          (${ClassIMC(resultImc)})`;

  Modal.open();
  Modal.message.innerText = message;
}

function ClassIMC(resultImc) {
  if (resultImc < 18.5) {
    return "abaixo do peso";
  } else if (resultImc >= 18.5 && resultImc <= 24.9) {
    return "peso normal";
  } else if (resultImc >= 25 && resultImc <= 29.9) {
    return "sobrepeso";
  } else if (resultImc >= 30 && resultImc <= 34.9) {
    return "obesidade Grau I";
  } else if (resultImc >= 35 && resultImc <= 39.9) {
    return "obesidade Grau III";
  } else {
    return "obesidade Grau III";
  }
}
