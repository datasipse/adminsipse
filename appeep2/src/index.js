const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { Client } = require('pg');

//settings
app.set('port', 5000);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('controllers', path.join(__dirname, 'controllers'));



let consultas = [];
app.locals.consultas = consultas;

let respuestaQ=[];
app.locals.respuestaQ= respuestaQ;

let respuestaQE=[];
app.locals.respuestaQE= respuestaQE;

let respuestaQP=[];
app.locals.respuestaQP= respuestaQP;

let respuestaQA=[];
app.locals.respuestaQA= respuestaQA;

let respuestaQES=[];
app.locals.respuestaQES= respuestaQES;
//middlewares

//static
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/assets', express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname, 'controllers')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//routes
app.use(require('./routes/index'));


//ayuda
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

//carga de ie en datalist
app.get('/acciones-pyp/QueryIE', (req, res) => {
  const client2 = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  })
  client2.connect()
    .then(() => {
      console.log("Conexión completa:");
    })
    .then(async () => {
      try {
        return client2.query('select * from diree.ie');

      } catch (error) {
           console.log('Error vaya vaya!!!');
      }
    })
    .then((results) => {
      console.log('Result Consulta:', results)
      res.redirect('/acciones-pyp')
     // res.render('listRequerimientos.html',results)
     consultas.length=0;
     consultas.push(results);
     })
    .catch(e => {
      console.log(e)
    })
    .finally(() => client2.end())
   
});

//linea
app.post('/lineas/add', (req, res) => {
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
      const sql = 'INSERT INTO peep.linea(nombrelinea, objetivolinea)' +
        'VALUES ($1,$2)';
      const params = [req.body.linea,req.body.objlinea];
      return client.query(sql, params);

    })
    .then(results => {
      console.log('Result: ', results);
      res.redirect('/resultadomanager')
      // res.render('list.html')

    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => client.end())

});
app.get('/lineas/QueryResult', (req, res) => {
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
      return client.query('select * from peep.linea order by idlinea ASC');

    })
    .then((results) => {
      console.log('Result Consulta:', results)
      res.redirect('/lineas')
     // res.render('listRequerimientos.html',results)
     consultas.length=0;
     consultas.push(results);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => client.end())
   
   
});
app.post('/lineas/delete/:idlinea', (req, res) => {
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  
  })
  client.connect()
 
    .then(() => {
      const sql='delete from peep.linea where idlinea= $1;'
      const params = [req.params.idlinea];
      return client.query(sql, params);
    })
    .then((results) => {
      console.log('Resultado del borrado', results);
      res.redirect('/managerdelete');
    })
    .catch(e => {
        console.log('Error',e)
      }
    ).finally(() => client.end())
});
app.get('/lineas/CargaQueryLinea', (req, res) => {
  
  const conex= new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  })
  conex.connect()
    .then(() => {
      console.log("Conexión 2 completa:");
    })
    .then(() => {
      return conex.query('select * from peep.linea order by idlinea ASC');
    })
    .then((results2) => {
      console.log('Result Consulta2:', results2)
      res.redirect('/estrategias')
     // res.render('listRequerimientos.html',results)
     respuestaQ.length=0;
     respuestaQ.push(results2);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => conex.end())
   
   
});

//estrategia
app.post('/estrategias/add', (req, res) => {
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
      const sql = 'INSERT INTO peep.estrategias( nombreestrategia, idlinea )' +
        'VALUES ($1,$2)';
      const params = [ req.body.estrategia, req.body.lineaid];
      return client.query(sql, params);

    })
    .then(results => {
      console.log('Estrategia : ', results);
      res.redirect('/resultadomanager')
      // res.render('list.html')

    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => client.end())

});
app.get('/listestrategias/QueryEstrategias', (req, res) => {
  let resQEstrategia=[];
  app.locals.resQEstrategia= resQEstrategia;
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
      return client.query('select * from peep.estrategias order by idlinea ASC');

    })
    .then((results) => {
      console.log('Result Consulta:', results)
      res.redirect('/listestrategias')
     // res.render('listRequerimientos.html',results)
     resQEstrategia.length=0;
     resQEstrategia.push(results);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => client.end())
   
   
});
app.get('/estrategia/CargaQueryEstategia', (req, res) => {
  const conex= new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  })
  conex.connect()
    .then(() => {
      console.log("Conexión 3 completa:");
    })
    .then(() => {
      return conex.query('select * from peep.estrategias order by idestrategia ASC');
    })
    .then((results2) => {
      console.log('Result Consulta2:', results2)
      res.redirect('/procesos')
     // res.render('listRequerimientos.html',results)
     respuestaQE.length=0;
     respuestaQE.push(results2);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => conex.end())
   
   
});

