"use strict";
let registers = JSON.parse(localStorage.getItem("registers"));
function deleteAllData() {
  const btnDeleteAllData = document.querySelector("#btnDeleteAllData");
  btnDeleteAllData.addEventListener("click", () => {
    try {
      if (!registers) {
        throw new Error("❌ Error: No hay datos para borrar.");
      }
      if (
        confirm(
          "⚠️ ¡Atención!  Se borrarán de ese navegador todos tus datos referentes al consumo de combustible. ¿Estás seguro de que deseas continuar?"
        ) &&
        confirm("Seguimos. ¿Estás seguro?")
      ) {
        localStorage.clear();
        alert("Datos borrados con éxito.");
      } else {
        alert("Operación cancelada.");
      }
    } catch (error) {
      alert(error.message);
    }
  });
}

deleteAllData();
// Verificar si ya existe un array de registros almacenado en el Local Storage y si no existe un array, crear uno vacío
// let registers = JSON.parse(localStorage.getItem("registers"));
// const insertRegister = document.querySelector("#insertRegister");
// const manageData = document.querySelector("#manageData");
// let btnManageData;
// let btnQueryAllData;
// let btnQuerySelectedData;
// let btnDeleteData;
// let btnExportData;

// if (registers !== null) {
//   btnManageData = document.createElement("button");
//   btnManageData.textContent = "Gestionar datos almacenados";
//   insertRegister.appendChild(btnManageData);
// }

// btnManageData.addEventListener("click", () => {
//   insertRegister.innerHTML = "";
//   console.log("hola");
// });

// Ponemos los datos en el Local Storage

// let registers = JSON.parse(localStorage.getItem("registers"));

// // Verificar si ya existe un array de registros almacenado en el Local Storage y si no existe un array, crear uno vacío
// if (registers === null) {
//   registers = [];
// }

// registers.push(register); //ponemos los register data en el array de registers
// console.log("contenido de register DESPUES de hacer el push", registers);

// // Pasamos a JSON el array de registers
// const registersJson = JSON.stringify(registers);

// // Ponemos los datos de los registros en el localStorage:
// localStorage.setItem(`registers`, registersJson);

// const savedRegisters = JSON.parse(localStorage.getItem("registers"));

// console.log(savedRegisters[2]);

//################################################
//Accedemos a los valores guardados en el localStorage (fuera del scope del event listener)

// const storedRegister = localStorage.getItem("registros");
// const storedRegisterParsed = JSON.parse(storedRegister);

// console.log(storedRegisterParsed);

// let lr = storedRegisterParsed.length - 1; //lR = last register

// console.log("último indice del array:", lr);
// console.log(storedRegisterParsed[lr]["Data y hora"]);

// const results = document.getElementById("results");
