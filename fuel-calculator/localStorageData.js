// Objeto para Local Storage:
// const misRegistros = [
//   {
//     "Data y hora": "martes, 25 de abril de 2023 a las 21:08",
//     Precio: 1.25,
//     "Litros repostados": 5,
//     "Kilometros recorridos": 10,
//     "Consumo medio en L/100kms": 10,
//     "Gasto medio en €/100kms": 10,
//     "Consumo medio en kms X Litro": 10,
//     "Gasto medio por Km": 10,
//     "Costo por llenar un depósito (est.)": 10,
//     "Autonomia estimada del depósito": 10,
//   },
//   {
//     "Data y hora": "lunes, 24 de abril de 2023 a las 21:08",
//     Precio: 1.5,
//     "Litros repostados": 50,
//     "Kilometros recorridos": 100,
//     "Consumo medio en L/100kms": 100,
//     "Gasto medio en €/100kms": 100,
//     "Consumo medio en kms X Litro": 100,
//     "Gasto medio por Km": 100,
//     "Costo por llenar un depósito (est.)": 100,
//     "Autonomia estimada del depósito": 100,
//   },
// ];

// console.log(misRegistros);
// console.log(misRegistros[0]);
// console.log(misRegistros[1]);

// const misRegistrosJson = JSON.stringify(misRegistros);

// console.log(misRegistrosJson);

// localStorage.setItem("registro", misRegistrosJson);

const misDatosGuardados = localStorage.getItem("registro");

console.log(misDatosGuardados);

const misDatosGuardadosParseados = JSON.parse(misDatosGuardados);

console.log("estos son los datos guardados:", misDatosGuardadosParseados);
