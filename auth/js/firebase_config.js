// Firebase App (compat) - CDN Version - No Modules
// Este ficheiro define a configuração e inicializa o Firebase globalmente.

const firebaseConfigGlobal = {
  apiKey: "AIzaSyDiWaekm6o3xjDWRBR310a3B-o0w2x6v_4",
  authDomain: "fmia-thevox.firebaseapp.com",
  projectId: "fmia-thevox",
  storageBucket: "fmia-thevox.firebasestorage.app",
  messagingSenderId: "666880260954",
  appId: "1:666880260954:web:ba9e3e34f25dae6c0c5163",
  measurementId: "G-C6BZSMH1E1"
};

// Inicializa o Firebase globalmente. Esta variável app não precisa ser exportada.
// Os outros scripts acederão a firebase.auth(), firebase.firestore() etc. diretamente.
if (typeof firebase !== "undefined" && typeof firebase.initializeApp === "function") {
  firebase.initializeApp(firebaseConfigGlobal);
  console.log("[Firebase Config] Firebase App inicializada globalmente via CDN.");
} else {
  console.error("[Firebase Config] Firebase SDK não carregado. Verifique os scripts CDN no HTML.");
}

