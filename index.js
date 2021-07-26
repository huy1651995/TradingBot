const express = require('express')
const app = express()

app.use(express.json());
 
app.get('/', function (req, res) {
  res.send('Hello World')
})


app.post('/alert', function (req, res){
    console.log(req.body)
    res.json(req.body)
})
 
app.listen(3000, () => {
    console.log(`App listening at http://localhost:3000`);
  });
  