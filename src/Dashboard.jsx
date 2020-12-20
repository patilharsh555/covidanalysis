import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Divider,
  Link,
  Container,
  Typography,
  Grid,
  CssBaseline,
  CardContent,
  Card,
} from "@material-ui/core";

import { fetchCovidData } from "./axios";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  covidWrapper: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 3),
  },
  subText: {
    marginTop: 10,
    marginBottom: 0,
  },
  sectionHead: {
    fontWeight: 300,
  },
  sectionHeadTwo: {
    marginTop: theme.spacing(3),
  },
  heroButtons: {
    marginTop: theme.spacing(3),
  },
  innerGrid: {
    marginBottom: theme.spacing(3),
  },
  card: {
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  formControl: {
    marginLeft: theme.spacing(2),
    minWidth: 120,
  },
  dropdownRegion: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [covidData, setCovidData] = useState(null);

  useEffect(async () => {
    const covidDataRes = await fetchCovidData();
    setSelectedCountry(covidDataRes.Countries[76]);
    setCovidData(covidDataRes);
  }, []);

  const handleCountryChange = (event) => {
    const codeForCntry = event.target.value.toString();
    const currentCountry = covidData.Countries.filter(
      (cntry) => cntry.CountryCode === codeForCntry
    );
    setSelectedCountry(currentCountry[0]);
  };

  if (!covidData) {
    return null;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.covidWrapper}>
          <Container>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              COVID 19 - A World Outlook
            </Typography>
            <Divider />
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              className={classes.subText}
            >
              A tool to analyse the COVID-19 cases country wise
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid}>
          <Typography
            component="h2"
            variant="h3"
            color="textPrimary"
            className={classes.sectionHead}
            gutterBottom
          >
            World Count
          </Typography>
          <Grid container spacing={4} className={classes.innerGrid}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textSecondary"
                    component="h3"
                  >
                    Total Cases:
                  </Typography>
                  <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                  >
                    {covidData.Global.TotalConfirmed}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textSecondary"
                    component="h3"
                  >
                    Active Cases:
                  </Typography>
                  <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                  >
                    {covidData.Global.TotalConfirmed -
                      covidData.Global.TotalRecovered}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textSecondary"
                    component="h3"
                  >
                    Deceased Cases:
                  </Typography>
                  <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                  >
                    {covidData.Global.TotalDeaths}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={4} className={classes.sectionHeadTwo}>
            <Grid item xs={12} sm={6} md={6}>
              <Typography
                component="h2"
                variant="h3"
                color="textPrimary"
                gutterBottom
                className={classes.sectionHead}
              >
                Country Wise Count
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} className={classes.dropdownRegion}>
              <Typography component="h5" variant="h5" color="textPrimary">
                Select Country:
              </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCountry.CountryCode}
                  onChange={handleCountryChange}
                >
                  {covidData.Countries.map((item) => {
                    return (
                      <MenuItem key={item.CountryCode} value={item.CountryCode}>
                        {item.Country}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textSecondary"
                    component="h3"
                  >
                    Total Cases:
                  </Typography>
                  <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                  >
                    {selectedCountry.TotalConfirmed}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textSecondary"
                    component="h3"
                  >
                    Active Cases:
                  </Typography>
                  <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                  >
                    {selectedCountry.TotalConfirmed -
                      selectedCountry.TotalRecovered}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card} raised>
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    color="textSecondary"
                    component="h3"
                  >
                    Deceased Cases:
                  </Typography>
                  <Typography
                    component="h2"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                  >
                    {selectedCountry.TotalDeaths}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Dashboard;
