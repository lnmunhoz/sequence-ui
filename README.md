# sequence-ui

Simple UI for https://github.com/decimals/sequence

```
yarn # install dependencies
yarn start # run on port 3000
```

## Allow CORS on sequence

You need to allow sequence to accept requets from http://localhost:3000.

File: `transport.clj`

```clojure
(def service-map
  {::http/routes i/routes
   ::http/allowed-origins {:allowed-origins
                           ["https://decimals.stoplight.io",
                            "http://localhost:3000"] <-- Add this
                           :methods "GET,POST"}
```
