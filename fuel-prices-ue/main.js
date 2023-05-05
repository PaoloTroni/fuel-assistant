"use strict";

import { countriesOfUE } from "./countries.js"; //Objecto con los países de la UE, en Español y en Inglés
import { getInsertedData } from "./functions/get-inserted-data.js"; //Función que extrae los datos insertados en el formulario
import { processData } from "./functions/process-data.js"; //Función que procesa los datos de la API junto con los datos introducidos en el formulario
import { controlCountry } from "./functions/control-country.js"; //Función que veifica si el país selecciondo existe en los datso devuelto por la API
import { printResults } from "./functions/print-results.js"; //Función que pinta en pantalla los resultados obtenidos
import { getDataAPI } from "./functions/get-data-api.js"; //Función que recoje los datos de la API

//Creamos las <option> del <select> para el usuario poder seleccionar el país deseado.
const selectedCountry = document.querySelector("#selectedCountry");

for (let countryOfUE in countriesOfUE) {
  //para crear las option se necesita un ciclo
  const countryOption = document.createElement("option");
  countryOption.textContent = countryOfUE;
  countryOption.setAttribute("value", countriesOfUE[countryOfUE]);
  selectedCountry.appendChild(countryOption);
}

// Elaboramos la función con lo que queremos hacer con los datos. Esta función luego se llamará dentro del bloque .then de la función getDataApi
export function useData(fetchedData) {
  const userData = document.querySelector("#userData");
  userData.addEventListener("submit", (e) => {
    e.preventDefault(); //prevenimos el comportamento predefinido del submit
    const userFormData = getInsertedData(); //ponemos los datos del formulario dentro de una const

    controlCountry(fetchedData, userFormData);

    const dataProcessed = processData(fetchedData, userFormData); //ponemos los datos procesados dentro de una const

    printResults(userFormData, dataProcessed, selectedCountry);
  });
}

// obtner datos de la API
getDataAPI();
