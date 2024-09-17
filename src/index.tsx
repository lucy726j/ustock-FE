import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./fonts/fonts.css";
import { AuthProvider } from "./contexts/authContext";

// Sentry 설정
// import * as Sentry from "@sentry/react";
// import { useEffect } from "react";
// import {
//   useLocation,
//   useNavigationType,
//   createRoutesFromChildren,
//   matchRoutes,
// } from "react-router-dom";

// Sentry.init({
//   dsn: "https://9ebd886018c37c250bd7e9536b0c8157@o4507837261021184.ingest.us.sentry.io/4507837311942656",
//   environment: "production",
//   integrations: [
//     Sentry.reactRouterV6BrowserTracingIntegration({
//       useEffect,
//       useLocation,
//       useNavigationType,
//       createRoutesFromChildren,
//       matchRoutes,
//     }),
//     Sentry.replayIntegration(),
//   ],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for tracing.
//   tracesSampleRate: 1.0,

//   // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
//   tracePropagationTargets: [/^\//, /^https:\/\/ustock.site\.io\/api/],

//   // Capture Replay for 10% of all sessions,
//   // plus for 100% of sessions with an error
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
// });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

reportWebVitals();