//procesos
app.post('/procesos/add', (req, res) => {
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  
  })
  client.connect()
    .then(() => {
      console.log("Conexión 4 completa:");
    })
    .then(() => {
      const sql = 'INSERT INTO peep.procesos (nombreproceso, objetivoproceso, idestrategia)' +
                  'VALUES ($1,$2,$3)';
      const params = [req.body.proceso, req.body.objproceso, req.body.estrategiaid ];
      return client.query(sql, params);

    })
    .then(results => {
      console.log('Estrategia : ', results);
      res.redirect('/resultadomanager')
      // res.render('list.html')

    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => client.end())

});
app.get('/procesos/QueryProcesos', (req, res) => {
  let resQProcesos=[];
  app.locals.resQProcesos= resQProcesos;
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  
  })
  client.connect()
    .then(() => {
      console.log("Conexión 6 completa:");
    })
    .then(() => {
      return client.query('select * from peep.procesos order by idproceso ASC');

    })
    .then((results) => {
      console.log('Result Consulta Procesos:', results)
      res.redirect('/listprocesos')
     // res.render('listRequerimientos.html',results)
     resQProcesos.length=0;
     resQProcesos.push(results);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => client.end())
   
   
});
app.get('/procesos/CargaQueryProcesos', (req, res) => {

  const conex= new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  })
  conex.connect()
    .then(() => {
      console.log("Conexión 7 completa:");
    })
    .then(() => {
      return conex.query('select * from peep.procesos order by idproceso ASC');
    })
    .then((results2) => {
      console.log('Result Consulta 7:', results2)
      res.redirect('/acciones')
     // res.render('listRequerimientos.html',results)
     respuestaQP.length=0;
     respuestaQP.push(results2);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => conex.end())
   
   
});

//acciones
app.post('/acciones/add', (req, res) => {
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  
  })
  client.connect()
    .then(() => {
      console.log("Conexión 8 completa:");
    })
    .then(() => {
      const sql = 'INSERT INTO peep.acciones (nombreaccion, idproceso)' +
                  'VALUES ($1,$2)';
      const params = [req.body.accion,  req.body.procesoid ];
      return client.query(sql, params);

    })
    .then(results => {
      console.log('Acción : ', results);
      res.redirect('/resultadomanager')
      // res.render('list.html')

    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => client.end())

});
app.get('/acciones/QueryAcciones', (req, res) => {
  let resQAcciones=[];
  app.locals.resQAcciones= resQAcciones;
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  
  })
  client.connect()
    .then(() => {
      console.log("Conexión 9 completa:");
    })
    .then(() => {
      return client.query('select * from peep.acciones order by idacciones ASC');

    })
    .then((results) => {
      console.log('Result Consulta acciones:', results)
      res.redirect('/listacciones')
     // res.render('listRequerimientos.html',results)
     resQAcciones.length=0;
     resQAcciones.push(results);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => client.end())
   
   
});
app.get('/acciones/CargaQueryAcciones', (req, res) => {
  const conex= new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  })
  conex.connect()
    .then(() => {
      console.log("Conexión 7 completa:");
    })
    .then(() => {
      return conex.query('select * from peep.acciones order by idacciones ASC');
    })
    .then((results2) => {
      console.log('Result Consulta 9:', results2)
      res.redirect('/especificas')
     // res.render('listRequerimientos.html',results)
     respuestaQA.length=0;
     respuestaQA.push(results2);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => conex.end())
   
   
});

//especifica
app.post('/especifica/add', (req, res) => {
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  
  })
  client.connect()
    .then(() => {
      console.log("Conexión 9 completa:");
    })
    .then(() => {
      const sql = 'INSERT INTO peep.acciones_especificas (nombreaccion_especifica, idacciones)' +
                  'VALUES ($1,$2)';
      const params = [req.body.especifica,  req.body.accionid ];
      return client.query(sql, params);

    })
    .then(results => {
      console.log('Especifica : ', results);
      res.redirect('/resultadomanager')
      // res.render('list.html')

    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => client.end())

});
app.get('/especifica/QueryEspecifica', (req, res) => {
  let resQEspecifica=[];
  app.locals.resQEspecifica= resQEspecifica;
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  
  })
  client.connect()
    .then(() => {
      console.log("Conexión 9 completa:");
    })
    .then(() => {
      return client.query('select * from peep.acciones_especificas order by idacciones_especificas ASC');

    })
    .then((results) => {
      console.log('Result Consulta acciones:', results)
      res.redirect('/listespecificas')
     // res.render('listRequerimientos.html',results)
     resQEspecifica.length=0;
     resQEspecifica.push(results);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => client.end())
   
   
});
app.get('/acciones/CargaQueryEspecifica', (req, res) => {
  const conex= new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  })
  conex.connect()
    .then(() => {
      console.log("Conexión 7 completa:");
    })
    .then(() => {
      return conex.query('select * from peep.acciones_especificas order by idacciones_especificas ASC');
    })
    .then((results2) => {
      console.log('Result Consulta 9:', results2)
      res.redirect('/temas')
     // res.render('listRequerimientos.html',results)
     respuestaQES.length=0;
     respuestaQES.push(results2);
     })
    .catch(e => {
      console.log(e)
    }).finally(() => conex.end())
   
   
});

//temas
app.post('/temas/add', (req, res) => {
  const client = new Client({
    user: "postgres",
    password: "C4rl4M3nd0z4",
    host: "localhost",
    port: 5432,
    database: "sipse"
  
  })
  client.connect()
    .then(() => {
      console.log("Conexión 9 completa:");
    })
    .then(() => {
      const sql = 'INSERT INTO peep.temas (nombretema, idacciones_especificas)' +
                  'VALUES ($1,$2)';
      const params = [req.body.tema,  req.body.especificaid ];
      return client.query(sql, params);

    })
    .then(results => {
      console.log('Especifica : ', results);
      res.redirect('/resultadomanager')
      // res.render('list.html')

    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => client.end())

});


app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'));
});
