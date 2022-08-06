import React, { useEffect, useRef, useState } from "react";
import { getCitiesData } from "../api/getCities";
import { getParametersData } from "../api/getParameters";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getPollutionData } from "../api/getPollutionDetails";
import Chart from "../components/Chart";
const theme = createTheme();

export default function PollutionGraph() {
  const isMounted = useRef(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedParam, setSelectedParam] = useState("");

  const [parameters, setParameters] = useState([]);
  const [pollutionData, setPollutionData] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [searchedFlag, setSearchedFlag] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  useEffect(() => {
    if (isMounted.current) {
      getCitiesData().then((res) => setCities(res.results));
      getParametersData().then((res) => setParameters(res.results));
    } else {
      isMounted.current = true;
    }
  }, []);
  const handleSubmit = async () => {
    const data = await getPollutionData(
      dateFrom,
      dateTo,
      selectedParam,
      selectedCity
    );
    data.results.length > 0 ? setDataNotFound(false) : setDataNotFound(true);
    setPollutionData(data.results);
    setSearchedFlag(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              City Pollution
            </Typography>
            <Box sx={{ mt: 1 }} width="100%">
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="city">City</InputLabel>
                <Select
                  labelId="city"
                  id="cityt"
                  value={selectedCity}
                  label="Select City"
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                  }}
                >
                  {cities &&
                    cities.length > 0 &&
                    cities.map((data, index) => (
                      <MenuItem key={index} value={data.city}>
                        {data.city}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="parameters">Parameters</InputLabel>
                <Select
                  labelId="parameters"
                  id="parameters"
                  value={selectedParam}
                  label="Select City"
                  onChange={(e) => {
                    setSelectedParam(e.target.value);
                  }}
                >
                  {parameters &&
                    parameters.length > 0 &&
                    parameters.map((data, index) => (
                      <MenuItem key={index} value={data.name}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                value={dateFrom}
                name="Date"
                label="Date From"
                type="date"
                id="dateFrom"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setDateFrom(e.target.value);
                }}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={dateTo}
                name="Date"
                label="Date To"
                type="date"
                id="dateTo"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setDateTo(e.target.value);
                }}
                autoComplete="current-password"
              />

              <Button
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Search
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={false} sm={4} md={7}>
          {!searchedFlag ? (
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <p>Fill the form to see the graph.</p>
            </Box>
          ) : dataNotFound ? (
            <Box sx={{ textAlign: "center", mt: 10 }}>
              <p>No Data Availabe Please select any other city or parameter</p>
            </Box>
          ) : (
            <Box sx={{ p: 4 }}>
              <Chart
                dateFrom={dateFrom}
                dateTo={dateTo}
                pollutionData={pollutionData}
                selectedCity={selectedCity}
                selectedParam={selectedParam}
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
