import axios from 'axios';

const BASE_URL = 'https://disease.sh/v3/covid-19';

export const getCountryData = async (countryName) => {
  if (!countryName) return null;
  
  try {
    const results = await Promise.allSettled([
      axios.get(`${BASE_URL}/countries/${countryName}`),
      axios.get(`${BASE_URL}/vaccine/coverage/countries/${countryName}?lastdays=1&fullData=true`)
    ]);

    const stats = results[0].status === 'fulfilled' ? results[0].value.data : null;
    const vaccine = results[1].status === 'fulfilled' ? results[1].value.data : null;

    if (!stats) return null;

    return {
      ...stats,
      vaccinations: vaccine?.timeline?.[0]?.total || 0,
      updatedAt: new Date(stats.updated).toLocaleString()
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return null;
  }
};