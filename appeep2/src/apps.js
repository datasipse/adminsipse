import express from 'express';

const apps = express();
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('controllers', path.join(__dirname, 'controllers'));

let consultas = [];
app.locals.consultas = consultas;


app.use(express.static(path.join(__dirname, 'public')));
//app.use('/assets', express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, 'controllers')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/index'));



app.get('/helpme/add', (req, res) => {
  res.render('helpme.html')
});

app.post('/helpme/add', (req, res) => {
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  })
  client.connect()
    .then(() => {
      console.log("Conexión completa:");
    })
    .then(() => {
      const sql = 'INSERT INTO peep.helpme( idprofesional, nombre1, nombre2, apellido1, apellido2, tipoayuda, describepeticion, comunidad)' +
        'VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
      const params = [req.body.idprofesional,req.body.nombre1, req.body.nombre2, req.body.apellido1, req.body.apellido2, req.body.tipo, req.body.descrequerimiento, req.body.comunidad];
      return client.query(sql, params);

    })
    .then(results => {
      console.log('Result: ', results);
      res.redirect('/resultado')
      // res.render('list.html')

    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => client.end())

});

app.get('/history-requerimientos/QueryResult', (req, res) => {
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  })
  client.connect()
    .then(() => {
      console.log("Conexión completa:");
    })
    .then(() => {
      
      return client.query('select * from peep.helpme');
    })
    .then((results) => {
      console.log('Result Consulta:', results)
      res.redirect('/history-requerimientos')
     // res.render('listRequerimientos.html',results)
     consultas.length=0;
     consultas.push(results);
      })
    .catch(e => {
      console.log(e)
    })
    .finally(() => client.end())
});

app.post('/history-requerimientos/delete/:id', (req, res) => {
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  })
  client.connect()
 
    .then(() => {
      const sql='delete from peep.helpme where id= $1;'
      const params = [req.params.id];
      return client.query(sql, params);
    })
    .then((results) => {
      console.log('Resultado del borrado', results);
      res.redirect('/resultadodelete');
    })
    .catch(e => {
      console.log('Error',e)
    }
  ).finally(() => client.end())
});






export default apps;
