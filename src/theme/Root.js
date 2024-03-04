import React from "react";

import { initAnalytics } from "./analytics";

initAnalytics();

export default function Root({ children }) {
  return <>{children}</>;
}
