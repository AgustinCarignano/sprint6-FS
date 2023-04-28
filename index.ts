import fs from "fs";

//Extracted data from .txt file
const data = fs.readFileSync("./countries.txt", "utf-8");

//String data converted to an array
const dataArray = data.split(`
`);

//Structures to build the new data
const header = ["country", "population", "area", "density"];
const correctCountries: (string | number)[][] = [];
const incorrectCountries: (string | number)[][] = [];

//Logic to separate the data from each country, and calculate the density when the arguments are correct
for (let i = 1; i < dataArray.length - 1; i++) {
  if (!dataArray[i]) continue;
  let countryArr = dataArray[i].split(" ");
  let length = countryArr.length;
  let qon = 0;
  for (let j = 0; j < countryArr.length; j++) {
    if (
      parseInt(countryArr[j].replace(/,/g, "")) ||
      parseInt(countryArr[j].replace(/,/g, "")) === 0
    )
      qon++;
  }

  let country: string;
  let population: number | string;
  let area: number | string;
  let density: number | string;
  let newCountryArr: (string | number)[];
  if (qon === 2) {
    country = countryArr.slice(0, countryArr.length - 2).join(" ");
    population = parseInt(countryArr[length - 2].replace(/,/g, ""));
    area = parseInt(countryArr[length - 1].replace(/,/g, ""));
    density = parseFloat((population / area).toFixed(2));
    newCountryArr = [country, population, area, density];
    correctCountries.push(newCountryArr);
  } else {
    country = countryArr.slice(0, countryArr.length - qon).join(" ");
    population = "-";
    area = "-";
    density = "-";
    newCountryArr = [country, population, area, density];
    incorrectCountries.push(newCountryArr);
  }
}

//List of countries ordered by population density, from highest to lowest
correctCountries.sort((a, b) => {
  let n = a.length;
  if (b[n - 1] === "-") return 1;
  if (a[n - 1] > b[n - 1]) return -1;
  else if (a[n - 1] < b[n - 1]) return 1;
  else return 0;
});

//Data converted to a string
const finalList = [header, ...correctCountries, ...incorrectCountries];
const newCountryList = finalList.join(`
`);

//Create a new .csv file
fs.writeFileSync("countries.csv", newCountryList);
