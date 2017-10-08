# Crossed

## Build Process

Just run:

```
npm start
```

This will kick off a rollup watch process that will create and place a `crossed.js` file into the build folder. At this point you can just visit the `build\index.html` to run the app locally. Notably, the `crossed.js` simply exports a `Crossed` object that is placed onto a global namespace in a browser enviorment, but can still be required like a normal module in a node enviorment. This export has a main function `const main = (mountId: string, initialState: any) => void` that run's the app on the given node. `index.html` handles this for you. It also exposes all of the other functions within the application though. This is used to test the compiled module node without having to have two seperate build processes. This could also easily be extended to run unit tests within a browser enviorment to analyize any JS engine differences in execution.