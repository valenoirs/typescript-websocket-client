const express = require('express');
const path = require('path');

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.static('build'));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});