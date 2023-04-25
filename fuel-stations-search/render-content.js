import { getApiData } from "./get-api-data.js";
import { filterData } from "./filtered-data.js";

const pNota = document.createElement("p"); //nota del Gobierno de España sobre los resultados
const pFecha = document.createElement("p"); //fecha y hora de vigencia de los resultados
const lengthResults = document.createElement("p"); //párrafo con detalles sobre el resultado de la búsqueda
const results = document.getElementById("results"); //section donde irán los resultados
const resultsNotes = document.getElementById("resultsNotes"); //section donde irán las notas y observaciones sobre los resultados

resultsNotes.appendChild(pNota);
resultsNotes.appendChild(pFecha);
results.appendChild(lengthResults);

// Llamada a la función asíncrona para pintar datos provenientes del fetch en el HTML

async function loadContent() {
  try {
    const filteredData = await filterData(); // Usamos await para esperar a que se resuelva la promesa
    const notes = await getApiData();
    const { nota, fecha } = notes;
    // console.log("Array con la información filtrada:", filteredData);
    pNota.textContent = `Información del Gobierno de España: "${nota}"`;
    pFecha.textContent = `Fecha de la búsqueda: ${fecha}`;

    // Mensaje de control que indica si la búsqueda ha devuelto algún resultado y cuantos
    if (filteredData.length === 0) {
      lengthResults.textContent =
        "No se han encontrado gasolineras con estos critérios de búsqueda.";
    } else {
      filteredData.length === 1
        ? (lengthResults.textContent = `Se ha encontrado 1 gasolinera.`)
        : (lengthResults.textContent = `Se han encontrado ${filteredData.length} gasolineras.`);
    }

    // Pintamos los resultados por pantalla

    for (let i = 0; i < filteredData.length; i++) {
      // Creamos el contenedor de los datos de una gasolinera
      const fuelStationData = document.createElement("article");
      // Creamos las const que tendrán los datos del array de objetos proveniente de filteredData

      const brand = document.createElement("h3");
      brand.textContent = filteredData[i].brand;

      const address = document.createElement("p");
      address.textContent = `${filteredData[i].address}, ${filteredData[i].locality}`;

      const address2 = document.createElement("p");
      address2.textContent = `${filteredData[i].postalCode} - ${filteredData[i].city}`;

      const timetable = document.createElement("p");
      timetable.textContent = `🕑 ${filteredData[i].timetable}`;

      // Crear una nueva lista de precios para cada gasolinera
      const listPrices = document.createElement("ul");

      if (filteredData[i].price95E5Gas) {
        const price95E5Gas = document.createElement("li");
        price95E5Gas.textContent = `Gasolina 95: € ${filteredData[i].price95E5Gas}`;
        listPrices.append(price95E5Gas);
      }
      if (filteredData[i].price95E5PremiumGas) {
        const price95E5PremiumGas = document.createElement("li");
        price95E5PremiumGas.textContent = `Gasolina 95 Premium: € ${filteredData[i].price95E5PremiumGas}`;
        listPrices.append(price95E5PremiumGas);
      }

      if (filteredData[i].price95E10Gas) {
        const price95E10Gas = document.createElement("li");
        price95E10Gas.textContent = `Gasolina 95 E10: € ${filteredData[i].price95E10Gas}`;
        listPrices.append(price95E10Gas);
      }

      if (filteredData[i].price98E5Gas) {
        const price98E5Gas = document.createElement("li");
        price98E5Gas.textContent = `Gasolina 98: € ${filteredData[i].price98E5Gas}`;
        listPrices.append(price98E5Gas);
      }

      if (filteredData[i].price98E10Gas) {
        const price98E10Gas = document.createElement("li");
        price98E10Gas.textContent = `Gasolina 98 E10: € ${filteredData[i].price98E10Gas}`;
        listPrices.append(price98E10Gas);
      }

      if (filteredData[i].priceADiesel) {
        const priceADiesel = document.createElement("li");
        priceADiesel.textContent = `Diesel: € ${filteredData[i].priceADiesel}`;
        listPrices.append(priceADiesel);
      }

      if (filteredData[i].priceDieselPremium) {
        const priceDieselPremium = document.createElement("li");
        priceDieselPremium.textContent = `Diesel Premium: € ${filteredData[i].priceDieselPremium}`;
        listPrices.append(priceDieselPremium);
      }

      if (filteredData[i].priceBDiesel) {
        const priceBDiesel = document.createElement("li");
        priceBDiesel.textContent = `Diesel B (agrícola): € ${filteredData[i].priceBDiesel}`;
        listPrices.append(priceBDiesel);
      }

      if (filteredData[i].priceBioDiesel) {
        const priceBioDiesel = document.createElement("li");
        priceBioDiesel.textContent = `Bio Diesel: € ${filteredData[i].priceBioDiesel}`;
        listPrices.append(priceBioDiesel);
      }
      if (filteredData[i].priceGNC) {
        const priceGNC = document.createElement("li");
        priceGNC.textContent = `GNC: € ${filteredData[i].priceGNC}`;
        listPrices.append(priceGNC);
      }

      if (filteredData[i].priceGNL) {
        const priceGNL = document.createElement("li");
        priceGNL.textContent = `GNL: € ${filteredData[i].priceGNL}`;
        listPrices.append(priceGNL);
      }

      if (filteredData[i].priceGLP) {
        const priceGLP = document.createElement("li");
        priceGLP.textContent = `GLP: € ${filteredData[i].priceGLP}`;
        listPrices.append(priceGLP);
      }

      if (filteredData[i].priceBioEthanol) {
        const priceBioEthanol = document.createElement("li");
        priceBioEthanol.textContent = `Bio Etanol: € ${filteredData[i].priceBioEthanol}`;
        listPrices.append(priceBioEthanol);
      }

      if (filteredData[i].priceHydrogen) {
        const priceHydrogen = document.createElement("li");
        priceHydrogen.textContent = `Hidrógeno: € ${filteredData[i].priceHydrogen}`;
        listPrices.append(priceHydrogen);
      }

      const latitude = filteredData[i].latitude;
      const longitude = filteredData[i].longitude;

      const linkMaps = document.createElement("a");
      linkMaps.textContent = `Ver ubicación en Google Maps 🌐`;
      linkMaps.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
      linkMaps.target = "_blank";

      const br = document.createElement("br");
      const hr = document.createElement("hr");

      fuelStationData.append(
        // Usando append() en lugar de innerHTML se evita la reconstrucción del contenido HTML en cada iteración del bucle, lo que puede mejorar el rendimiento en escenarios donde se agregan muchos elementos al DOM.
        brand,
        address,
        address2,
        timetable,
        listPrices,
        linkMaps,
        br,
        hr
      );
      results.appendChild(fuelStationData);
    }
  } catch (error) {
    console.error("Hubo un fallo:", error);
  }
}

loadContent();
