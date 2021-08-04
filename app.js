/* ---------------------------------------------------------------------------------- */
// Variables 

var express = require('express'),
    port = 8000,
    app = express(),
    pg = require('pg'),
    db = {
        user: 'editordb',
        host: 'localhost',
        database: 'testdb_editor',
        password: 'testeditor',
        port: 5432,
    };

/* ---------------------------------------------------------------------------------- */
// App setup 

app.use(express.json())                             // so we can parse data
app.use(express.static(__dirname + '/client'));     // to the client folder
app.listen(port);                                   // what port we're using

/* ---------------------------------------------------------------------------------- */
// Pool and Client connections

/*
dbuser: editordb
dbpass: testeditor
*/

const pool = new pg.Pool(db)
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

/* ---------------------------------------------------------------------------------- */
// Functionality for server

function getDBName(_obj, result) {
    var obj = JSON.parse(_obj);
    console.log(result)

    for (let dict_of_names of result) {
        // check if names match! we should not have any conflicting names, duplicates, or any weird occurances!
        if (obj["name"] === dict_of_names["name"]) {
            // now we have full row data from db:  | name | file_no | content | accessed |

            return dict_of_names["content"];
        }
    }
    return false;
}

/* ---------------------------------------------------------------------------------- */
// App post, get, update and delete

app.post('/data', function(request, response){
	var obj = JSON.stringify(request.body), // name | file_no
        found = false;

    pool.connect().then(client => {
        client.query('SELECT * FROM data_holdings')
        .then(result => {
            client.release()
            var content = getDBName(obj, result.rows)
            if (content) {
                response.send(content);
            }
            
        })
        .catch(error => {
            client.release()
            response.send("Error * ");
            console.log('There was an issue: ', error) 
        });
    });
});

console.log(`Serving on port: ${port}`)