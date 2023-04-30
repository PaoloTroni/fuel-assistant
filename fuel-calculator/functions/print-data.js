"use strict";
import { deleteSingleRegister } from "./delete-single-register.js";

export function printData(register) {
  //seleccionamos y creamos los elementos del DOM
  const results = document.querySelector("#results"); //la section donde se pintarán los datos

  const result = document.createElement("section");
  result.classList.add("single-result"); //añadimos la clase a cada uno de los resultados
  const titleResults = document.createElement("h3");
  const alias = document.createElement("h3");
  const listResults = document.createElement("ul");
  const btnDeleteRegister = document.createElement("button"); //boton para borrar el registro insertado
  btnDeleteRegister.textContent = "Borrar registro";
  btnDeleteRegister.setAttribute("id", "deleteRegister");

  //Añadimos el texto con la fecha y la hora
  titleResults.textContent = `Datos insertados el ${register["Fecha y hora"]}`;

  //Añadimos el texto del Alias
  alias.textContent = `${register.alias}`;

  // Añadir elementos a la lista
  const liLitersFuel = document.createElement("li");
  liLitersFuel.textContent = `Litros repostados: ${register["Litros repostados"]} litro(s)`;
  listResults.appendChild(liLitersFuel);

  const liPrice = document.createElement("li");
  liPrice.textContent = `Precio por litro: € ${register["Precio"]}`;
  listResults.appendChild(liPrice);

  const liKms = document.createElement("li");
  liKms.textContent = `Kilometros recorridos: ${register["Kilometros recorridos"]} km(s)`;
  listResults.appendChild(liKms);

  const liAvgL100 = document.createElement("li");
  liAvgL100.textContent = `Tu coche hizo una media de ${register["Consumo medio en L/100kms"]}L/100kms`;
  listResults.appendChild(liAvgL100);

  const liAvgEuros100 = document.createElement("li");
  liAvgEuros100.textContent = `La media de gasto fue de de € ${register["Gasto medio en €/100kms"]} por cada 100 kms recorridos`;
  listResults.appendChild(liAvgEuros100);

  const liAvgKmsPerL = document.createElement("li");
  liAvgKmsPerL.textContent = `Con un litro de combustible pudiste recorrer en media ${register["Consumo medio en kms X Litro"]} kms`;
  listResults.appendChild(liAvgKmsPerL);

  const liPricePerKm = document.createElement("li");
  liPricePerKm.textContent = `Cada km te costó € ${register["Gasto medio por Km"]}`;
  listResults.appendChild(liPricePerKm);

  const liFullTankPrice = document.createElement("li");
  liFullTankPrice.textContent = `Coste estimado para llenar el depósito: € ${register["Coste estimado para llenar el depósito"]}`;
  listResults.appendChild(liFullTankPrice);

  const liRangeTank = document.createElement("li");
  liRangeTank.textContent = `Autonomía estimada del depósito: ${register["Autonomia estimada del depósito"]} kms`;
  listResults.appendChild(liRangeTank);

  // Añadir el título y la lista a la sección de resultados
  results.appendChild(result);
  result.appendChild(titleResults);
  result.appendChild(alias);
  result.appendChild(listResults);
  result.appendChild(btnDeleteRegister);

  btnDeleteRegister.addEventListener("click", () => {
    deleteSingleRegister(register);
  });
}
