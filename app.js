const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('dist'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
