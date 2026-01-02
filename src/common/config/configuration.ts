export const configuration = () => ({
  smappen_pelias: {
    host: process.env.PELIAS_API_HOST,
  },
  open_route: {
    api_key: process.env.OPEN_ROUTE_API_KEY,
    host: process.env.OPEN_ROUTE_API_HOST,
  },
  open_meteo: {
    host: process.env.OPEN_METEO_API_HOST,
  },
});
