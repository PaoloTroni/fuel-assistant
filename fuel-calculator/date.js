"use strict";

export function getDate() {
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
