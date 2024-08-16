const PORT = 8080;
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/route')

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`)
});

app.get('/', (req, res) =>{
    res.send('Hello, world!');
})

