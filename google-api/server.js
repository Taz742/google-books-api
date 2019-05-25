const express = require('express');
const path = require('path');
const fs = require('fs');

function universalLoader(req, res) {
    const filePath = path.resolve(__dirname, '.', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        res.send(htmlData);
    });
};

const app = express();

app.use(express.static(path.resolve(__dirname, '.', 'build')));

app.use('*', universalLoader);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});