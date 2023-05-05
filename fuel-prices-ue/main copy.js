"use strict";

import { countriesOfUE } from "./countries.js"; //Objecto con los países de la UE, en Español y en Inglés
import { getInsertedData } from "./get-inserted-data.js"; //Función que extrae los datos insertados en el formulario

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
    e.target.reset();
    const prueba = document.createElement("p");

    console.log(fetchedData);
    console.log("CONSOLE LOG USERFORM DATA", userFormData["país seleccionado"]);

    const countryNotFound = !fetchedData.some((country) => {
      return country.country === userFormData["país seleccionado"];
    });
    console.log(countryNotFound);
    if (countryNotFound) {
      alert("no existe ese país");
    }

    // Buscamos los datos del país seleccionado
    const dataSelectedCountry = countriesWithValidPrice.filter((country) => {
      return country.country === userFormData["país seleccionado"];
    });

    //El valor del combustible es un string, que muchas veces se presenta así: 1,3222.65. Aunque convertamos a Number tendremos problemas, con lo cual hay que extraer solo los números que nos interesa, cambiando la coma por punto.
    //iniciamos un ciclo para recorrer los datos y así cambiar los valores por valores numéricos.
    for (let i = 0; i < fetchedData.length; i++) {
      fetchedData[i][userFormData.combustible] = Number(
        fetchedData[i][userFormData.combustible].replace(",", ".").slice(0, 5)
      );
    }
    //Filtramos únicamente los países que tengan precios validos (por si hay algun fallo de la API o incluso si llegara a fallar el código de arriba)
    const countriesWithValidPrice = fetchedData.filter(
      (country) => !isNaN(country[userFormData.combustible])
    );

    // Trabajamos con los datos encontrados para que se pueda presentarlos correctamente

    const priceSelectedFuel = dataSelectedCountry[0][userFormData.combustible]; //se podía omitir eso, pero lo ponemos en una const para no tener que escribir todo eso cuando queramos representar el combustible del país seleccionado.

    //La Api devuelve "gasoline" en lugar de "gasolina". Diesel está bien. Tenemos que hacer un if que según el caso modifica el valor, así podemos presentar el valor correcto.
    let selectedFuel;

    if (userFormData.combustible === "gasoline") {
      selectedFuel = "gasolina 95";
    } else {
      selectedFuel = userFormData.combustible;
    }

    //Tenemos que pasar el nombre del país que devuelve la api de inglés a castellano.
    //Usamos el objeto selectedOptions del elemento select para acceder al textContent del option seleccionado.
    const selectedCountryName = selectedCountry.selectedOptions[0].textContent;

    //Buscamos el país con los precios más altos y más bajos del combustible seleccionado, para dar información adicional

    let countryMinPriceFuel = countriesWithValidPrice[0]; //iniciamos una variable para poner los datos del pais con el precio más bajo
    let countryMaxPriceFuel = countriesWithValidPrice[0]; //iniciamos una variable para poner los datos del pais con el precio más alto
    // //iniciamos un ciclo para recorrer los datos de los países y sacar los datos que nos interesa
    for (let i = 0; i < countriesWithValidPrice.length; i++) {
      if (
        //buscamos el país con el combustible más barato
        countriesWithValidPrice[i][userFormData.combustible] <
        countryMinPriceFuel[userFormData.combustible]
      ) {
        countryMinPriceFuel = countriesWithValidPrice[i];
      }

      if (
        //buscamos el país con el combustible más caro
        countriesWithValidPrice[i][userFormData.combustible] >
        countryMaxPriceFuel[userFormData.combustible]
      ) {
        countryMaxPriceFuel = countriesWithValidPrice[i];
      }
    }
    //encontramos el nombre en español de los países con precios extremos
    const countryMinPriceNameEn = countryMinPriceFuel["country"]; // nombre en inglés del país con precio más bajo
    const countryMinPriceNameEs = Object.keys(countriesOfUE).find(
      (key) => countriesOfUE[key] === countryMinPriceNameEn
    );

    const countrymMaxPriceNameEn = countryMaxPriceFuel["country"]; // nombre en inglés del país con precio más alto
    const countryMaxPriceNameEs = Object.keys(countriesOfUE).find(
      (key) => countriesOfUE[key] === countrymMaxPriceNameEn
    );

    console.log(`El país con el precio más bajo es: ${countryMinPriceNameEs}`);
    console.log(`El país con el precio más alto es: ${countryMaxPriceNameEs}`);

    //Pintamos los datos en la pantalla

    prueba.textContent = `El precio medio por litro de ${selectedFuel} en ${selectedCountryName} es de ${priceSelectedFuel}. Repostar ${
      userFormData["litros a calcular"]
    } litros de ${selectedFuel} en ${selectedCountryName}, según el precio medio indicado por el "Boletín Petrolero Semanal" de la Unión Europea, saldría por ${(
      priceSelectedFuel * userFormData["litros a calcular"]
    ).toFixed(2)} euros. Precios más bajo y más alto en Europa: 
    El país más barato: El litro de ${selectedFuel} en ${
      countryMinPriceFuel["country"]
    } sale por ${
      countryMinPriceFuel[userFormData.combustible]
    }. El país más caro: El litro de ${selectedFuel} en ${
      countryMaxPriceFuel["country"]
    } sale por ${countryMaxPriceFuel[userFormData.combustible]}.
    `;
    document.querySelector(".results").appendChild(prueba);
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

// let countryMaxPriceFuel = null;
// let i = 0;
// while (i < fetchedData.length) {
//   let fuelPrice = Number(
//     fetchedData[i][userFormData.combustible].replace(",", ".").slice(0, 5)
//   );
//   if (!isNaN(fuelPrice)) {
//     if (
//       countryMaxPriceFuel === null ||
//       fuelPrice > countryMaxPriceFuel[userFormData.combustible]
//     ) {
//       console.log("el ciclo pasó por aqui esas vueltas:", i);
//       countryMaxPriceFuel = fetchedData[i];
//     }
//   }
//   i++;
// }
