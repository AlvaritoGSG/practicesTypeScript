"use strict";
console.group("Desde script con TS");
let lastName = "S. G.";
console.log("Apellido:", lastName);
const greet = () => {
    console.log("Hello");
};
greet();
// TIPOS DE VARIABLES:
var variableGlobal = 8;
console.log("vG:", variableGlobal);
let variableLocal = true;
console.log("vL:", variableLocal);
const profile = "SOFTWARE_ENGINEER";
console.log(profile);
// OPERADORES MATEMÁTICOS:
const var1 = 10;
let division;
division = var1 / 2;
console.log(`${var1} / 2 = ${division}`);
let modulo = var1 % 2;
console.log(`Residuo de la división (${var1} / 2) es ${modulo}`);
modulo = var1 % 3;
console.log(`Residuo de la división (${var1} / 3) es ${modulo}`);
const potencia = var1 ** 2;
// potencia = var1 ** 3;
// console.log(`${var1} ^ 3 = ${potencia}`);
console.log(`${var1} ^ 2 = ${potencia}`);
console.log(`Radical adaptada: ${var1} ^ (1/3) = ${var1 ** (1 / 3)}`);
const var2 = -7;
let cocienteEntero;
// Siempre al valor inferior (-∞)
cocienteEntero = Math.floor(var2 / 3);
console.log(`Parte entera de una división(1)-piso: ${var2} / 3 = ${cocienteEntero}`);
// siempre hacia arriba
cocienteEntero = Math.ceil(var2 / 3);
console.log(`Parte entera de una división(1)-techo: ${var2} / 3 = ${cocienteEntero}`);
// Elimina la parte decimal, recorta hacia 0 (recta real)
cocienteEntero = Math.trunc(var2 / 3);
console.log(`Parte entera de una división(1): ${var2} / 3 = ${cocienteEntero}`);
// Convierte a número entero con signo (≈ Match.trunc, pero) con limitación de rango: ≈ ±2.1
cocienteEntero = (var2 / 3) >> 0; //Desplazamiento a la derecha, 0 bits
console.log(`Parte entera de una división(2): ${var2} / 3 = ${cocienteEntero}`);
// Igual que >>0, pero con OR a nivel de bits, también fuerza conversión a int32 con signo.
cocienteEntero = (var2 / 3) | 0;
console.log(`Parte entera de una división(3): ${var2} / 3 = ${cocienteEntero}`);
// Si el decimal < 0.5 → baja al entero inferior.
// Si el decimal ≥ 0.5 → sube al entero superior.
console.log(7 / 6);
console.log(Math.round(7 / 6));
console.log(11 / 6);
console.log(Math.round(11 / 6));
console.log(9 / 6);
console.log(Math.round(9 / 6));
// console.log(21 / 6);
// console.log(Math.round(21 / 6));
console.log(27 / 6);
console.log(Math.round(27 / 6));
// OPERADORES LÓGICOS:
// and &&
// or ||
// negación != (forma corta, bit a bit: ~)
console.log(var1 != var2);
let var3 = true;
console.log(var3 != var3);
console.groupEnd();
