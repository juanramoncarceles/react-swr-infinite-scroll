import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { SWRConfig } from "swr";

import App from "./App";

/*
() => {
  const toasts = useToasts()

  return (
    <Button
      error
      onClick={() => {
        if (toasts && toasts.current) {
          toasts.current.error('The Evil Rabbit jumped over the fence.')
        }
      }}
    >
      Show Toast
    </Button>
  )
}
*/

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <SWRConfig
      value={{
        onSuccess: (data, key) => {},
        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // We can send the error to Sentry,
            // or show a notification UI.
          }
        },
      }}
    >
      <App />
    </SWRConfig>
  </StrictMode>,
  rootElement
);
