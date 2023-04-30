"use strict";
import { printData } from "./print-data.js";

export function queryAllData() {
  let registers = JSON.parse(localStorage.getItem("registers"));
  const btnQueryAllData = document.querySelector("#btnQueryAllData");
  btnQueryAllData.addEventListener("click", () => {
    try {
      if (!registers) {
        throw new Error("❌ Error: No hay datos para presentar.");
      }
      const resultSearch = document.createElement("p"); //creamos el <p> donde diremos cuantos resultados se han encontrado
      results.appendChild(resultSearch);

      for (let i = 0; i < registers.length; i++) {
        let register = registers[i];
        printData(register);
      }
      resultSearch.textContent = `Total de resultados encontrados: ${registers.length}`;
    } catch (error) {
      alert(error.message);
    }
  });
}
