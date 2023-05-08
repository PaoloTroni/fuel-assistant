"use strict";

export function printResults(userFormData, dataProcessed, selectedCountry) {
  const {
    dataSelectedCountry,
    countryMinPriceFuel,
    countryMaxPriceFuel,
    countryMinPriceNameEs,
    countryMaxPriceNameEs,
  } = dataProcessed;
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

  //empezamos a pintar los datos

  const results = document.querySelector(".results");
  results.innerHTML = ""; //limpiamos los resultados anteriores
  if (priceSelectedFuel) {
    //solo se pintará resultados sobre el país seleccionado en caso exista datos disponibles (mirar función controlCountry)
    const titleResults = document.createElement("h4");
    titleResults.textContent = `Datos del precio de ${selectedFuel} en ${selectedCountryName}`;

    const ulResults = document.createElement("ul");

    const avgPriceLiter = document.createElement("li");
    ulResults.appendChild(avgPriceLiter);
    avgPriceLiter.textContent = `El precio medio por litro de ${selectedFuel} en ${selectedCountryName} es de ${priceSelectedFuel}`;

    const priceTank = document.createElement("li");
    ulResults.appendChild(priceTank);
    priceTank.textContent = `Repostar ${
      userFormData["litros a calcular"]
    } litro(s) de ${selectedFuel} en ${selectedCountryName}, saldría por ${(
      priceSelectedFuel * userFormData["litros a calcular"]
    ).toFixed(2)} euros.`;
    results.appendChild(titleResults);
    results.appendChild(ulResults);
  }
  //pintamos los datos de precios extremos
  const extrems = document.querySelector(".extrems");

  extrems.innerHTML = "";

  const titleExtrems = document.createElement("h4");
  titleExtrems.textContent = "Precios más bajos y más altos en Europa:";

  const ulExtrems = document.createElement("ul");

  const lessExpensiveCountry = document.createElement("li");
  ulExtrems.appendChild(lessExpensiveCountry);
  lessExpensiveCountry.textContent = `El país más barato de la UE es ${countryMinPriceNameEs}, donde el litro de ${selectedFuel} sale por € ${
    countryMinPriceFuel[userFormData.combustible]
  }`;

  const mostExpensiveCountry = document.createElement("li");
  ulExtrems.appendChild(mostExpensiveCountry);
  mostExpensiveCountry.textContent = `El país más caro de la UE es ${countryMaxPriceNameEs}, donde el litro de ${selectedFuel} sale por € ${
    countryMaxPriceFuel[userFormData.combustible]
  }`;

  //pintamos unas notas informativas sobre los datos
  const notes = document.querySelector(".notes");

  const notaUE = document.createElement("p");
  notes.appendChild(notaUE);

  notaUE.textContent = `Precios medios indicados por el "Boletín Petrolero Semanal" de la Unión Europea.`;

  const notaAPI = document.createElement("p");
  notes.appendChild(notaAPI);
  notaAPI.innerHTML = `
   Los datos están disponibles gracias a la API elaborada por Miguel Colmenero. Más info en este enlace:
    <a href="https://miguelangelcolmenero.eu/proyectos/combustible/api.html" target="_blank">
      miguelangelcolmenero.eu/proyectos/combustible/api.html
    </a>
  `;

  extrems.appendChild(titleExtrems);
  extrems.appendChild(ulExtrems);
}
