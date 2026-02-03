"use strict";
let studentData = [];
const renderOptionsSelect = () => {
    const inputSelectNombre = document.getElementById("nombresInput");
    studentData.forEach((estudiante) => {
        if (estudiante.nota === null) {
            if (inputSelectNombre !== null) {
                const newOption = document.createElement("option");
                newOption.value = estudiante.id;
                newOption.textContent = estudiante.nombre;
                estudiante.id === 0 ? (newOption.selected = true) : null;
                inputSelectNombre.appendChild(newOption);
            }
        }
    });
};
const renderNotesList = () => {
    const notasList = document.querySelector("ul");
    if (notasList !== null) {
        studentData.forEach((estudiante) => {
            if (estudiante.nota !== null) {
                const newLi = document.createElement("li");
                newLi.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                const newOutput = document.createElement("output");
                newOutput.classList.add("mx-2");
                const notaSamp = document.createElement("samp");
                notaSamp.setAttribute("data-output", "nota");
                notaSamp.textContent = estudiante.nota;
                const rangoSamp = document.createElement("samp");
                rangoSamp.setAttribute("data-output", "rango");
                if (estudiante.nota >= 90 && estudiante.nota <= 100) {
                    rangoSamp.classList.add("badge", "bg-success");
                    rangoSamp.textContent = "Excelente";
                }
                else if (estudiante.nota >= 75 && estudiante.nota <= 89) {
                    rangoSamp.classList.add("badge", "bg-primary");
                    rangoSamp.textContent = "Bueno";
                }
                else if (estudiante.nota >= 51 && estudiante.nota <= 74) {
                    rangoSamp.classList.add("badge", "bg-warning");
                    rangoSamp.textContent = "Regular";
                }
                else if (estudiante.nota >= 0 && estudiante.nota <= 50) {
                    rangoSamp.classList.add("badge", "bg-danger");
                    rangoSamp.textContent = "Insuficiente";
                }
                newOutput.appendChild(notaSamp);
                newOutput.appendChild(rangoSamp);
                const buttonDiv = document.createElement("div");
                buttonDiv.classList.add("d-flex", "justify-content-between", "align-items-center");
                const editButton = document.createElement("button");
                editButton.type = "button";
                editButton.classList.add("btn", "text-warning");
                const editIcon = document.createElement("i");
                editIcon.classList.add("far", "fa-edit");
                editButton.appendChild(editIcon);
                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.classList.add("btn", "text-danger");
                const deleteIcon = document.createElement("i");
                deleteIcon.classList.add("fas", "fa-trash-alt");
                deleteButton.appendChild(deleteIcon);
                buttonDiv.appendChild(editButton);
                buttonDiv.appendChild(deleteButton);
                newLi.appendChild(newOutput);
                newLi.appendChild(buttonDiv);
                notasList.appendChild(newLi);
            }
        });
    }
};
// Buscando datos en localStorage
const loadNotasFromStorage = () => {
    try {
        const dataCruda = localStorage.getItem("notas");
        if (!dataCruda)
            return false;
        if (typeof dataCruda !== "string")
            return false;
        // const dataObj = JSON.parse(dataCruda);
        // if (!Array.isArray(dataObj)) return false;
        // studentData = dataObj;
        studentData = JSON.parse(dataCruda);
        return true;
    }
    catch (error) {
        console.warn("localStorage: datos corruptos o JSON inválido, se restablece.", error);
        try {
            localStorage.removeItem("notas");
            // } catch (e) {
        }
        finally {
            return false;
        }
    }
    finally {
    }
};
const saveNotesToStorage = () => {
    try {
        localStorage.setItem("notas", JSON.stringify(studentData));
    }
    catch (err) {
        console.warn("No se pudo guardar en localStorage:", err);
    }
};
// Inicializar datos, Cargando desde un archivo JSON
const resetStudentData = async () => {
    try {
        const response = await fetch("./data/08-rangoNotas.json");
        studentData = await response.json();
    }
    catch (error) {
        studentData = [
            { id: 1, nombre: "Hugo", nota: null },
            { id: 2, nombre: "Paco", nota: null },
            { id: 3, nombre: "Luis", nota: 100 },
        ];
        console.warn("Error al cargar notas. Se restablecio lista por defecto.", error);
    }
    finally {
        // localStorage.setItem("notas", JSON.stringify(studentData));
        saveNotesToStorage();
    }
};
// Proxy para detectar cambios en studentData y renderizarlos.
studentData = new Proxy(studentData, {
    // (Lllamadas a funciones CRUD por implementar)
    set: (target, property, value) => {
        // llamado a funciones CRUD que deberán implementarse
        return true;
    },
});
loadNotasFromStorage() === false ? resetStudentData() : null;
renderOptionsSelect();
renderNotesList();
document.addEventListener("DOMContentLoaded", () => {
    const helperIcon = document.querySelector(".helper");
    const helperText = document.querySelector("p");
    helperIcon?.addEventListener("mouseover", () => {
        helperIcon.classList.toggle("text-info");
        helperText?.classList.toggle("d-none");
    });
    helperIcon?.addEventListener("mouseout", () => {
        helperIcon.classList.toggle("text-info");
        helperText?.classList.toggle("d-none");
    });
    const notaInput = document.getElementById("notaInput");
    const verRangoBtn = document.getElementById("verRangoBtn");
    const notasList = document.querySelector("ul");
    const inputValidation = (input) => {
        const nota = Number(input.value);
        const parentInput = input.parentElement;
        const smallHelper = parentInput.querySelector("small");
        if (isNaN(nota) || nota < 0 || nota > 100) {
            input.classList.add("is-invalid");
            smallHelper.classList.remove("d-none");
            return false;
        }
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        smallHelper.classList.add("d-none");
        return true;
    };
    let timeout = 0;
    notaInput.addEventListener("input", () => {
        let inputIsValid = false;
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            inputIsValid = inputValidation(notaInput);
            if (inputIsValid) {
                verRangoBtn.classList.remove("d-none");
                verRangoBtn.disabled = false;
            }
            else {
                verRangoBtn.classList.add("d-none");
                verRangoBtn.disabled = true;
            }
        }, 500);
    });
});
