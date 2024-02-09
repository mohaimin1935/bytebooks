import axios from "axios";

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const fetcher = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const baseApi = process.env.BASE_API;

export const getCurrentWeek = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const startDate = new Date(today);

  startDate.setDate(today.getDate() - currentDay);

  const days = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    days.push({
      day: currentDate.toLocaleDateString("en-US", { weekday: "long" }),
      date: currentDate.toLocaleDateString("en-US", {
        day: "numeric",
      }),
    });
  }

  return days;
};

export const getCurrentMonth = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const days = [];

  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    days.push(new Date(currentYear, currentMonth, day));
  }

  return days;
};

export const truncateText = (text, cutLength) => {
  if (!text) return null;
  if (text.length <= cutLength) return text;
  else return text.substring(0, cutLength) + "...";
};

export const convertMsToHMS = (ms) => {
  if (!ms) return "0:00";

  const h = Math.floor(ms / (1000 * 60 * 60));
  const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((ms % (1000 * 60)) / 1000);

  let str = "";
  if (h > 0) str += `${h}:`;
  str += `${m}:${s}`;

  return str;
};

export const textColorOnBg = (color) => {
  if (!color) return "#272934";

  let r, g, b, hsp;

  if (color.match(/^rgb/)) {
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  if (hsp > 127.5) {
    return "#272934";
  } else {
    return "#fdfcf7";
  }
};
