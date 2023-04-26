"use strict";
import { getDate } from "./date-hour.js";

const registers = [];

//Obtenemos los datos del formulario:

const dataForCalc = document.querySelector("#dataForCalc");
const getData = () => {
  const values = new FormData(dataForCalc);

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

  // ponemos los datos en un objeto
  const data = {
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
  return data;
};

dataForCalc.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(getData());

  const register = getData();

  const storedRegisterParsed = [];

  storedRegisterParsed.push(register);

  let lr = 0;

  // console.log(register);
  // registers.push(register); //ponemos los register data en el array de registers
  // console.log(registers);

  // Pasamos el array de registers
  // const registersJson = JSON.stringify(registers);
  // console.log(registersJson);

  //ponemos los datos de los registros en el localStorage:
  // localStorage.setItem("registros", registersJson);

  //################################################
  //Accedemos a los valores guardados en el localStorage (fuera del scope del event listener)

  // const storedRegister = localStorage.getItem("registros");
  // const storedRegisterParsed = JSON.parse(storedRegister);

  // console.log(storedRegisterParsed);

  // let lr = storedRegisterParsed.length - 1; //lR = last register

  // console.log("último indice del array:", lr);
  // console.log(storedRegisterParsed[lr]["Data y hora"]);

  const results = document.getElementById("results");

  results.innerHTML = `<p>
Datos para tu recorrido del  ${storedRegisterParsed[lr]["Data y hora"]}: </p>
<p>Litros repostados: ${storedRegisterParsed[lr]["Litros repostados"]} </p>
<p>Precio por Litro €: ${storedRegisterParsed[lr]["Precio"]} </p>
<p>Kilometros recorridos: ${storedRegisterParsed[lr]["Kilometros recorridos"]} </p>
Tu coche hizo una media de ${storedRegisterParsed[lr]["Consumo medio en L/100kms"]}/100kms. La media de gasto fue de de € ${storedRegisterParsed[lr]["Gasto medio en €/100kms"]} por cada 100 kms recorridos.
</p>
<p>Con un litro de combustible, en media, pudiste recorrer ${storedRegisterParsed[lr]["Litros repostados"]} kms y cada km te costó € ${storedRegisterParsed[lr]["Gasto medio por Km"]}.</p>
<p>Con estos datos, llenar el depósito (incluída la reserva) te cuesta € ${storedRegisterParsed[lr]["Costo estimado para llenar el depósito"]} y se
estima que podrías recorrer ${storedRegisterParsed[lr]["Autonomia estimada del depósito"]} kms con dicho depósito antes de quedar completamente sin combustible.
</p>`;
});
