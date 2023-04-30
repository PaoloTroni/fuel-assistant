"use strict";
import { getDateAndHour } from "./get-date-hour.js";

//función para obtener los datos del formulario:

const dataForCalc = document.querySelector("#dataForCalc");
export const getData = () => {
  try {
    const values = new FormData(dataForCalc);

    const alias = values.get("alias").toUpperCase(); //Alias de la entrada insertada
    const allowedCharsRegEx = /^[A-ZÑÁÉÍÓÚÀÒÇ0-9\s_.,-]+$/; //caracteres permitidos de regEx (expresiones regulares). La principal utilidad de eso, en el caso específico de esa página es impedir que se puedan introducir código malicioso.  Hay que tener en cuenta el .toUpperCase() porque al control solo llegan mayúsculas
    if (!allowedCharsRegEx.test(alias)) {
      throw new Error(
        `El identificador contiene caracteres no permitidos. Solo se permiten: letras, incluídas la "ñ" y la "ç" y algunas vocales con tildes. También se permiten los números, espacios en blanco, guiones, comas y puntos. Ningún otro carácter está permitido.`
      );
    }

    if (
      !alias.replace(/\s/g, "").length ||
      alias.length < 2 ||
      alias.length > 50
    ) {
      throw new Error(
        "El identificador debe tener entre 2 y 50 caracteres y no puede estar compuesto solo de espacios"
      );
    }

    const litersFuel = values.get("litersFuel"); // litros de combustible
    if (isNaN(litersFuel) || litersFuel < 1 || litersFuel > 1000) {
      e.target.reset();
      throw new Error(
        "Los litros repostados tienen que ser un valor numérico entre 1 y 1000"
      );
    }

    const price = values.get("price"); //precio
    if (isNaN(price) || price < 0.01 || price > 10) {
      e.target.reset();
      throw new Error(
        `El precio tiene que ser un valor numérico entre 0.01 y 10. Use el punto "." para los decimales.`
      );
    }

    const kms = values.get("kms"); // kms percorridos
    if (isNaN(kms) || kms < 1 || kms > 10000) {
      e.target.reset();
      throw new Error(
        `Los kms tienen que ser un valor numérico entre 1 y 10000`
      );
    }

    const fuelTankCapacity = values.get("fuelTankCapacity"); //capacidad del depósito de combustible
    if (
      isNaN(fuelTankCapacity) ||
      fuelTankCapacity < 1 ||
      fuelTankCapacity > 1000
    ) {
      e.target.reset();
      throw new Error(
        `La capacidad del depósito tiene que ser un valor numérico entre 1 y 1000`
      );
    }

    const time = getDateAndHour(); // fecha y data tal como se formateó en el archivo date.js
    const avgKmsPerL = Number(kms / litersFuel).toFixed(1); // media de kms por litro (con un decimal máx)
    const avgL100 = (Number(litersFuel / kms) * 100).toFixed(1); // media litros a los 100 kms (con un decimal máx)
    const avgEuros100 = Number(avgL100 * price).toFixed(2); //media de euros a los 100 kms (con 2 decimales)
    const pricePerKm = Number((litersFuel / kms) * price).toFixed(2); //precio de cada km
    const fullTankPrice = fuelTankCapacity * price; //precio estimado de llenar el depósito
    const rangeTank = Number(fuelTankCapacity * avgKmsPerL).toFixed(1); // autonomía estimada del depósito
    const numericDate = new Date().toISOString().slice(0, 10); //fecha con formato "yyyy-mm-dd"

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
      "Coste estimado para llenar el depósito": fullTankPrice,
      "Autonomia estimada del depósito": rangeTank,
      "fecha numerica": numericDate,
    };
    return data;
  } catch (error) {
    alert(error.message);
  }
};
