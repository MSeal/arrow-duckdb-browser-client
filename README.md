# Arrow and DuckDB in a Browser Client

[Arrow](https://arrow.apache.org/docs/js/) and
[DuckDB](https://duckdb.org/docs/api/wasm) are exciting new technologies for
working with data tables in a variety of runtimes. You may be wondering if
either of these technologies might make sense in your project. This repository
is a starting point to quickly get Arrow and DuckDB running in a browser using
webpack.

## Build and Run

The project is set up to use nvm (or the [compatability mode in
asdf](https://github.com/asdf-vm/asdf-nodejs#nvmrc-and-node-version-support)).

Assuming you have nvm installed, run the following to launch the application.

```
nvm use
npm install
npm start
```

If you open the URL provided by the application, you should see a simple page
suggesting you "See the JS console for outputs." Do that!

There you will see a few example outputs exercising your working copy of DuckDB
and Arrow.js. 

If you want to experiment, you can work in the console interactively, or update
the code in `src/index.ts`.
