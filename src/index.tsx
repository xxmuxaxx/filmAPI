import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "core/configureStore";
import App from "core/modules/app/App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
