"use strict";

export function deleteAllData() {
  let registers = JSON.parse(localStorage.getItem("registers"));
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
