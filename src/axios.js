import axios from "axios";

export const fetchCovidData = async () => {
  const result = await axios.get("https://api.covid19api.com/summary");
  console.log("coviddatata:", result);
  return result.data;
};
