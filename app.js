var express = require('express'),
    port = 8000,
    app = express();

app.use(express.static(__dirname + '/client')); //__dir and not _dir
app.listen(port);

console.log(`Serving on port: ${port}`)