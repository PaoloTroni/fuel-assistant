"use strict";
import { countriesOfUE } from "../countries.js";

export function processData(fetchedData, userFormData) {
  let countriesWithValidPrice = [];
  let dataSelectedCountry;
  let countryMinPriceFuel = { country: "", gasoline: 100, diesel: 100 };
  let countryMaxPriceFuel = { country: "", gasoline: 0, diesel: 0 }; //iniciamos una variable para poner los datos del pais con el precio más alto
  let validPriceIndex = 0;

  for (let i = 0; i < fetchedData.length; i++) {
    if (typeof fetchedData[i][userFormData.combustible] !== "number") {
      fetchedData[i][userFormData.combustible] = Number(
        fetchedData[i][userFormData.combustible].replace(",", ".").slice(0, 5)
      );
    }

    if (!isNaN(fetchedData[i][userFormData.combustible])) {
      countriesWithValidPrice.push(fetchedData[i]);
      if (
        // Buscamos los datos del país seleccionado
        countriesWithValidPrice[validPriceIndex]["country"] &&
        countriesWithValidPrice[validPriceIndex]["country"] ===
          userFormData["país seleccionado"]
      ) {
        dataSelectedCountry = countriesWithValidPrice[validPriceIndex];
      }
      if (
        countriesWithValidPrice[validPriceIndex][userFormData.combustible] &&
        countriesWithValidPrice[validPriceIndex][userFormData.combustible] <
          countryMinPriceFuel[userFormData.combustible]
      ) {
        countryMinPriceFuel = countriesWithValidPrice[validPriceIndex];
      }
      if (
        countriesWithValidPrice[validPriceIndex][userFormData.combustible] &&
        countriesWithValidPrice[validPriceIndex][userFormData.combustible] >
          countryMaxPriceFuel[userFormData.combustible]
      ) {
        countryMaxPriceFuel = countriesWithValidPrice[validPriceIndex];
      }

      validPriceIndex++;
    }
  }
  const countryMinPriceNameEn = countryMinPriceFuel["country"]; // nombre en inglés del país con precio más bajo
  const countryMinPriceNameEs = Object.keys(countriesOfUE).find(
    (key) => countriesOfUE[key] === countryMinPriceNameEn
  );

  const countrymMaxPriceNameEn = countryMaxPriceFuel["country"]; // nombre en inglés del país con precio más alto
  const countryMaxPriceNameEs = Object.keys(countriesOfUE).find(
    (key) => countriesOfUE[key] === countrymMaxPriceNameEn
  );
  return {
    dataSelectedCountry,
    countryMinPriceFuel,
    countryMaxPriceFuel,
    countryMinPriceNameEs,
    countryMaxPriceNameEs,
  };
}
