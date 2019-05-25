const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const port = process.argv[2] || 8080;

const app = express();
app.use(serveStatic(path.join(__dirname), {'index': ['index.html']}));
app.use(serveStatic(path.join(__dirname, '../')));
app.listen(port, () => console.log(`Listening on port ${port}`));

