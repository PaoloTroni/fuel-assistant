"use strict";

// Calcular media de consumo

const date = new Date().toLocaleDateString();
let litersFuel = 3;
let kms = 20;
let price = 1.25;

let avgKmsPerL = kms / litersFuel;
let avgL100 = (litersFuel / kms) * 100;
let fuelTankCapacity = 45;
let selectFuel = "Gasolina";

console.log("consumoMedioKmsL", avgKmsPerL);
console.log("consumoMedioL100", avgL100);
console.log;

const results = document.getElementById("results");

results.innerHTML = `<p>
Datos para tu recorrido del día  ${date}: </p>
<p>Litros repostados: ${litersFuel} </p>
<p>Kilometros recorridos: ${kms} </p>
Tu coche hizo una media de ${avgL100}/100kms. La media de gasto fue de de € ${
  avgL100 * price
} por cada 100 kms recorridos.
</p>
<p>Con un litro de combustible, en media, pudiste recorrer ${avgKmsPerL} kms y cada km te costó € ${
  (litersFuel / kms) * price
}.</p>
<p>Con estos datos, llenar el depósito (incluída la reserva) te cuesta € ${
  fuelTankCapacity * price
} y se
estima que podrías recorrer ${
  fuelTankCapacity * avgKmsPerL
} kms con dicho depósito antes de quedar completamente sin combustible.
</p>
<p>
Si tenías el depósito lleno y has recorrido ${kms}, se estima que todavía podrás recorrer ${
  fuelTankCapacity * avgKmsPerL - kms
} kms. 
</p>`;
//AQUI HAY QUE PONER UN IF PARA PINTAR ESE PARRAFO SOLO SI LOS KMS RECORRIDOS SON MENORES QUE LOS ESTIMADOS Y SI LOS KMS SON MENORES DE 100, PONER UN MENSAJE DE ALERTA PARA ENCONTRAR UNA GASOLINERA CON EL BUSCADOR DE GASOLINERA.
