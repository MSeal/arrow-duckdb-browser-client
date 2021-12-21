import * as duckdb from '@duckdb/duckdb-wasm';
import * as arrow from 'apache-arrow';
// const duckdb = require('@duckdb/duckdb-wasm');
// const arrow = require('apache-arrow');

(async () => {
    // DuckDB
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
    
    // Arrow
    try {
      const LENGTH = 2000;
      
      const rainAmounts = Float32Array.from(
        { length: LENGTH },
        () => Number((Math.random() * 20).toFixed(1)));
      
      const rainDates = Array.from(
        { length: LENGTH },
        (_, i) => new Date(Date.now() - 1000 * 60 * 60 * 24 * i));
      
      const rainfall = arrow.Table.new(
        [arrow.FloatVector.from(rainAmounts), arrow.DateVector.from(rainDates)],
        ['precipitation', 'date']
      );

      console.log("Rainfall:", rainfall.get(0).toString());

      let accum = 0;
      for (let val of rainfall.getColumn('precipitation').toArray()) {
         accum += val; 
      }

      console.log("average:", accum / rainfall.length)
 
      // TODO manipulate this table with DuckDB

    } catch (e) {
        console.error(e);
    }
})();