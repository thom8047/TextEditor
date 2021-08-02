var express = require('express'),
    port = 8000,
    app = express(),
    pg = require('pg');

app.use(express.static(__dirname + '/client')); //__dir and not _dir
app.listen(port);

const client = new pg.Client({
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: 'secretpassword',
    port: 3211,
});

client.connect()

client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
})

console.log(`Serving on port: ${port}`)