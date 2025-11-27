"use strict";
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
        const pcChoice = getRandomChoice();
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
        console.log(winner);
    });
    paperBtn.addEventListener("click", () => {
        winner = getWinner("paperOption");
        console.log(victories);
        p?.classList.remove("d-none");
        p.innerHTML = `Resultado final: ${victories.toString()}`;
        p.textContent = `VICTORIAS: ${victories}`;
    });
    scissorsBtn.addEventListener("click", () => {
        winner = getWinner("scissorsOption");
        console.log(victories);
        alert(victories.length);
    });
    const p = document.querySelector("#helperContainer p");
});
