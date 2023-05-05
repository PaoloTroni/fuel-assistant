"use strict";

import { countriesOfUE } from "./countries.js"; //Objecto con los países de la UE, en Español y en Inglés
import { getInsertedData } from "./get-inserted-data.js"; //Función que extrae los datos insertados en el formulario
import { processData } from "./process-data.js"; //Función que procesa los datos de la API junto con los datos introducidos en el formulario
import { controlCountry } from "./control-country.js";

//Creamos las <option> del <select> para el usuario poder seleccionar el país deseado.
const selectedCountry = document.querySelector("#selectedCountry");

for (let countryOfUE in countriesOfUE) {
  const countryOption = document.createElement("option");
  countryOption.textContent = countryOfUE;
  countryOption.setAttribute("value", countriesOfUE[countryOfUE]);
  selectedCountry.appendChild(countryOption);
}

// Elaboramos la función con lo que queremos hacer con los datos. Esta función luego se llamará dentro del bloque .then
function hacerAlgo(fetchedData) {
  const userData = document.querySelector("#userData");
  userData.addEventListener("submit", (e) => {
    e.preventDefault(); //prevenimos el comportamento predefinido del submit
    const userFormData = getInsertedData();

    controlCountry(fetchedData, userFormData);

    const {
      dataSelectedCountry,
      countryMinPriceFuel,
      countryMaxPriceFuel,
      countryMinPriceNameEs,
      countryMaxPriceNameEs,
    } = processData(fetchedData, userFormData);

    const priceSelectedFuel = dataSelectedCountry?.[userFormData.combustible]; //se podía omitir eso, pero lo ponemos en una const para no tener que escribir todo eso cuando queramos representar el combustible del país seleccionado.

    //La API devuelve "gasoline" en lugar de "gasolina". Diesel está bien. Tenemos que hacer un if que según el caso modifica el valor, así podemos presentar el valor correcto.
    let selectedFuel;

    if (userFormData.combustible === "gasoline") {
      selectedFuel = "gasolina 95";
    } else {
      selectedFuel = userFormData.combustible;
    }
    //Tenemos que pasar el nombre del país que devuelve la api de inglés a castellano.
    //Usamos el objeto selectedOptions del elemento select para acceder al textContent del option seleccionado.
    const selectedCountryName = selectedCountry.selectedOptions[0].textContent;

    //--------------------------sesión de DOM con los datos obtenidos------------------------
    const results = document.querySelector(".results");
    results.innerHTML = "";
    if (priceSelectedFuel) {
      const titleResults = document.createElement("h4");
      titleResults.textContent = `Datos del precio de ${selectedFuel} en ${selectedCountryName}`;

      const avgPriceLiter = document.createElement("p");
      avgPriceLiter.textContent = `El precio medio por litro de ${selectedFuel} en ${selectedCountryName} es de ${priceSelectedFuel}`;

      const priceTank = document.createElement("p");
      priceTank.textContent = `Repostar ${
        userFormData["litros a calcular"]
      } litro(s) de ${selectedFuel} en ${selectedCountryName}, saldría por ${(
        priceSelectedFuel * userFormData["litros a calcular"]
      ).toFixed(2)} euros.`;
      results.appendChild(titleResults);
      results.appendChild(avgPriceLiter);
      results.appendChild(priceTank);
    }

    const extrems = document.querySelector(".extrems");

    extrems.innerHTML = "";

    const titleExtrems = document.createElement("h4");
    titleExtrems.textContent = "Precios más bajos y más altos en Europa:";

    const lessExpensiveCountry = document.createElement("p");
    lessExpensiveCountry.textContent = `El país más barato de la UE es ${countryMinPriceNameEs}, donde el litro de ${selectedFuel} sale por € ${
      countryMinPriceFuel[userFormData.combustible]
    }`;

    const mostExpensiveCountry = document.createElement("p");
    mostExpensiveCountry.textContent = `El país más caro de la UE es ${countryMaxPriceNameEs}, donde el litro de ${selectedFuel} sale por € ${
      countryMaxPriceFuel[userFormData.combustible]
    }`;

    const notaUE = document.createElement("p");
    notaUE.textContent = `Precios medios indicados por el "Boletín Petrolero Semanal" de la Unión Europea.`;

    const notaAPI = document.createElement("p");
    notaAPI.innerHTML = `
     Estos datos están disponibles gracias a la API elaborada por Miguel Colmenero. Más info en este enlace:
      <a href="https://miguelangelcolmenero.eu/proyectos/combustible/api.html" target="_blank">
        miguelangelcolmenero.eu/proyectos/combustible/api.html
      </a>
    `;

    extrems.appendChild(titleExtrems);
    extrems.appendChild(lessExpensiveCountry);
    extrems.appendChild(mostExpensiveCountry);
    extrems.appendChild(notaAPI);
  });
}

// obtner datos de API

const urlAvgFuelPriceEU =
  "https://miguelangelcolmenero.eu/combustible/fuel_prices.json";

fetch(urlAvgFuelPriceEU)
  .then((response) => {
    console.log(`status: ${response.status}, ${response.statusText}`);
    return response.json();
  })
  .then((data) => {
    const fetchedData = data;

    hacerAlgo(fetchedData);
  })
  .catch((error) => {
    console.error("error:", error);
  });
