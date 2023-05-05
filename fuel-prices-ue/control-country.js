"use strict";

export function controlCountry(fetchedData, userFormData) {
  try {
    const countryFound = fetchedData.some((country) => {
      return country.country === userFormData["país seleccionado"];
    });

    if (!countryFound) {
      throw new Error(
        "Los datos del país seleccionado no están disponibles por algún motivo externo a la aplicación."
      );
    }
  } catch (error) {
    alert(error);
    console.error(error);
  }
}
