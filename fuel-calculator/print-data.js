"use strict";
import { getData } from "./get-data.js";

const registers = [];
const dataForCalc = document.querySelector("#dataForCalc");
dataForCalc.addEventListener("submit", (e) => {
  e.preventDefault();

  const register = getData();

  e.target.reset(); //Eso es para resetear el formulario una vez que se hay procesados sus datos (se procesan sus datos en la función getData)

  //seleccionamos y creamos los elementos del DOM

  const results = document.querySelector("#results");
  results.innerHTML = ""; // antes de poner los datos llenamos la <section id="results"> con "nada" para que al hacer una nueva consulta se borre los datos presentados anteriormente.
  const titleResults = document.createElement("h3");
  const listResults = document.createElement("ul");
  const estimations = document.createElement("p");
  const observation = document.createElement("p");

  //LO QUE SIGUE (Y QUIZAS LO DE ANTES) TIENE QUE IR DENTRO DEL ADD EVENT LISTENER

  //Añadimos el texto del h3
  titleResults.textContent = `Datos insertados el ${register["Data y hora"]}`;

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
  results.appendChild(listResults);
  results.appendChild(estimations);
  results.appendChild(observation);

  // PROBABLEMENTE HABRṔA QUE EMPEZAR LO DEL LOCAL STORAGE AQUI Y QUIZAS ACABAR EN OTRO ARCHIVO

  console.log("registro actual", register);
  console.log("contenido de los registros ANTES de hacer el push", registers);
  registers.push(register); //ponemos los register data en el array de registers
  console.log("contenido de los registros DESPUES de hacer el push", registers);

  // Pasamos a JSON el array de registers
  const registersJson = JSON.stringify(registers);
  console.log(registersJson);

  // Ponemos los datos de los registros en el localStorage:
  localStorage.setItem("registros", registersJson);
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
