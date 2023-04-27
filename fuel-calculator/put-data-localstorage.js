"use strict";
import { getData } from "./get-data.js";

export function putDataLocalStorage() {
  const register = getData();
  // Obtener el valor actual almacenado en el Local Storage
}

//################################################
//Accedemos a los valores guardados en el localStorage (fuera del scope del event listener)

// const storedRegister = localStorage.getItem("registros");
// const storedRegisterParsed = JSON.parse(storedRegister);

// console.log(storedRegisterParsed);

// let lr = storedRegisterParsed.length - 1; //lR = last register

// console.log("último indice del array:", lr);
// console.log(storedRegisterParsed[lr]["Data y hora"]);

// const results = document.getElementById("results");
