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
// Functionality for server, this will get messy soon!

/* function getFileByName(_obj, result) {
    var obj = JSON.parse(_obj),
        data = {};
    data.name = obj["name"]
    data.content = obj["content"]; // needing to get content
    data.accessed = obj["accessed"];
    data.file_no = obj["file_no"];
    data.type = obj["type"];

    //console.log(data); // just to check

    if (data.type == "open") {
        var name_list = [];
        for (let dict_of_names of result) {
            name_list.push(dict_of_names["name"])
            // here to get the files that exist in db
        }
        return name_list;
    } else if (data.type == "save") {
        for (let dict_of_names of result) {
            if (dict_of_names["name"] === data.name) {
                if (dict_of_names["content"] === data.content) {
                    console.log('nothing to save...')
                } else {
                    
                }
            }
            // here to get the files that exist in db
        }
    }
    return false;
} */

function getDBFiles(result) {
    var name_list = [];
    for (let dict_of_names of result) {
        name_list.push(dict_of_names["name"])
        // here to get the files that exist in db
    }

    if ( !name_list.length ) {
        return false;
    }

    return name_list;
}

/* ---------------------------------------------------------------------------------- */
// App post, get, update and delete

function getFileNames(response) {
    pool.connect().then(client => {
        if (true) {
            //console.log('yups')
            client.query('SELECT * FROM data_holdings;')
                .then(result => {
                    client.release() // release client

                    //console.log(result.rows); // just to see possible updates

                    var name_list = getDBFiles(result.rows)
                    
                    // respond with the list, so we can 
                    response.send(name_list);
                })
                .catch(error => {
                    client.release()
                    response.send("Error * ");
                    console.log('There was an issue pulling data from DB: ', error) 
                });
        }
    });
}

function getContentOf(files, res) {
    let filesDict = {};
    pool.connect().then(client => {
        const query = {
            //text: 'SELECT * FROM data_holdings WHERE name = ANY($1) ;',
            text: 'UPDATE data_holdings SET accessed = 1 WHERE name = ANY($1) RETURNING *',
            values: [files],
        }
        client.query(query).then(result => {
            client.release() // release client

            for (let ele of result.rows) {
                filesDict[ele.name] = [ele.content, ele.file_no];
            }
            res.send(filesDict);
        });
    });
}

app.get('/data', function(request, response) {
    var data = JSON.parse(JSON.stringify(request.query));

    switch (data['request']) {
        case 'names':
            getFileNames(response);
            break;
        case 'content':
            getContentOf(data['params'], response)
            break;
        default:
            console.log('no request given');
    }
});

app.post('/data', function(request, response){
	var obj = JSON.parse(JSON.stringify(request.body)), // name | file_no
        data = {};

    data.name = obj["name"]; data.content = obj["content"]; data.accessed = obj["accessed"]; data.file_no = obj["file_no"]; data.type = obj["type"];

    if (data.name == 'untitled.*') { console.log('new'); /* we know we need to INSERT */ }

    pool.connect().then(client => {
        //var text = `UPDATE data_holdings SET content = ${data.content} WHERE name = ${data.name}`
        const query = {
            text: 'UPDATE data_holdings SET content = $1, name = $2 WHERE file_no = $3;',
            values: [data.content, data.name, data.file_no],
        }
        client.query(query)
        .then(result => {
            client.release() // release client
            // posting to db
            response.send(query)
        })
        .catch(error => {
            client.release()
            response.send("Error * ");
            console.log('There was an issue saving file to DB: ', error) 
        });
    });
});

console.log(`Serving on port: ${port}`)

/* ---------------------------------------------------------------------------------- */
// Comments

/* var q = `UPDATE data_holdings SET content = ${data.content} WHERE name = ${dict_of_names["name"]}`
client.query(q); */