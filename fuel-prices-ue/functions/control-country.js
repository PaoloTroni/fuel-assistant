"use strict";

export function controlCountry(fetchedData, userFormData) {
  try {
    //iteramos el array de objetos que nos devuelve la API para verificar si el país seleccionado se encuentra presente
    //tenemos que usar el método some() y no el includes() porque estamos buscando la propiedad de un objeto dentro de un array de objetos. El some() devuelve un booleano
    const countryFound = fetchedData.some((country) => {
      return country.country === userFormData["país seleccionado"];
    });

    if (!countryFound) {
      throw new Error( //lanzamos un error caso no se encuentre el país seleccionado.
        "Los datos del país seleccionado no están disponibles. Por favor, consulte otro país."
      );
    }
  } catch (error) {
    console.error(error);
    if (
      error.message ===
      "Los datos del país seleccionado no están disponibles. Por favor, consulte otro país."
    ) {
      alert(error); //avisamos al usuario del error
    }
  }
}
