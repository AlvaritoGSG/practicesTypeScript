"use strict";
let numbers = [1, 2, 3, 2];
let strings = ["Hola", "don", "Pepito"];
document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("nsCard");
    const input = card.querySelector("#input");
    const inputHelper = card.querySelector(".form-text");
    const addBtn = card.querySelector(".btn-success");
    const [outputSuma, outputOracion] = card.querySelectorAll("output");
    const [cleanSuma, cleanOracion] = card.querySelectorAll(".btn-danger");
    let timeout = 0;
    const renderOutput = () => {
        if (numbers.length > 0) {
            outputSuma.textContent = `${numbers.reduce((a, b) => a + b, 0)}`;
            outputSuma.closest("article").classList.remove("d-none");
        }
        else {
            outputSuma.textContent = "";
            outputSuma.closest("article").classList.add("d-none");
        }
        if (strings.length > 0) {
            outputOracion.textContent = `${strings.join(" ")}.`;
            outputOracion.closest("article").classList.remove("d-none");
        }
        else {
            outputOracion.textContent = "";
            outputOracion.closest("article").classList.add("d-none");
        }
    };
    const inputValidation = () => {
        const value = input.value.trim();
        if (value.length === 0) {
            // addBtn.disabled = true;
            //   inputHelper.textContent = "El campo no puede estar vacío.";
            //   inputHelper.classList.remove("text-danger", "text-success");
            //   inputHelper.classList.add("text-danger");
            //   input.classList.remove("is-invalid", "is-valid");
            //   input.classList.add("is-invalid");
            return false;
        }
        const numberValue = Number(value);
        // addBtn.disabled = false;
        if (!isNaN(numberValue)) {
            inputHelper.textContent = "Agregas un Número a la Suma.";
            inputHelper.classList.remove("text-danger", "text-success");
            inputHelper.classList.add("text-success");
            input.classList.remove("is-invalid", "is-valid");
            input.classList.add("is-valid");
            return true;
        }
        else {
            inputHelper.textContent = "Agregas una Palabra a la Oración.";
            inputHelper.classList.remove("text-danger", "text-success");
            inputHelper.classList.add("text-success");
            input.classList.remove("is-invalid", "is-valid");
            input.classList.add("is-valid");
            return true;
        }
        // input.value = "";
    };
    const debounceInputValidation = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            inputValidation();
        }, 350);
    };
    const addItem = () => {
        if (!inputValidation())
            return;
        const value = input.value.trim();
        const numberValue = Number(value);
        if (!isNaN(numberValue)) {
            numbers.push(numberValue);
        }
        else {
            strings.push(value);
        }
        input.value = "";
        input.focus();
        input.classList.remove("is-valid", "is-invalid");
        inputHelper.classList.remove("text-danger", "text-success");
        inputHelper.textContent = "Escribe otro Número o Palabra...";
        renderOutput();
    };
    // Initial render
    renderOutput();
    input.addEventListener("input", debounceInputValidation);
    addBtn.addEventListener("click", addItem);
    const form = card.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addItem();
    });
    cleanSuma.addEventListener("click", () => {
        numbers = [];
        renderOutput();
        input.focus();
    });
    cleanOracion.addEventListener("click", () => {
        strings = [];
        renderOutput();
        input.focus();
    });
});
