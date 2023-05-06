"use strict";

//función para obtener los datos del formulario:

const userData = document.querySelector("#userData");

export const getInsertedData = () => {
  try {
    const values = new FormData(userData);
    //Hacemos algunos controles por si falla los controles del HTML
    const selectedCountry = values.get("selectedCountry");
    if (!selectedCountry) {
      throw new Error(
        "No has seleccionado ningún país. Por favor, revise tu búsqueda."
      );
    }

    const fuel = values.get("fuel");

    const litersFuel = values.get("litersFuel"); // litros de combustible
    if (isNaN(litersFuel) || litersFuel < 1 || litersFuel > 1000) {
      e.target.reset();
      throw new Error(
        "Los litros repostados tienen que ser un valor numérico entre 1 y 1000"
      );
    }

    // ponemos los datos en un objeto
    const insertedData = {
      "país seleccionado": selectedCountry,
      combustible: fuel,
      "litros a calcular": litersFuel,
    };

    return insertedData;
  } catch (error) {
    console.error(error);
    const pError = document.createElement("p"); //comunicamos al usuario sobre el error
    pError.classList.add("error");
    pError.textContent = error;
    document.querySelector(".results").appendChild(pError);
  }
};
