// protected.js

function normalize(input) {
  input = input.toLowerCase().trim();

  // email case
  if (input.includes("@")) {
    return input.replace(/\s+/g, "");
  }

  // 🔥 sab non-digit hata do
  let digits = input.replace(/\D/g, "");

  // 🔥 last 10 digit lo (main fix)
  if (digits.length >= 10) {
    digits = digits.slice(-10);
  }

  return digits;
}

async function hashText(text) {
  const normalized = normalize(text);

  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// 🔥 protected hashes (same)
const PROTECTED_HASHES = [
  "950d846b1adc09c4bc5640b2c0c5bdbcfbe387b9cb287d024a32eef335a3815b",
  "148afe0fb4cfe6eff4a244be7feedca1143d3f61869a4243e40f992e8aada46a",
  "7473728a599cc243a9c9c36a20fe6704e6263d3dab414ce2a4a580ea9fb2f170",
  "416dfe4617501fcd9278d7af24d3aa2602fa28e60bb534ed515ac27fbcf1f95f",
  "a5b6e7f051b435fa8af2268856ce846bb463526c55e1d497925dd2ad62d6caaf",
  "92295ddc2ef8767d2446d09f93fc827449bb8cefc5f0d09debd9c37f838fb6f2",
  "2ca8972ef76819e9707eedaa477e2de2d29bc9d9a09fb54b1ace6f31599be1f6",
  "f57c392f4c0ab4e20f2576c45185ddea0587cfd44ac705e1bc204a52016019d3",
  "20cd4027a46fa2825ac251f42d1d55498602204581925255cc332d750c423122",
  "da24514a73d12f923ea0ec9f27707306af860c413b4cee41c3e9749b2bc6cc32",
  "a91457ff00ccd1229cf4aea926928cc67e880a7186d57d416db25f432051bbee",
  "aea4541746fd06ac229e9b2bc58093515e5a9e077e500c63df67d265fa57327d"
];

async function checkProtected(query) {
  const hash = await hashText(query);
  return PROTECTED_HASHES.includes(hash);
}

function showProtectedWarning() {
  alert(
    "⚠️ PROTECTED DATA WARNING\n\n" +
    "This number or email has been highly protected by the owner.\n\n" +
    "Unauthorized lookup attempts are monitored.\n\n" +
    "Do not try to bypass this protection."
  );
}
