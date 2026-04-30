export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).send("Missing search query");
  }

  const API_KEY = "TG-@None_usernam3/@None_usernam3";

  const targetUrl =
    `https://noneusrxleakosintpro.vercel.app/db/${API_KEY}/search=` +
    encodeURIComponent(q);

  try {
    const apiResponse = await fetch(targetUrl);
    const text = await apiResponse.text();

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(apiResponse.status).send(text);
  } catch (error) {
    return res.status(500).send("Backend Error: " + error.message);
  }
}