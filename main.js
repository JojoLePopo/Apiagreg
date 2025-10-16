try {
  require('dotenv').config();
} catch (e) {
}

const RANDOMMER_API_KEY = process.env.RANDOMMER_API_KEY;
if (!RANDOMMER_API_KEY) {
  console.error('Missing RANDOMMER_API_KEY environment variable. Set it in your shell or in a .env file.');
  process.exitCode = 1;
}

const RM_HEADERS = { "X-Api-Key": RANDOMMER_API_KEY };


async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.json();
}

async function fetchText(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.text();
}


async function getRandomUser() {
  const data = await fetchJson("https://randomuser.me/api/");
  const u = data.results[0];
  return {
    name: `${u.name.first} ${u.name.last}`,
    email: u.email,
    gender: u.gender,
    location: `${u.location.city}, ${u.location.country}`,
    picture: u.picture.large,
  };
}

async function getPhoneNumber() {
  const data = await fetchJson("https://randommer.io/api/Phone/Generate?CountryCode=fr&Quantity=1", { headers: RM_HEADERS });
  return Array.isArray(data) ? data[0] : data;
}

async function getIban() {
  const text = await fetchText("https://randommer.io/api/Finance/Iban/fr", { headers: RM_HEADERS });
  return text.trim();
}

async function getCreditCard() {
  const c = await fetchJson("https://randommer.io/api/Card", { headers: RM_HEADERS });
  return {
    card_number: c.cardNumber,
    card_type: c.type,
    expiration_date: c.date ? c.date.split("T")[0] : undefined,
    cvv: c.cvv,
  };
}

async function getRandomName() {
  const data = await fetchJson("https://randommer.io/api/Name?nameType=firstname&quantity=1", { headers: RM_HEADERS });
  return Array.isArray(data) ? data[0] : data;
}

async function getQuote() {
  const arr = await fetchJson("https://zenquotes.io/api/random");
  const q = Array.isArray(arr) ? arr[0] : arr;
  return { content: q.q, author: q.a };
}

async function getJoke() {
  const arr = await fetchJson("https://official-joke-api.appspot.com/jokes/programming/random");
  const j = Array.isArray(arr) ? arr[0] : arr;
  return { type: "Programming", content: [j.setup, j.punchline].filter(Boolean).join(" ") };
}

async function main() {
  const [
    user,
    phoneNumber,
    iban,
    creditCard,
    randomName,
    quote,
    joke,
  ] = await Promise.all([
    getRandomUser(),
    getPhoneNumber(),
    getIban(),
    getCreditCard(),
    getRandomName(),
    getQuote(),
    getJoke(),
  ]);

  const output = {
    user,
    phoneNumber,
    iban,
    creditCard,
    randomName,
    quote,
    joke,
  };

  console.log(JSON.stringify(output, null, 2));
}

main().catch((err) => {
  console.error("Error in main:", err);
  process.exitCode = 1;
});
