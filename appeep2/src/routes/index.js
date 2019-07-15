const express = require('express');
const app= express();
const router =express.Router()

//home
router.get('/',  (req, res)=> {
    res.render('index.html',{title:'Home'});
 });

//loguin
  router.get('/loguin',  (req, res)=> {
   res.render('loguin.html',{title:'Iniciar sesión'});
});

//Menú formularios
router.get('/menu',  (req, res)=> {
    res.render('menu.html',{title:'SIPSE'});
 });

 //Mesa de ayuda
 router.get('/helpme',  (req, res)=> {
  res.render('helpme.html',{title:'Requerimientos'});
});
router.post('/helpme',  (req, res)=> {
     res.redirect('/resultado.html');
});
router.get('/resultado',  (req, res)=> {
  res.render('resultado.html',{title:'Requerimientos'});
});
//Listado de los requerimientos enviados
router.get('/history-requerimientos',  (req, res)=> {
  res.render('listRequerimientos.html',{title:'Requerimientos'});
});
//borrado exitoso de requerimientos
router.post('/resultadodelete',  (req, res)=> {
  res.render('resultDelete.html',{title:'Requerimientos'});
});
router.get('/resultadodelete',  (req, res)=> {
  res.render('resultDelete.html',{title:'Requerimientos'});
});

//pyp
router.get('/acciones-pyp',  (req, res)=> {
  res.render('./pyp/pyp.html',{title:'Promoción y Prevención'});
});

//linea po
router.get('/lineas', (req, res)=>{
 res.render('./pyp/lineas.html',{title:'Líneas de acción'});
})
router.get('/resultadomanager',  (req, res)=> {
  res.render('resultManager.html',{title:'Requerimientos'});
});
router.get('/managerdelete',  (req, res)=> {
  res.render('resultManagerDelete.html',{title:'Objeto eliminadao'});
});

//estrategias
router.get('/estrategias',  (req, res)=> {
  res.render('./pyp/estrategias.html',{title:'Estrategias'});
});
router.get('/listestrategias',  (req, res)=> {
  res.render('./pyp/listEstrategias.html',{title:'Estrategias'});
});


//procesos
router.get('/procesos',  (req, res)=> {
  res.render('./pyp/procesos.html',{title:'Procesos'});
});
router.get('/listprocesos',  (req, res)=> {
  res.render('./pyp/listProcesos.html',{title:'Procesos'});
});

//acciones
router.get('/acciones',  (req, res)=> {
  res.render('./pyp/acciones.html',{title:'Acciones Generales'});
});
router.get('/listacciones', (req,res)=>{
  res.render('./pyp/listAcciones.html', {title:'Acciones Generales'});
});

//especificas
router.get('/especificas',  (req, res)=> {
  res.render('./pyp/especificas.html',{title:'Acciones Específicas'});
});
router.get('/listespecificas', (req,res)=>{
  res.render('./pyp/listEspecificas.html', {title:'Acciones Generales'});
});


//temas
router.get('/temas',  (req, res)=> {
  res.render('./pyp/temas.html',{title:'Acciones Específicas'});
});
router.get('/listemas', (req,res)=>{
  res.render('./pyp/listTemas.html', {title:'Acciones Generales'});
});


 module.exports=router;