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

export const truncateText = (text, cutLength) => {
  if (!text) return null;
  if (text.length <= cutLength) return text;
  else return text.substring(0, cutLength) + "...";
};

export const convertMsToHMS = (ms) => {
  if (!ms) return "-:-";

  const h = Math.floor(ms / (1000 * 60 * 60));
  const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((ms % (1000 * 60)) / 1000);

  let str = "";
  if (h > 0) str += `${h}:`;
  str += `${m}:${s}`;

  return str;
};
