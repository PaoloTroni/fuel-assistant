"use strict";
import { getData } from "./get-data.js";

// Control del botón de gestionar datos almacenados

// Antes de nada recuperamos el valor guardado en el local storage (si existe) para saber que tenemos que hacer con él botón
let registers = JSON.parse(localStorage.getItem("registers"));
//Creamos el botón de gestión de datos
const insertRegister = document.querySelector("#insertRegister");
const btnQueryData = document.createElement("button");
btnQueryData.innerHTML = "Gestionar datos almacenados";
insertRegister.appendChild(btnQueryData);
//ponemos el event listener en el botón. Si hay datos nos manda a la página correspondiente. En caso contrario dice al usuario que no hay datos y que cree uno.
btnQueryData.addEventListener("click", () => {
  registers
    ? (location.href = "manage-data.html") //location.href es el "equivalente del <a> en JS"
    : alert(
        "No hay datos para gestionar. Por favor, inserte algún registro primero."
      );
});

// Proseguimos a pintar en la página los datos recogidos en el formulario y procesados

const dataForCalc = document.querySelector("#dataForCalc");
dataForCalc.addEventListener("submit", (e) => {
  e.preventDefault(); //prevenimos el comportamento predefinido del submit
  const register = getData();
  e.target.reset(); //Eso es para resetear el formulario una vez que se hay procesados sus datos (se procesan sus datos en la función getData)

  //seleccionamos y creamos los elementos del DOM
  const results = document.querySelector("#results");
  results.innerHTML = ""; // antes de poner los datos llenamos la <section id="results"> con "nada" para que al hacer una nueva consulta se borre los datos presentados anteriormente.
  const titleResults = document.createElement("h3");
  const alias = document.createElement("h3");
  const listResults = document.createElement("ul");
  const estimations = document.createElement("p");
  const observation = document.createElement("p");

  //Añadimos el texto con la fecha y la hora
  titleResults.textContent = `Datos insertados el ${register["Fecha y hora"]}`;

  //Añadimos el texto del Alias
  alias.textContent = `${register.alias}`;

  // Añadir elementos a la lista
  const liLitersFuel = document.createElement("li");
  liLitersFuel.textContent = `Litros repostados: ${register["Litros repostados"]} litro(s)`;
  listResults.appendChild(liLitersFuel);

  const liPrice = document.createElement("li");
  liPrice.textContent = `Precio por litro: € ${register["Precio"]}`;
  listResults.appendChild(liPrice);

  const liKms = document.createElement("li");
  liKms.textContent = `Kilometros recorridos: ${register["Kilometros recorridos"]} km(s)`;
  listResults.appendChild(liKms);

  const liAvgL100 = document.createElement("li");
  liAvgL100.textContent = `Tu coche hizo una media de ${register["Consumo medio en L/100kms"]}L/100kms`;
  listResults.appendChild(liAvgL100);

  const liAvgEuros100 = document.createElement("li");
  liAvgEuros100.textContent = `La media de gasto fue de de € ${register["Gasto medio en €/100kms"]} por cada 100 kms recorridos`;
  listResults.appendChild(liAvgEuros100);

  const liAvgKmsPerL = document.createElement("li");
  liAvgKmsPerL.textContent = `Con un litro de combustible pudiste recorrer en media ${register["Consumo medio en kms X Litro"]} kms`;
  listResults.appendChild(liAvgKmsPerL);

  const liPricePerKm = document.createElement("li");
  liPricePerKm.textContent = `Cada km te costó € ${register["Gasto medio por Km"]}`;
  listResults.appendChild(liPricePerKm);

  estimations.textContent = `Con estos datos, llenar los ${register["Capacidad del depósito"]} litros del depósito de tu coche costaría € ${register["Costo estimado para llenar el depósito"]} y se
  estima que podrías recorrer ${register["Autonomia estimada del depósito"]} kms antes de quedar completamente sin combustible.`;

  observation.textContent =
    "Los datos tienen un pequeño margen de imprecisión debido al redondeo de los decimales.";

  // Añadir el título y la lista a la sección de resultados
  results.appendChild(titleResults);
  results.appendChild(alias);
  results.appendChild(listResults);
  results.appendChild(estimations);
  results.appendChild(observation);

  // Ponemos los datos en el Local Storage

  // Verificar si ya existe un array de registros almacenado en el Local Storage y si no existe crear uno vacío
  if (registers === null) {
    registers = [];
  }
  registers.push(register); //ponemos los register data en el array de registers
  console.log("contenido de register DESPUES de hacer el push", registers);

  // Pasamos a JSON el array de registers
  const registersJson = JSON.stringify(registers);

  // Ponemos los datos de los registros en el localStorage:
  localStorage.setItem(`registers`, registersJson);

  const savedRegisters = JSON.parse(localStorage.getItem("registers"));

  console.log(savedRegisters[2]);
});

//################################################
//Accedemos a los valores guardados en el localStorage (fuera del scope del event listener)

// const storedRegister = localStorage.getItem("registros");
// const storedRegisterParsed = JSON.parse(storedRegister);

// console.log(storedRegisterParsed);

// let lr = storedRegisterParsed.length - 1; //lR = last register

// console.log("último indice del array:", lr);
// console.log(storedRegisterParsed[lr]["Data y hora"]);

// const results = document.getElementById("results");
