"use strict";
import { printData } from "./print-data.js";

export function querySelectedData() {
  let registers = JSON.parse(localStorage.getItem("registers"));
  try {
    if (!registers || registers == null) {
      throw new Error("❌ Error: No hay datos para presentar.");
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
  //después de comprobar que haya datos, procedemos a recoger los critérios de búsqueda insertados en el form
  const dataForQuerys = document.querySelector("#dataForQuerys");
  dataForQuerys.addEventListener("submit", (e) => {
    try {
      if (!registers || registers == null) {
        throw new Error("❌ Error: No hay datos para presentar.");
      }
      e.preventDefault();

      results.innerHTML = ""; //limpiamos el HTML de datos de búsquedas anteriores

      const values = new FormData(dataForQuerys);
      const allowedCharsRegEx = /^[A-ZÑÁÉÍÓÚÀÒÇ0-9\s_.,-]*$/; //caracteres permitidos
      const aliasForQuery = values.get("aliasForQuery").toUpperCase();
      if (!allowedCharsRegEx.test(aliasForQuery)) {
        e.target.reset();
        alert("Por favor, revisa tu búsqueda.");
        throw new Error(
          `El identificador contiene caracteres no permitidos. Solo se permiten: letras, incluídas la "ñ" y la "ç" y algunas vocales con tildes. También se permiten los números, espacios en blanco, guiones, comas y puntos. Ningún otro carácter está permitido.`
        );
      }
      const dateForQuery = values.get("dateForQuery");

      e.target.reset(); //limpiamos los campos del form

      const resultSearch = document.createElement("p"); //creamos el <p> donde diremos cuantos resultados se han encontrado
      results.appendChild(resultSearch);

      let resultsCounter = 0; //iniciamos la variable que contará los resultados encontrados
      //recorremos el array del local storage en búsqueda de los registros que satisfagan los critérios de búsqueda
      for (let i = 0; i < registers.length; i++) {
        if (
          //los critérios de búsqueda son dos: identificador o fecha
          registers[i]["alias"] === aliasForQuery ||
          registers[i]["fecha numerica"] === dateForQuery
        ) {
          resultsCounter++;

          let register = registers[i];
          printData(register);
        }
      }
      if (resultsCounter > 0) {
        resultSearch.textContent = `Total de resultados encontrados: ${resultsCounter}`;
      } else {
        resultSearch.textContent =
          "No se han encontrado registros con estos datos insertados.";
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  });
}
