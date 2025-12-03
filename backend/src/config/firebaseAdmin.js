import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

let app;

try {
  const serviceAccount = require("../../serviceAccountKey.json");

  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("Firebase admin initialized ✔️");
} catch (err) {
  console.warn("No Firebase service account found — running without admin.");
  app = admin;
}

export default app;
