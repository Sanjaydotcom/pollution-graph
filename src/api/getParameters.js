export const getParametersData = async () => {
    const options = { method: "GET", headers: { Accept: "application/json" } };
    const res = await fetch(
      "https://api.openaq.org/v2/parameters?limit=100&page=1&offset=0&sort=asc&order_by=id",
      options
    );
    if (!res.ok) {
      throw new Error("Error in fetching data");
    } else {
      return res.json();
    }
  };