const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 5000;
const sqrlDbCreds = require('./config/sql_db_creds')

const connection = mysql.createPool(sqrlDbCreds);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

require('./manageSearchData')(app, connection);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log('server listening on port ' + port);
});
