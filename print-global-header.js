"use strict";
//-------------hacemos los import-----------
import { createHeaderButtons } from "./functions-buttons-header.js";

import { goPageAvgCalculator } from "./functions-buttons-header.js";

import { goPageSearchFuelStation } from "./functions-buttons-header.js";

import { goPageUeFuelCalculator } from "./functions-buttons-header.js";

//-------------
//Crear contenido del Header--------------------
const header = document.querySelector("header"); //seleccionamos el header
const AVISO = document.createElement("p"); //ESO HAY QUE SACARLO DESPUES!!!!

const h1 = document.createElement("h1"); //creamos el h1 de la página
const slogan = document.createElement("p"); //creamos el slogan de la página
const principalButtons = document.createElement("nav"); //creamos la sección de navegación del header

//Ponemos los contenidos
AVISO.innerHTML = `<span style="color: red">⚠️ ATENCIÓN: Página en desarrollo. Todavía en fase alfa. ⚠️</span>`; //ESO HAY QUE SACARLO DESPUES!!!!
slogan.textContent =
  "¡Ahorra tiempo, dinero y controla los consumos de gasolina!";

h1.innerHTML = `<a href="/index.html"><img class="logo" src="/images/logo.png" alt="logo fuel assistant" /></a>
<span class="oculto">Fuel Assistant</span
>`;
header.appendChild(AVISO); //ESO HAY QUE SACARLO DESPUES!!!!
header.appendChild(h1);
header.appendChild(slogan);

//Llamar a las funciones que crea los botones y les asigna funcionalidades

const { btnAvgFuelCalculator, btnSearchFuelStation, btnUeFuelCalculator } =
  createHeaderButtons(header, principalButtons);

goPageAvgCalculator(btnAvgFuelCalculator);

goPageSearchFuelStation(btnSearchFuelStation);

goPageUeFuelCalculator(btnUeFuelCalculator);
