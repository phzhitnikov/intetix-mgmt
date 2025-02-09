import express from 'express';

const app = express();
const port = 3000;
const hostname = '0.0.0.0';

app.use(express.static('dist'));

app.listen(port, hostname, () => {
    console.log(`Server running at http://localhost:${port}`);
});