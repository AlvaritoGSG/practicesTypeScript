"use strict";
// Manejo de la navegación entre cards
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("aside ul li a");
    const cards = document.querySelectorAll("main article.card");
    links.forEach((link, index) => {
        link.addEventListener("click", () => {
            cards.forEach((card) => card.classList.add("d-none"));
            cards[index].classList.remove("d-none");
            links.forEach((lnk) => lnk.classList.remove("bg-primary", "text-light", "fw-bold"));
            link.classList.add("bg-primary", "text-light", "fw-bold");
        });
    });
});
// ------------------------  CRUD de Cards de Frutas  ------------------------>:
let fruits = ["pitahaya", "chirimoya", "lima"];
// let editedFruitIndex: number = -1;
let editedFruitIndex;
document.addEventListener("DOMContentLoaded", () => {
    const fruitsCard = document.querySelector("#fruitsCard");
    // const fruitInput = fruitsCard.querySelector("input") as HTMLInputElement;
    // const fruitInput = document.getElementById("inputFruit") as HTMLInputElement;
    const fruitInput = fruitsCard.querySelector("#inputFruit");
    const fruitHelp = fruitsCard.querySelector("small");
    const addButton = fruitsCard.querySelector("button.btn-success");
    const updateButton = fruitsCard.querySelector("button.btn-warning");
    const fruitsList = fruitsCard.querySelector("ul");
    let timeout;
    fruits.length > 0 ? renderFruits(fruitsList) : console.log("vacío");
    // const deleteButtons = fruitsCard.querySelectorAll(
    //   "i.fa-trash-alt"
    // ) as NodeListOf<HTMLElement>;
    // const editButtons = fruitsCard.querySelectorAll(
    //   "i.fa-edit"
    // ) as NodeListOf<HTMLElement>;
    const debounceInputValidation = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            inputValidation(fruitInput, fruitHelp);
        }, 500);
    };
    fruitInput.addEventListener("input", () => 
    // inputValidation(fruitInput, fruitHelp, addButton)
    debounceInputValidation());
    addButton.addEventListener("click", () => addFruit(fruitInput, fruitHelp, fruitsList));
    updateButton.addEventListener("click", () => {
        updateFruit(fruitInput, fruitHelp, fruitsList, addButton, updateButton);
    });
});
const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const renderFruits = (ul) => {
    ul.innerHTML = "";
    fruits.forEach((fruit, index) => {
        ul.innerHTML += `
    <li class="list-group-item list-group-item-action d-flex justify-content-between">
  ${capitalize(fruit)}
    <div class="mx-1">
      <button class="far fa-edit text-warning px-1"
        role="button" title="Editar"
        onclick="editFruit(${index})"></button>
      <button class="far fa-trash-alt text-danger mx-1 px-1"
        role="button" title="Eliminar"
        onclick="deleteFruit(${index})"></button>
    </div>
  </li>
    `;
    });
};
const inputValidation = (input, help
// button: HTMLButtonElement
) => {
    const value = input.value.trim().toLowerCase();
    if (value.length === 0) {
        help.classList.add("text-danger");
        help.classList.remove("text-success");
        help.textContent = "El nombre no puede estar vacío.";
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        // button.disabled = true;
        return false;
    }
    else if (fruits.includes(value) && value !== fruits[editedFruitIndex]) {
        help.textContent = "Esa fruta ya existe en la lista.";
        help.classList.add("text-danger");
        help.classList.remove("text-success");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        // button.disabled = true;
        return false;
    }
    else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        help.classList.remove("text-danger");
        help.classList.add("text-success");
        help.textContent = "Texto válido.";
        // button.disabled = false;
        return true;
    }
};
const addFruit = (input, help, list) => {
    const validatedInput = inputValidation(input, help);
    if (!validatedInput)
        return;
    const value = input.value.trim().toLowerCase();
    fruits.push(value);
    renderFruits(list);
    input.value = "";
    input.classList.remove("is-valid");
    help.textContent = "";
};
const deleteFruit = (i) => {
    alert("¿Estás seguro de eliminar esta fruta?");
    // const index = parseInt(i);
    // fruits.splice(index, 1);
    fruits.splice(i, 1);
    renderFruits(document.querySelector("#fruitsCard ul"));
};
const editFruit = (i) => {
    editedFruitIndex = parseInt(i);
    const fruitsCard = document.querySelector("#fruitsCard");
    const fruitInput = fruitsCard.querySelector("input");
    // const fruitHelp = fruitsCard.querySelector("small") as HTMLParagraphElement;
    const addButton = fruitsCard.querySelector("button.btn-success");
    const updateButton = fruitsCard.querySelector("button.btn-warning");
    const fruitLi = fruitsCard.querySelectorAll("ul li")[editedFruitIndex];
    const btns = fruitsCard.querySelectorAll("ul li div");
    fruitLi.classList.add("bg-info", "text-light");
    // btns[editedFruitIndex].classList.add("d-none");
    btns.forEach((btn) => {
        btn.classList.add("d-none");
    });
    // setTimeout(() => {
    //   fruitLi.classList.remove("bg-info", "text-light");
    // }, 1000);
    fruitInput.value = fruits[editedFruitIndex];
    addButton.hidden = true;
    updateButton.hidden = false;
    return editedFruitIndex;
};
const updateFruit = (input, help, list, addButton, updateButton) => {
    if (editedFruitIndex < 0)
        return;
    const validatedInput = inputValidation(input, help);
    if (!validatedInput)
        return;
    const value = input.value.trim().toLowerCase();
    fruits.splice(editedFruitIndex, 1, value);
    renderFruits(list);
    input.value = "";
    input.classList.remove("is-valid");
    help.textContent = "";
    addButton.hidden = false;
    updateButton.hidden = true;
    editedFruitIndex = -1;
};
// ------------------   CRUD Países/Ciudades Capital   ---------------------->:
// let ccList: { country: string; capital: string }[] = [];
let ccList = [
    { country: "Bolivia", capital: "Sucre" },
    { country: "Japón", capital: "Tokio" },
];
let editedCCIndex = -1;
let timeoutCountry;
let timeoutCity;
document.addEventListener("DOMContentLoaded", () => {
    const ccCard = document.querySelector("#ccCard");
    const countryInput = ccCard.querySelector("#inputCountry");
    const capitalInput = ccCard.querySelector("#inputCity");
    const countryHelp = ccCard.querySelector("#inputCountryHelp");
    const capitalHelp = ccCard.querySelector("#inputCapitalHelp");
    const addButton = ccCard.querySelector("button.btn-success");
    const updateButton = ccCard.querySelector("button.btn-warning");
    const cancelButton = ccCard.querySelector("button.btn-outline-danger");
    const ccOutput = ccCard.querySelector("footer ul");
    ccList.length > 0
        ? renderCCList(ccOutput)
        : (ccOutput.innerHTML = "<p>No hay datos.</p>");
    countryInput.addEventListener("input", () => debounceCCInputValidation(timeoutCountry, countryInput, countryHelp));
    capitalInput.addEventListener("input", () => debounceCCInputValidation(timeoutCity, capitalInput, capitalHelp));
    addButton.addEventListener("click", () => addCountryCapital(countryInput, capitalInput, countryHelp, capitalHelp, 
    // addButton,
    ccOutput));
    updateButton.addEventListener("click", () => updateCountryCapital(countryInput, capitalInput, countryHelp, capitalHelp, ccOutput, addButton, updateButton, cancelButton));
    cancelButton.addEventListener("click", () => {
        resetCCForm(countryInput, capitalInput, countryHelp, capitalHelp, addButton, updateButton, cancelButton);
    });
});
const debounceCCInputValidation = (timeout, input, help) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        ccInputValidation(input, help);
    }, 500);
};
const ccInputValidation = (input, helper) => {
    const value = input.value.trim();
    let pathKey;
    const addButton = document.querySelector("#ccCard button.btn-success");
    const updateButton = document.querySelector("#ccCard button.btn-warning");
    input.id === "inputCountry"
        ? (pathKey = "countries")
        : input.id === "inputCity"
            ? (pathKey = "capitals")
            : (pathKey = "");
    if (value.length === 0) {
        helper.classList.add("text-danger");
        helper.classList.remove("text-success");
        helper.textContent = "El campo no puede estar vacío.";
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        addButton.disabled = true;
        updateButton.disabled = true;
        return false;
    }
    else if (pathKey === "countries" &&
        ccList.some((item, index) => item.country.toLowerCase() === value.toLowerCase() &&
            index !== editedCCIndex)) {
        helper.textContent = "Ese país ya existe en la lista.";
        helper.classList.add("text-danger");
        helper.classList.remove("text-success");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        addButton.disabled = true;
        updateButton.disabled = true;
        return false;
    }
    else if (pathKey === "capitals" &&
        ccList.some((item, index) => item.capital.toLowerCase() === value.toLowerCase() &&
            index !== editedCCIndex)) {
        helper.textContent = "Esa capital ya existe en la lista.";
        helper.classList.add("text-danger");
        helper.classList.remove("text-success");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        addButton.disabled = true;
        updateButton.disabled = true;
        return false;
    }
    else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        helper.classList.remove("text-danger");
        helper.classList.add("text-success");
        helper.textContent = "Texto válido.";
        addButton.disabled = false;
        updateButton.disabled = false;
        return true;
    }
};
const renderCCList = (ul) => {
    ul.innerHTML = "";
    ccList.forEach((item, index) => {
        ul.innerHTML += `
    <li class="list-group-item list-group-item-action d-flex justify-content-between">
      <span><strong>${capitalize(item.country)}</strong> - ${capitalize(item.capital)}</span>
      <div class="mx-1">
        <button class="far fa-edit text-warning px-1"
          role="button" title="Editar"
          onclick="editCountryCapital(${index})"></button>
        <button class="far fa-trash-alt text-danger mx-1 px-1"
          role="button" title="Eliminar"
          onclick="deleteCountryCapital(${index})"></button>
      </div>
    </li>
    `;
    });
};
const addCountryCapital = (countryInput, capitalInput, countryHelp, capitalHelp, output) => {
    const validCountry = ccInputValidation(countryInput, countryHelp);
    const validCapital = ccInputValidation(capitalInput, capitalHelp);
    if (!validCountry || !validCapital)
        return;
    const country = countryInput.value.trim();
    const capital = capitalInput.value.trim();
    ccList.push({ country, capital });
    renderCCList(output);
    countryInput.value = "";
    capitalInput.value = "";
    countryInput.classList.remove("is-valid");
    capitalInput.classList.remove("is-valid");
    countryHelp.textContent = "";
    capitalHelp.textContent = "";
};
const deleteCountryCapital = (i) => {
    if (confirm("¿Estás seguro de eliminar este país y su capital?")) {
        ccList.splice(i, 1);
        renderCCList(document.querySelector("#ccCard footer ul"));
    }
};
const editCountryCapital = (index) => {
    editedCCIndex = index;
    const countryInput = document.querySelector("#inputCountry");
    const capitalInput = document.querySelector("#inputCity");
    // const countryHelp: HTMLParagraphElement = document.querySelector(
    //   "#inputCountryHelp"
    // ) as HTMLParagraphElement;
    // const capitalHelp: HTMLParagraphElement = document.querySelector(
    //   "#inputCapitalHelp"
    // ) as HTMLParagraphElement;
    const output = document.querySelector("#ccCard footer ul");
    const addButton = document.querySelector("#ccCard button.btn-success");
    const updateButton = document.querySelector("#ccCard button.btn-warning");
    const cancelButton = document.querySelector("#ccCard button.btn-outline-danger");
    const item = ccList[editedCCIndex];
    const ccLiSelected = output.querySelectorAll("footer ul li")[editedCCIndex];
    ccLiSelected.classList.add("bg-warning-subtle");
    const btns = output.querySelectorAll("footer ul li div");
    btns.forEach((btn) => {
        btn.classList.add("d-none");
    });
    countryInput.value = item.country;
    capitalInput.value = item.capital;
    addButton.hidden = true;
    updateButton.hidden = false;
    cancelButton.hidden = false;
    return editedCCIndex;
};
const updateCountryCapital = (countryInput, capitalInput, countryHelp, capitalHelp, output, addButton, updateButton, cancelButton) => {
    if (editedCCIndex < 0)
        return;
    const validCountry = ccInputValidation(countryInput, countryHelp);
    const validCapital = ccInputValidation(capitalInput, capitalHelp);
    if (!validCountry || !validCapital)
        return;
    const country = countryInput.value.trim();
    const capital = capitalInput.value.trim();
    ccList.splice(editedCCIndex, 1, { country, capital });
    renderCCList(output);
    countryInput.value = "";
    capitalInput.value = "";
    countryInput.classList.remove("is-valid");
    capitalInput.classList.remove("is-valid");
    countryHelp.textContent = "";
    capitalHelp.textContent = "";
    addButton.hidden = false;
    updateButton.hidden = true;
    cancelButton.hidden = true;
    editedCCIndex = -1;
};
const resetCCForm = (countryInput, capitalInput, countryHelp, capitalHelp, addButton, updateButton, cancelButton) => {
    const outputLi = document.querySelectorAll("#ccCard footer ul li");
    const outputBtns = document.querySelectorAll("#ccCard footer ul li div");
    countryInput.value = "";
    capitalInput.value = "";
    countryInput.classList.remove("is-valid");
    capitalInput.classList.remove("is-valid");
    countryInput.classList.remove("is-invalid");
    capitalInput.classList.remove("is-invalid");
    countryHelp.textContent = "";
    capitalHelp.textContent = "";
    addButton.hidden = false;
    updateButton.hidden = true;
    cancelButton.hidden = true;
    outputLi.forEach((li) => {
        li.classList.remove("bg-warning-subtle");
    });
    outputBtns.forEach((btn) => {
        btn.classList.remove("d-none");
    });
    editedCCIndex = -1;
};
