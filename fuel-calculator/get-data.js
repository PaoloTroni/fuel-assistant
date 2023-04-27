"use strict";
import { getDateAndHour } from "./date-hour.js";
import { getNumericDate } from "./date-hour.js";
//función para obtener los datos del formulario:

const dataForCalc = document.querySelector("#dataForCalc");
export const getData = () => {
  const values = new FormData(dataForCalc);

  const alias = values.get("alias"); //Alias de la entrada insertada

  const litersFuel = values.get("litersFuel"); // litros de combustible

  const price = values.get("price"); //precio

  const kms = values.get("kms"); // kms percorridos

  const fuelTankCapacity = values.get("fuelTankCapacity"); //capacidad del depósito de combustible

  const time = getDateAndHour(); // fecha y data tal como se formateó en el archivo date.js
  const avgKmsPerL = Number(kms / litersFuel).toFixed(1); // media de kms por litro (con un decimal máx)
  const avgL100 = (Number(litersFuel / kms) * 100).toFixed(1); // media litros a los 100 kms (con un decimal máx)
  const avgEuros100 = Number(avgL100 * price).toFixed(2); //media de euros a los 100 kms (con 2 decimales)
  const pricePerKm = Number((litersFuel / kms) * price).toFixed(2); //precio de cada km
  const fullTankPrice = fuelTankCapacity * price; //precio estimado de llenar el depósito
  const rangeTank = Number(fuelTankCapacity * avgKmsPerL).toFixed(1); // autonomía estimada del depósito
  const numericDate = getNumericDate();

  // ponemos los datos en un objeto
  const data = {
    alias: alias,
    "Fecha y hora": time,
    "Litros repostados": litersFuel,
    Precio: price,
    "Kilometros recorridos": kms,
    "Consumo medio en L/100kms": avgL100,
    "Gasto medio en €/100kms": avgEuros100,
    "Consumo medio en kms X Litro": avgKmsPerL,
    "Gasto medio por Km": pricePerKm,
    "Capacidad del depósito": fuelTankCapacity,
    "Costo estimado para llenar el depósito": fullTankPrice,
    "Autonomia estimada del depósito": rangeTank,
    "fecha numerica": numericDate,
  };
  return data;
};
