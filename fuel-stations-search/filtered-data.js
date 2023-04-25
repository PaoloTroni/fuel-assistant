"use strict";
import { getApiData } from "./get-api-data.js";
import { handleForm } from "./handle-form.js";

export async function filterData() {
  try {
    // Ese es el array original que se recibirá desde el archivo get-api-data.js
    const data = await getApiData();
    const {
      selectedCity: city,
      insertedPostalCode: postalCode,
      selectedFuel: fuel,
    } = await handleForm();
    const { fuelStationsInfo, cities } = data;

    // console.log("GASOLINERAS:", fuelStationsInfo);

    // console.log(
    //   "a ver filho, que pasa aqui que no muestras el municipio?",
    //   selectedCity
    // );
    // console.log(
    //   "a ver filho, que pasa aqui que no muestras el CP?",
    //   insertedPostalCode
    // );

    // console.log(fuel);
    // console.log(Object.values(fuelStationsInfo[0]).slice(8, 22));
    // city = cities[10];
    // postalCode = fuelStationsInfo[0]["C.P."]; // Ese valor no puede ser convertido en número, porque en el objeto está como string
    // console.log("tipo variable CP", typeof postalCode);
    // console.log("CP", postalCode);

    if (
      (isNaN(postalCode) && postalCode !== "") ||
      parseInt(postalCode) < 1001 ||
      postalCode > 52006
    ) {
      console.error("Inserte un Código Postal válido para España");
    }

    // Variables de filtrado y mensaje de aviso

    if (!city && !postalCode && !fuel) {
      console.warn(
        "No has seleccionado ningún parámetro. Estarás visualizando las gasolineras de toda la provincia seleccionada"
      );
    }
    // Iniciamos un array vacío donde pondremos solo la información que nos interesa, debidamente filtrada.

    const fuelStationsInfoFiltered = [];

    // Empezamos a iterar el array original
    for (let i = 0; i < fuelStationsInfo.length; i++) {
      // Filtramos solo las gasolineras con acceso al público y en base a los filtros que ha selecionado el usuario
      if (
        fuelStationsInfo[i]["Tipo Venta"] === "P" &&
        (!city || fuelStationsInfo[i]["Municipio"] === city) &&
        (!postalCode || fuelStationsInfo[i]["C.P."] === postalCode) &&
        (!fuel || fuelStationsInfo[i][fuel] !== "")
      ) {
        // // Resulta que no todas gasolineras tienen gasolina...con lo cual el programa no podía hacer un replace() de undefined para ordenar las gasolineras por precio. Por eso está ese If aquí.
        // if (fuelStationsInfo[i]["Precio Gasolina 95 E5"]) {
        //   fuelStationsInfoFiltered.price95E5Gas =
        //     fuelStationsInfo[i]["Precio Gasolina 95 E5"];
        // } else {
        //   fuelStationsInfoFiltered.price95E5Gas = "0,000";
        // }

        // Empezamos a rellenar el array con la información
        fuelStationsInfoFiltered.push({
          latitude: fuelStationsInfo[i]["Latitud"].replace(",", "."), // Cambiamos con replace() la coma de los valores de latitud y longitud por un punto, para que Google Maps pueda leer estos valores
          longitude: fuelStationsInfo[i]["Longitud (WGS84)"].replace(",", "."),
          brand: fuelStationsInfo[i]["Rótulo"],
          address: fuelStationsInfo[i]["Dirección"],
          locality: fuelStationsInfo[i]["Localidad"],
          city: fuelStationsInfo[i]["Municipio"],
          postalCode: fuelStationsInfo[i]["C.P."],
          timetable: fuelStationsInfo[i]["Horario"],

          ...(fuelStationsInfo[i]["Precio Gasolina 95 E5"] && {
            price95E5Gas: fuelStationsInfo[i]["Precio Gasolina 95 E5"],
          }),

          ...(fuelStationsInfo[i]["Precio Gasolina 95 E5 Premium"] && {
            price95E5PremiumGas:
              fuelStationsInfo[i]["Precio Gasolina 95 E5 Premium"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasolina 95 E10"] && {
            price95E10Gas: fuelStationsInfo[i]["Precio Gasolina 95 E10"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasolina 98 E5"] && {
            price98E5Gas: fuelStationsInfo[i]["Precio Gasolina 98 E5"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasolina 98 E10"] && {
            price98E10Gas: fuelStationsInfo[i]["Precio Gasolina 98 E10"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasoleo A"] && {
            priceADiesel: fuelStationsInfo[i]["Precio Gasoleo A"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasoleo Premium"] && {
            priceDieselPremium: fuelStationsInfo[i]["Precio Gasoleo Premium"],
          }),
          ...(fuelStationsInfo[i]["Precio Gasoleo B"] && {
            priceBDiesel: fuelStationsInfo[i]["Precio Gasoleo B"],
          }),
          ...(fuelStationsInfo[i]["Precio Biodiesel"] && {
            priceBioDiesel: fuelStationsInfo[i]["Precio Biodiesel"],
          }),
          ...(fuelStationsInfo[i]["Precio Gas Natural Comprimido"] && {
            priceGNC: fuelStationsInfo[i]["Precio Gas Natural Comprimido"],
          }),
          ...(fuelStationsInfo[i]["Precio Gas Natural Licuado"] && {
            priceGNL: fuelStationsInfo[i]["Precio Gas Natural Licuado"],
          }),
          ...(fuelStationsInfo[i]["Precio Gases licuados del petróleo"] && {
            priceGLP: fuelStationsInfo[i]["Precio Gases licuados del petróleo"],
          }),
          ...(fuelStationsInfo[i]["Precio Bioetanol"] && {
            priceBioEthanol: fuelStationsInfo[i]["Precio Bioetanol"],
          }),
          ...(fuelStationsInfo[i]["Precio Hidrogeno"] && {
            priceHydrogen: fuelStationsInfo[i]["Precio Hidrogeno"],
          }),
        });
      }
    }

    // Datos ordenados del precio más bajo al más alto (Diesel), con método sort y aplicando el operador + para convertir strings a number y usando replace para cambiar las comas por puntos.

    // if (fuelStationsInfoFiltered)
    //   fuelStationsInfoFiltered.sort(
    //     (a, b) =>
    //       +a.price95E5Gas.replace(",", ".") - +b.price95E5Gas.replace(",", ".")
    //   );
    // console.log(fuelStationsInfoFiltered);

    // console.log("Resultado final:", filterData());

    return fuelStationsInfoFiltered;
  } catch (error) {
    console.error("Hubo un fallo:", error);
  }
}
