export const getPollutionData = async (fromDate, toDate, parameter, city) => {
  const options = {
    method: "GET",
    headers: { Accept: "application/json" },
  };

  const res = await fetch(
    `https://api.openaq.org/v2/measurements?date_from=${fromDate}&date_to=${toDate}&limit=100&page=1&offset=0&sort=desc&parameter=${parameter}&radius=1000&city=${city}&order_by=datetime`,
    options
  );
  if (!res.ok) {
    throw new Error("Data coud not be fetched!");
  } else {
    return res.json();
  }
};
