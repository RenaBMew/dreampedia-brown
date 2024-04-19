// BE CORs request to Horoscope API for Vercel -  can be done in next.config
export default async function handler(req, res) {
  // * - Allow all origins
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const astroSign = req.query.sign;
  const response = await fetch(
    `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${astroSign}&day=TODAY`
  );
  const data = await response.json();

  res.status(200).json(data);
}
