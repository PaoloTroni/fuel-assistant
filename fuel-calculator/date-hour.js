"use strict";

export function getDateAndHour() {
  const now = new Date();

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const hourOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const date = now.toLocaleDateString("es-ES", dateOptions);

  const hour = now.toLocaleTimeString("es-ES", hourOptions);

  const dateAndHour = date + " a las " + hour;

  return dateAndHour;
}

export function getNumericDate() {
  const now = new Date();
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const numericDate = now.toLocaleDateString("es-ES", dateOptions);
  return numericDate;
}
