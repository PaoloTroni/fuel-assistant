import { useData } from "../main.js";

export function getDataAPI() {
  //Ponemos la url en una const
  const urlAvgFuelPriceEU =
    "https://miguelangelcolmenero.eu/combustible/fuel_prices.json";

  // hacemos el fecth
  fetch(urlAvgFuelPriceEU)
    .then((response) => {
      console.log(`status: ${response.status}, ${response.statusText}`);
      return response.json();
    })
    .then((data) => {
      const fetchedData = data;
      useData(fetchedData); //cuando la API nos responda entonces llamamos a la función useData para procesar todos los datos.
    })
    .catch((error) => {
      console.error(error);
      const pError = document.createElement("p");
      pError.classList.add("error");
      pError.textContent =
        "Hubo algún error en hacer la petición al servidor. Por favor, contacte con el administrador de la página.";
      document.querySelector(".results").appendChild(pError);
    });
}
