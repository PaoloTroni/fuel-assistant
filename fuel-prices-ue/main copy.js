"use strict";

// Calcular media de consumo

let litrosCombustible = 100;
let kms = 2000;

let consumoMedioKmsL = kms / litrosCombustible;
let consumoMedioL100 = (litrosCombustible / kms) * 100;

console.log("consumoMedioKmsL", consumoMedioKmsL);
console.log("consumoMedioL100", consumoMedioL100);

// obtner datos de API

const urlAvgFuelPriceEU =
  "https://miguelangelcolmenero.eu/combustible/fuel_prices.json";

fetch(urlAvgFuelPriceEU)
  .then((response) => {
    console.log(`status: ${response.status}, ${response.statusText}`);
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("error:", error);
  });

// fetch(
//   "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/"
// )
//   .then((response) => response.json())
//   .then((data) => {
//     // Crear un objeto para almacenar los datos de las provincias
//     let provincias = {};

//     // Recorrer el array de estaciones de servicio y agregar las provincias al objeto
//     data.ListaEESSPrecio.forEach((estacion) => {
//       provincias[estacion.IDEESS.substr(0, 2)] = estacion.Provincia;
//     });

//     // Imprimir el objeto con los datos de las provincias
//     console.log(provincias);
//   })
//   .catch((error) => console.error(error));

const dataGasStationsSpain =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/";

fetch(dataGasStationsSpain)
  .then((response) => {
    console.log(`status: ${response.status}, ${response.statusText}`);
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("error:", error);
  });

// Para hacer consultas a la pagina de gasolineras de España hay que consultar esa página de ayuda
// https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help

// listado por comunidades autonomas
// https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/

// listado por provincias
// https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/

// listado de productos
// https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProductosPetroliferos/
