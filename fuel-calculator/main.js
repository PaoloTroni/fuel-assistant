"use strict";
import { getData } from "./functions/get-data.js";
import { printData } from "./functions/print-data.js";

let registers = JSON.parse(localStorage.getItem("registers"));

// Control del botón de gestionar datos almacenados

// Antes de nada recuperamos el valor guardado en el local storage (si existe) para saber que tenemos que hacer con él botón

// Creamos el botón de gestión de datos
const insertRegister = document.querySelector("#insertRegister");
const btnQueryData = document.createElement("button");
btnQueryData.textContent = "Gestionar datos almacenados";
insertRegister.appendChild(btnQueryData);

// ponemos el event listener en el botón. Si hay datos nos manda a la página correspondiente. En caso contrario dice al usuario que no hay datos y que cree uno.

btnQueryData.addEventListener("click", () => {
  registers
    ? (location.href = "manage-data.html") //location.href es el "equivalente del <a> en JS"
    : alert(
        "No hay datos para gestionar. Por favor, inserte algún registro primero."
      );
});

// // Proseguimos a pintar en la página los datos recogidos en el formulario y procesados

const dataForCalc = document.querySelector("#dataForCalc");
dataForCalc.addEventListener("submit", (e) => {
  try {
    e.preventDefault(); //prevenimos el comportamento predefinido del submit
    const register = getData();
    if (!register || register === null) {
      e.target.reset();
      throw new Error("Por favor, inserte los datos correctamente");
    }
    e.target.reset(); //Eso es para resetear el formulario una vez que se hay procesados sus datos (se procesan sus datos en la función getData)

    results.innerHTML = ""; // antes de poner los datos llenamos la <section id="results"> con "nada" para que al hacer una nueva consulta se borre los datos presentados anteriormente.

    //la función correpondiente recibe los datos del formulario por parametro y los pinta en la pantalla.
    printData(register);

    // Ponemos los datos en el Local Storage

    // Verificar si ya existe un array de registros almacenado en el Local Storage y si no existe crear uno vacío
    if (registers === null) {
      registers = [];
    }
    registers.push(register); //ponemos los register data en el array de registers

    // Pasamos a JSON el array de registers y lo ponemos en los registros del localStorage:
    localStorage.setItem(`registers`, JSON.stringify(registers));
  } catch (error) {
    console.error(error);
    const pError = document.createElement("p");
    pError.classList.add("error");
    pError.textContent = "Por favor, inserte los datos correctamente.";
    document.querySelector("#insertRegister").appendChild(pError);
  }
});
