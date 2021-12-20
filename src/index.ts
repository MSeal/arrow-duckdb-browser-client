// import { AsyncDuckDB, ConsoleLogger, selectBundle, getJsDelivrBundles } from '@duckdb/duckdb-wasm';


// // Either bundle them manually, for example as Webpack assets
// import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb.wasm';
// import duckdb_wasm_next from '@duckdb/duckdb-wasm/dist/duckdb-next.wasm';
// const MANUAL_BUNDLES = {
//     mvp: {
//         mainModule: duckdb_wasm,
//         mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser.worker.js', import.meta.url).toString(),
//     },
//     next: {
//         mainModule: duckdb_wasm_next,
//         mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-next.worker.js', import.meta.url).toString(),
//     },
// };
// // ..., or load the bundles from jsdelivr
// const JSDELIVR_BUNDLES = getJsDelivrBundles();

// // Select a bundle based on browser checks
// const bundle = await selectBundle(JSDELIVR_BUNDLES);
// // Instantiate the asynchronus version of DuckDB-wasm
// const worker = new Worker(bundle.mainWorker);
// const logger = new ConsoleLogger();
// const db = new AsyncDuckDB(logger, worker);

// var value = await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
// console.log('inside: ' + value);


import * as duckdb from '@duckdb/duckdb-wasm';
// import * as arrow from 'apache-arrow';
// const duckdb = require('@duckdb/duckdb-wasm');
// const arrow = require('apache-arrow');

(async () => {
    try {
        const DUCKDB_CONFIG = await duckdb.getJsDelivrBundles();

        const logger = new duckdb.ConsoleLogger();
        const worker = new Worker(DUCKDB_CONFIG.asyncDefault.mainWorker);
        const db = new duckdb.AsyncDuckDB(logger, worker);
        await db.instantiate(DUCKDB_CONFIG.asyncDefault.mainModule);

        const conn = await db.connect();
        let result = await conn.query(`SELECT count(*)::INTEGER as v FROM generate_series(0, 100) t(v)`);
        console.log(result.chunks[0].get(0));

        await conn.close();
        await db.terminate();
        await worker.terminate();
    } catch (e) {
        console.error(e);
    }
})();
