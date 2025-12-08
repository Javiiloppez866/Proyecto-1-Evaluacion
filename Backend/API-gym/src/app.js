const express = require('express');
const initDatabase = require('./configuration/init-db');
const router = require('./routes/exercises');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api', router);

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`API corriendo en http://localhost:${PORT}`);
    });
});