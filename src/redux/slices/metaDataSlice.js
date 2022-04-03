import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, END_POINT } from "../../constants";

const initialState = {
  countries: [],
  countriesMap: {},
  company_types: [],
  company_typesMap: {},
  currencies: [],
  currenciesMap: {},
  dialCodes: [],
  dialCodesMap: {},
  positions: [],
  positionsMap: {},
  regulators: [],
  regulatorsMap: {},
  trades_per: [],
  trading_volume: [],
  type_of_business: [],
  TypeOfBusinessMap: {},
  volume_per: [],
};

export const metaDataSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setMetaData: (state, action) => {
      console.log("action", action.payload);
      const {
        company_types,
        countries,
        currencies,
        positions,
        regulators,
        trades_per,
        trading_volume,
        type_of_business,
        volume_per,
      } = action.payload;

      state.countries = countries;
      state.company_types = company_types;
      state.currencies = currencies;
      state.positions = positions;
      state.trades_per = trades_per;
      state.trading_volume = trading_volume;
      state.type_of_business = type_of_business;
      state.volume_per = volume_per;
      state.regulators = regulators;
      state.dialCodes = countries.map((country) => country.dialing_code);

      for (const country of countries) {
        state.countriesMap[country.iso_code_2] = country;
        state.dialCodesMap[country.dialing_code] = country;
      }
      for (const companyType of company_types) {
        state.company_typesMap[companyType.uuid] = companyType.name;
      }
      for (const position of positions) {
        state.positionsMap[position.uuid] = position.name;
      }
      for (const regulator of regulators) {
        state.regulatorsMap[regulator.uuid] = regulator.name;
      }
      for (const tob of type_of_business) {
        console.log("TYPE", tob, type_of_business);
        state.TypeOfBusinessMap[tob.uuid] = tob.name;
      }
    },
  },
});

export const getMetaDataAsync = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${END_POINT.UTILS}${END_POINT.EXTERNAL_META_DATA}`
    );

    dispatch(setMetaData(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const { setMetaData } = metaDataSlice.actions;
export default metaDataSlice.reducer;