"use strict";
const cardFooter = document.querySelector(".card-footer");
const limitInput = document.getElementById("limitInput");
const limitInputHelp = document.getElementById("limitInputHelp");
const skipInputHelp = document.getElementById("skipInputHelp");
const result = document.getElementById("result");
const process = () => {
    const limitInputValue = +limitInput.value;
    const skipInput = document.getElementById("skipInput");
    const skipInputValue = +skipInput.value;
    result.innerHTML = "";
    const listResult = [];
    if (skipInputValue >= 1 && limitInputValue > 0) {
        console.log("WE'RE CASE 1 (++)");
        for (let index = 0; index <= limitInputValue; index += skipInputValue) {
            listResult.push(index);
            index
                ? (result.innerHTML += `<samp class="badge rounded-pill text-bg-info mx-1">${index}</samp>`)
                : null;
        }
        limitInputHelp.setAttribute("hidden", "true");
        skipInputHelp.setAttribute("hidden", "true");
        result.classList.add("text-start");
        result.classList.remove("text-end");
    }
    else if (skipInputValue < 0 && limitInputValue > 0) {
        console.log("WE'RE CASE 2 (+-)");
        for (let index = limitInputValue; index >= 0; index += skipInputValue) {
            listResult.push(index);
            index
                ? (result.innerHTML += `<samp class="badge rounded-pill text-bg-info mx-1">${index}</samp>`)
                : null;
        }
        limitInputHelp.setAttribute("hidden", "true");
        skipInputHelp.setAttribute("hidden", "true");
        result.classList.remove("text-start");
        result.classList.add("text-end");
    }
    else if (skipInputValue < 0 && limitInputValue < 0) {
        console.log("WE'RE CASE 3 (--)");
        for (let index = limitInputValue; index <= 0; index -= skipInputValue) {
            listResult.push(index);
            index
                ? (result.innerHTML += `<samp class="badge rounded-pill text-bg-info mx-1">${index}</samp>`)
                : null;
        }
        limitInputHelp.setAttribute("hidden", "true");
        skipInputHelp.setAttribute("hidden", "true");
        result.classList.remove("text-start");
        result.classList.add("text-end");
    }
    else if (skipInputValue >= 1 && limitInputValue < 0) {
        console.log("WE'RE CASE 4 (-+)");
        for (let index = 0; index >= limitInputValue; index -= skipInputValue) {
            listResult.push(index);
            index < 0
                ? (result.innerHTML += `<samp class="badge rounded-pill text-bg-info mx-1">${index}</samp>`)
                : null;
        }
        limitInputHelp.setAttribute("hidden", "true");
        skipInputHelp.setAttribute("hidden", "true");
        result.classList.remove("text-end");
        result.classList.add("text-start");
    }
    else if (skipInputValue == 0 && limitInputValue != 0) {
        listResult.push(limitInputValue);
        result.innerHTML = `<samp class="badge rounded-pill text-bg-info mx-1">${limitInputValue}</samp>`;
        limitInputHelp.setAttribute("hidden", "true");
        skipInputHelp.removeAttribute("hidden");
    }
    else if (limitInputValue == 0) {
        limitInputHelp.removeAttribute("hidden");
        skipInputHelp.setAttribute("hidden", "true");
        cardFooter.setAttribute("hidden", "true");
    }
    cardFooter.removeAttribute("hidden");
    //   console.log("Retornando...", listResult);
    return listResult;
};
const processEven = () => {
    const listResult = process();
    result.innerHTML = "";
    listResult.forEach((num) => {
        if (num % 2 == 0) {
            num != 0
                ? (result.innerHTML += `<samp class="badge rounded-pill text-bg-warning mx-1">${num}</samp>`)
                : null;
        }
    });
};
const processOdd = () => {
    const listResult = process();
    result.innerHTML = "";
    listResult.forEach((num) => {
        if (num % 2 != 0) {
            result.innerHTML += `<samp class="badge rounded-pill text-bg-danger mx-1">${num}</samp>`;
        }
    });
};
