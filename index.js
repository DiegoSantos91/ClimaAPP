if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const { application } = require('express');
const express = require('express')
const hbs = require('express-handlebars');
const app = express()
const port = process.env.PORT;
const api = require('./routes/buscar');
//handlebars
// servir contenido estatico (Midleware)
app.set('view engine', 'hbs')

app.use(express.static('public'));
app.use(express.json())

// app.engine('.hbs', hbs({
//   defaultLayout: 'default',
//   extname:'.hbs'
// }))
// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '\\views\\index.html');
// });
app.get('/api/buscar', (req, res) => {
  res.render('buscador'); 
});
app.use('/api',api)

app.listen(port, () => {
  console.log(`app listening at https://localhost:${port}`)
});
