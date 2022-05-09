const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/karaoke-songbook'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/karaoke-songbook/index.html'));});
app.listen(process.env.PORT || 8080);
