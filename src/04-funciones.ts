// SideBar options->article-card selected
const links = document.querySelectorAll(
  "aside li"
) as NodeListOf<HTMLAnchorElement>;
const cards = document.querySelectorAll("main article");
const showThis = (selectedCard: string) => {
  cards.forEach((card) => {
    card.setAttribute("hidden", "true");
    if (card.id.includes(selectedCard)) {
      card.removeAttribute("hidden");
    }
  });
  links.forEach((link) => {
    link.classList.remove("selected");
    if (link.dataset.option?.includes(selectedCard)) {
      link.classList.add("selected");
    }
  });
};

// Funciones (article-card process)
const getFibonacciSeries = (): void => {
  const fibonacciQuantity = parseInt(
    (document.getElementById("fibonacciQuantity") as HTMLInputElement).value
  );
  const fibonacciResult = document.getElementById("fibonacciResult");
  fibonacciResult!.innerHTML = "";
  const fibonacciSeries: number[] = [];
  for (let index: number = 1; index <= fibonacciQuantity; index++) {
    fibonacciSeries.push(
      index === 1
        ? 0
        : index === 2
        ? 1
        : fibonacciSeries[index - 3] + fibonacciSeries[index - 2]
    );
  }

  !isNaN(fibonacciQuantity)
    ? fibonacciResult!.removeAttribute("hidden")
    : fibonacciResult!.setAttribute("hidden", "true");

  fibonacciSeries.length > 0
    ? fibonacciSeries.forEach((element) => {
        fibonacciResult!.innerHTML += ` <span class="badge rounded-pill bg-secondary">${element}</span> `;
      })
    : (fibonacciResult!.innerHTML += ` <span class="text-danger">La Cantidad es incorrecta.</span> `);

  // console.log(fibonacciSeries);
};

const getPrices = (): void => {
  const costInput = document.getElementById("cost") as HTMLInputElement | null;
  const helpCost = document.getElementById("helpCost");
  const pricesResult = document.getElementById("pricesResult");

  if (!pricesResult || !costInput) {
    console.error("Elemento(s) faltante(s) en el DOM");
    return;
  }

  const cost: number = parseFloat(costInput.value);
  pricesResult.innerHTML = "";
  const prices: number[] = [];
  const margins = [3, 5, 10, 12.5, 50];

  if (isNaN(cost) || cost <= 0) {
    helpCost?.setAttribute("hidden", "true");
    pricesResult.removeAttribute("hidden");
    pricesResult.innerHTML = `<li class="list-group-item text-center text-danger"> ¡Costo inválido! </li>`;
    return;
  }

  for (const m of margins) {
    const price = parseFloat((cost / (1 - m / 100)).toFixed(5));
    prices.push(price);
  }

  prices.forEach((price, index) => {
    pricesResult.innerHTML += `
      <li class="list-group-item">
        Con un margen de <span class="fw-bold">${margins[index]}%</span>,
        el Precio de venta es: <span class="fw-bolder">Bs ${price}.-</span>
      </li>`;
  });

  pricesResult.removeAttribute("hidden");
  // console.log(prices, margins);
};

const getFactorials = (): void => {
  const targetNumberInput = document.getElementById(
    "targetNumberFactorial"
  ) as HTMLInputElement | null;
  const helpNumber = document.getElementById("helpNumberFactorial");
  const factorialsResult = document.getElementById("factorialsResult");

  if (!factorialsResult || !targetNumberInput) {
    console.error("Elemento(s) faltante(s) en el DOM");
    return;
  }

  const targetNumber: number = parseInt(targetNumberInput.value);
  factorialsResult.innerHTML = "";

  let factorial: number = 1;

  if (isNaN(targetNumber) || targetNumber < 0) {
    helpNumber?.removeAttribute("hidden");
    helpNumber?.setAttribute("class", "text-danger");
    factorialsResult.removeAttribute("hidden");
    factorialsResult.innerHTML = `<span class="text-danger"> ¡Número inválido! </span>`;
    return;
  }

  for (let i = 1; i <= targetNumber; i++) {
    factorial *= i;
  }
  helpNumber?.setAttribute("hidden", "yeah!");
  factorialsResult.innerHTML = `
    El factorial de 
    <span class="fw-bold"> ${targetNumber} </span> es: 
    <span class="badge rounded-pill bg-secondary fs-6"> ${factorial} </span>`;

  factorialsResult.removeAttribute("hidden");
};

const getTable = (): void => {
  const multiplierInput = document.getElementById(
    "multiplier"
  ) as HTMLInputElement;
  const helpMultiplier = document.getElementById(
    "helpMultiplier"
  ) as HTMLParagraphElement;
  const multiplicationResult = document.getElementById(
    "multiplicationResult"
  ) as HTMLUListElement;
  multiplicationResult.innerHTML = "";
  helpMultiplier.innerHTML =
    "¿Cuántas veces se van a sumar los números del 1 al 10?";

  const multiplier: number = parseInt(multiplierInput.value);

  if (isNaN(multiplier)) {
    helpMultiplier?.removeAttribute("hidden");
    helpMultiplier?.setAttribute("class", "text-danger");
    helpMultiplier.insertAdjacentHTML(
      "beforeend",
      "<p>Ingresa un número válido.</p>"
    );
    multiplicationResult.removeAttribute("hidden");
    multiplicationResult.innerHTML = `<li class="list-group-item text-center text-danger"> ¡Multiplicador inválido! </li>`;
    return;
  }

  for (let i = 1; i <= 10; i++) {
    const product = i * multiplier;
    multiplicationResult.innerHTML += `
      <li class="list-group-item">
        ${i} x ${multiplier} = 
        <span class="fw-bolder">${product}</span>
      </li>`;
  }
  helpMultiplier?.setAttribute("hidden", "true");
  multiplicationResult.removeAttribute("hidden");
};

