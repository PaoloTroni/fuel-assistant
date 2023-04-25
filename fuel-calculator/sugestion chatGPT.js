"use strict";
import { getDate } from "./date.js";
let register = "hola";
const registers = [];

dataForCalc.addEventListener("submit", (e) => {
  e.preventDefault();

  const values = new FormData(e.target);

  const litersFuel = values.get("litersFuel"); // litros de combustible

  const price = values.get("price"); //precio

  const kms = values.get("kms"); // kms percorridos

  const fuelTankCapacity = values.get("fuelTankCapacity"); //capacidad del depósito de combustible

  const time = getDate(); // fecha y data tal como se formateó en el archivo date.js
  const avgKmsPerL = Number(kms / litersFuel).toFixed(2); // media de kms por litro (con dos decimales máx)
  const avgL100 = Number((litersFuel / kms).toFixed(2)) * 100; // media litros a los 100 kms (con dos decimales máx)
  const avgEuros100 = Number(avgL100 * price).toFixed(2); //media de euros a los 100 kms (con 2 decimales)
  const pricePerKm = Number((litersFuel / kms) * price).toFixed(2); //precio de cada km
  const fullTankPrice = fuelTankCapacity * price; //precio estimado de llenar el depósito
  const rangeTank = Number(fuelTankCapacity * avgKmsPerL).toFixed(2); // autonomía estimada del depósito

  // Objeto para Local Storage:
  register = {
    "Data y hora": time,
    Precio: price,
    "Litros repostados": litersFuel,
    "Kilometros recorridos": kms,
    "Consumo medio en L/100kms": avgL100,
    "Gasto medio en €/100kms": avgEuros100,
    "Consumo medio en kms X Litro": avgKmsPerL,
    "Gasto medio por Km": pricePerKm,
    "Costo estimado para llenar el depósito": fullTankPrice,
    "Autonomia estimada del depósito": rangeTank,
  };

  // console.log(register);
  registers.push(register); //ponemos los register data en el array de registers
  // console.log(registers);

  // Pasamos el array de registers
  const registersJson = JSON.stringify(registers);
  // console.log(registersJson);

  //ponemos los datos de los registros en el localStorage:
  localStorage.setItem("registros", registersJson);
});

// Ahora puedes acceder a la variable 'register' desde fuera del evento addEventListener
console.log(register);
