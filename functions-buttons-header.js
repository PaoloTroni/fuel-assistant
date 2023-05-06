"use strict";

export const createHeaderButtons = (header, principalButtons) => {
  // Creamos los botones de navegación

  //botón que nos dirige al apartado de calcular la media de consumo
  const btnAvgFuelCalculator = document.createElement("button");
  btnAvgFuelCalculator.textContent = "Calcula tus consumos medios y tus gastos";

  //botón que nos dirige al apartado de búsqueda de gasolineras
  const btnSearchFuelStation = document.createElement("button");
  btnSearchFuelStation.textContent = "Busca a tu gasolinera preferida";

  //botón que nos dirige al apartado de calcular la media de consumo
  const btnUeFuelCalculator = document.createElement("button");
  btnUeFuelCalculator.textContent =
    "Calcula tus gastos de combustible en Europa";

  //ponemos el nav ".principalButtons" dentro del header
  header.appendChild(principalButtons);
  //ponemos los botones dentro del nav (.principalButtons)
  principalButtons.appendChild(btnAvgFuelCalculator);
  principalButtons.appendChild(btnSearchFuelStation);
  principalButtons.appendChild(btnUeFuelCalculator);

  return { btnAvgFuelCalculator, btnSearchFuelStation, btnUeFuelCalculator };
};

export const goPageAvgCalculator = (btnAvgFuelCalculator) => {
  btnAvgFuelCalculator.addEventListener("click", () => {
    location.href = "/fuel-calculator/index-fuel-calculator.html"; //location.href es el "equivalente del <a> en JS"
  });
};

export const goPageSearchFuelStation = (btnSearchFuelStation) => {
  btnSearchFuelStation.addEventListener("click", () => {
    location.href = "/fuel-stations-search/index-fuel-stations-search.html";
  });
};

export const goPageUeFuelCalculator = (btnUeFuelCalculator) => {
  btnUeFuelCalculator.addEventListener("click", () => {
    location.href = "/fuel-prices-ue/index-fuel-in-europe.html";
  });
};
