"use strict";

export function deleteSingleRegister(register) {
  let registers = JSON.parse(localStorage.getItem("registers"));
  const registerToDelete = register["Fecha y hora"];
  if (
    confirm(
      `Estás por borrar el registro "${register["alias"]}" del ${register["Fecha y hora"]}. ¿Estás seguro? `
    )
  ) {
    for (let i = 0; i < registers.length; i++) {
      if (
        //los critérios de búsqueda son dos: identificador o fecha
        registers[i]["Fecha y hora"] === registerToDelete
      ) {
        registers.splice(i, 1);
        i--;
        localStorage.setItem("registers", JSON.stringify(registers));
        alert(`Registro borrado satisfactoriamente`);
        location.reload();
      }
    }
  } else {
    alert("Operación cancelada");
  }
}
