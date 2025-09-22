import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar el service worker para PWA
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log("PWA instalada correctamente", registration);
  },
  onUpdate: (registration) => {
    console.log("Nueva versión disponible", registration);
    // Aquí podrías mostrar una notificación al usuario
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Nueva versión disponible. ¿Recargar?")) {
      window.location.reload();
    }
  }
});

// Medir performance (opcional)
reportWebVitals();

// Para desregistrar el service worker si es necesario:
// serviceWorkerRegistration.unregister();