// El siguiente ejercicio disgregamos de la función principal la validación del input para ejecutarla en el evento 'input' del mismo.
const validateFizzBuzzQuantity = (): boolean => {
  const limitQuantityInput = document.getElementById(
    "fizzBuzzQuantity"
  ) as HTMLInputElement;
  const helpQuantity = document.getElementById(
    "helpFizzBuzzQuantity"
  ) as HTMLParagraphElement;
  const fizzBuzzResult = document.getElementById(
    "fizzBuzzResult"
  ) as HTMLUListElement;

  fizzBuzzResult.setAttribute("hidden", "true");
  helpQuantity.removeAttribute("hidden");
  const limitQuantity: number = parseInt(limitQuantityInput.value);
  if (!isNaN(limitQuantity) && limitQuantity != 0) {
    helpQuantity?.setAttribute("class", "text-end text-success mt-2");
    helpQuantity.innerHTML = "¡Cantidad válida!";
    return true;
  } else {
    helpQuantity?.setAttribute("class", "text-danger mt-2");
    helpQuantity.innerHTML =
      "¡Cantidad inválida! Ingresa un número entero y diferente a 0.";
    return false;
  }
};
document
  .getElementById("fizzBuzzQuantity")
  ?.addEventListener("input", validateFizzBuzzQuantity);

const getFizzBuzz = (): void => {
  const limitQuantityInput = document.getElementById(
    "fizzBuzzQuantity"
  ) as HTMLInputElement;
  const helpQuantity = document.getElementById(
    "helpFizzBuzzQuantity"
  ) as HTMLParagraphElement;
  const limitQuantity: number = parseInt(limitQuantityInput.value);
  const fizzBuzzResult = document.getElementById(
    "fizzBuzzResult"
  ) as HTMLUListElement;
  fizzBuzzResult.innerHTML = "";

  let fizzBuzzSeries: (number | string)[] = [];
  if (validateFizzBuzzQuantity()) {
    let index: number;
    for (
      limitQuantity > 0 ? (index = 1) : (index = -1);
      limitQuantity > 0 ? index <= limitQuantity : index >= limitQuantity;
      limitQuantity > 0 ? index++ : index--
    ) {
      fizzBuzzSeries.push(
        index % 3 === 0 && index % 5 === 0
          ? "Fizz Buzz"
          : index % 3 === 0
          ? "Fizz"
          : index % 5 === 0
          ? "Buzz"
          : index
      );
    }
  }

  helpQuantity?.setAttribute("hidden", "true");
  fizzBuzzResult.removeAttribute("hidden");
  fizzBuzzSeries.length > 0
    ? fizzBuzzSeries.forEach((element) => {
        fizzBuzzResult.innerHTML += ` <li class="list-group-item">${element}</li> `;
      })
    : validateFizzBuzzQuantity();
};

// Esta función se ejecuta cuando el contenido del DOM ha sido completamente cargado; disgregando la solución del ejercicio.
document.addEventListener("DOMContentLoaded", () => {
  const primesCard = document.getElementById("primesCard") as HTMLElement;

  const primeInput = primesCard.querySelector("input") as HTMLInputElement;
  const primeButton = primesCard.querySelector("button") as HTMLButtonElement;
  const primeResult = primesCard.querySelector(
    "#isPrimeResult"
  ) as HTMLParagraphElement;

  primeInput.addEventListener("input", () => validateInput(primeInput));
  primeButton.addEventListener("click", () =>
    isPrime(primeInput.value, primeResult)
  );
});

const validateInput = (inputNumber: HTMLInputElement): boolean => {
  const helpPrimeNumber = document.querySelector(
    "#helpPrimeNumber"
  ) as HTMLParagraphElement;
  const valid =
    /^[0-9]+$/.test(inputNumber.value) && parseInt(inputNumber.value) >= 2;
  if (valid) {
    inputNumber.style.borderColor = "green";
    helpPrimeNumber.style.color = "green";
    helpPrimeNumber.style.justifySelf = "end";
    helpPrimeNumber.innerText = "Número válido.";
  } else {
    inputNumber.style.borderColor = "red";
    helpPrimeNumber.style.color = "red";
    helpPrimeNumber.style.justifySelf = "start";
    helpPrimeNumber.innerText =
      "¡Número inválido! Ingresa un número entero, positivo y mayor a 1.";
  }
  return valid;
};

const isPrime = (inputNumber: string, result: HTMLElement): void => {
  const number: number = parseInt(inputNumber);
  result.removeAttribute("hidden");
  if (
    validateInput(
      document.getElementById("targetPrimeNumber") as HTMLInputElement
    )
  ) {
    for (let index = 2; index <= Math.sqrt(number); index++) {
      if (number % index === 0) {
        result.setAttribute(
          "class",
          "bg-danger-subtle p-2 rounded text-danger"
        );
        // result.style.color = "red";
        result.innerHTML = `El número <b>${number}</b> NO es primo.`;
        return;
      }
    }
    result.setAttribute("class", "bg-success-subtle p-2 rounded");
    result.style.color = "green";
    result.innerHTML = `El número <span class="badge rounded-pill text-bg-success fs-6">${number}</span> ES primo.`;
  } else {
    result.setAttribute("hidden", "true");
  }
};
