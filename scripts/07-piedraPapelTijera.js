"use strict";
let pcChoice;
let winner;
let victories = [];
document.addEventListener("DOMContentLoaded", () => {
    const choices = ["rockOption", "paperOption", "scissorsOption"];
    const getRandomChoice = () => {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    };
    const [rockBtn, paperBtn, scissorsBtn] = [
        document.getElementById("rockOption"),
        document.getElementById("paperOption"),
        document.getElementById("scissorsOption"),
    ];
    const getWinner = (userChoice) => {
        pcChoice = getRandomChoice();
        if (userChoice === pcChoice) {
            victories.push("draw");
        }
        else if (userChoice === "rockOption") {
            pcChoice === "scissorsOption"
                ? victories.push("userWin")
                : victories.push("pcWin");
        }
        else if (userChoice === "paperOption") {
            pcChoice === "rockOption"
                ? victories.push("userWin")
                : victories.push("pcWin");
        }
        else if (userChoice === "scissorsOption") {
            pcChoice === "paperOption"
                ? victories.push("userWin")
                : victories.push("pcWin");
        }
        return victories[victories.length - 1];
    };
    rockBtn.addEventListener("click", () => {
        winner = getWinner("rockOption");
        renderResults("rockOption");
    });
    paperBtn.addEventListener("click", () => {
        winner = getWinner("paperOption");
        renderResults("paperOption");
    });
    scissorsBtn.addEventListener("click", () => {
        winner = getWinner("scissorsOption");
        renderResults("scissorsOption");
    });
    const pInitialHelp = document.querySelector("#helperContainer p");
    const resultContainer = document.getElementById("resultContainer");
    const [pcSelectionOutput, userSelectionOutput] = resultContainer.querySelectorAll("p output");
    const resultOutput = document.getElementById("resultOutput");
    const scoreContainerTable = document.getElementById("scoreContainer");
    const [userVictoriesOutput, pcVictoriesOutput] = scoreContainerTable.querySelectorAll("thead output");
    const historyVictoriesOutput = scoreContainerTable.querySelector("tbody");
    const drawsOutput = scoreContainerTable.querySelector("tfoot output");
    const renderResults = (userChoice) => {
        // Render Choices
        pInitialHelp.classList.add("d-none");
        resultContainer.classList.remove("d-none");
        // pcSelectionOutput.textContent =
        //   pcChoice == "rockOption"
        //     ? "ROCA"
        //     : pcChoice == "paperOption"
        //     ? "PAPEL"
        //     : "TIJERAS";
        pcSelectionOutput.textContent = pcChoice
            .replace("Option", "")
            .toUpperCase();
        userSelectionOutput.textContent = userChoice
            .replace("Option", "")
            .toUpperCase();
        // Render result
        if (winner === "draw") {
            resultOutput.classList.remove("bg-success", "bg-danger");
            resultOutput.classList.add("bg-secondary");
            resultOutput.textContent = "¡EMPATE!";
        }
        else if (winner === "userWin") {
            resultOutput.classList.remove("bg-secondary", "bg-danger");
            resultOutput.classList.add("bg-success");
            resultOutput.textContent = "¡GANASTE!";
        }
        else if (winner === "pcWin") {
            resultOutput.classList.remove("bg-success", "bg-secondary");
            resultOutput.classList.add("bg-danger");
            resultOutput.textContent = "¡GANÓ TU PC!";
        }
        // Render score
        userVictoriesOutput.textContent = victories
            .filter((v) => v === "userWin")
            .length.toString();
        pcVictoriesOutput.textContent = victories
            .filter((v) => v === "pcWin")
            .length.toString();
        drawsOutput.textContent = victories
            .filter((v) => v === "draw")
            .length.toString();
        // Render history
        historyVictoriesOutput.classList.remove("d-none");
        victories.forEach((v, i) => {
            if (i + 1 > historyVictoriesOutput.rows.length) {
                // historyVictoriesOutput.innerHTML += `<tr>
                //   <td>${i + 1}</td>
                //   <td>${victories.filter((val) => val === "userWin").length}</td>
                //   <td>${victories.filter((val) => val === "pcWin").length}</td>
                // </tr>`;
                const newRow = historyVictoriesOutput.insertRow();
                const cellIn = newRow.insertCell(0);
                const cellUs = newRow.insertCell(1);
                const cellPc = newRow.insertCell(2);
                cellIn.textContent = (i + 1).toString();
                cellUs.textContent = victories
                    .filter((val) => val === "userWin")
                    .length.toString();
                cellPc.textContent = victories
                    .filter((val) => val === "pcWin")
                    .length.toString();
            }
        });
    };
    const cleanBtn = scoreContainerTable.querySelector("tfoot button");
    cleanBtn.addEventListener("click", () => {
        victories = [];
        historyVictoriesOutput.innerHTML = "";
        userVictoriesOutput.textContent = "0";
        pcVictoriesOutput.textContent = "0";
        drawsOutput.textContent = "0";
        resultContainer.classList.add("d-none");
        pInitialHelp.classList.remove("d-none");
    });
});
