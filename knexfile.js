
module.exports = {

        client: 'pg',
        version: '9.6',
        connection: {
            user: 'postgres',
            password: 'meesbim',
            database: 'holidayapp'
        }
        // pool: {
        //   afterCreate: function (conn, done) {
        //     conn.query('SET timezone="UTC";', function (err) {
        //       if (err) {
        //         // first query failed, return error and don't try to make next query
        //         done(err, conn);
        //       } else {
        //         // do the second query...
        //         conn.query('SELECT set_limit(0.01);', function (err) {
        //           // if err is not falsy, connection is discarded from pool
        //           // if connection aquire was triggered by a query the error is passed to query promise
        //           done(err, conn);
        //         });
        //       }
        //     }
        //     )}
        // }
      
}