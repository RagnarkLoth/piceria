const controlador = {}

const { Console } = require('console')
const connection = require('express-myconnection')
const fs = require('fs')
const multer = require('multer')

controlador.listado = (consulta, respuesta) => {
    consulta.getConnection((error, conexion) => {
        conexion.query('SELECT * FROM dulces', (error, dulces) => {
            if(error){
                respuesta.json(error)
            }

            respuesta.render('listar_dulces', {
                data: dulces
            })

        })
    })
}

controlador.zona_crear = (consulta, respuesta) => {

    consulta.getConnection((error, conexion) => {
        conexion.query('SELECT * FROM fabrica', (error, fabricas) => {
            if(error){
                respuesta.json(error)
            }
            conexion.query('SELECT * FROM tipo_dulce', (error, tipo_dulces) => {
                if(error){
                    respuesta.json(error)
                }
                respuesta.render('crear_dulce', {
                    fabricas: fabricas,
                    tipo_dulces: tipo_dulces
                })
            })
        })
    })
}

controlador.zona_inicio=(consulta,respuesta)=> {
    respuesta.render ("index/index")
}

controlador.zona_historia=(consulta,respuesta)=> {
    respuesta.render ("historia/historia")
}

controlador.zona_iniciar=(consulta,respuesta)=> {
    respuesta.render("logging/iniciar/iniciar")
}

controlador.zona_registrar=(consulta,respuesta)=> {
    respuesta.render("logging/registrarse/registrar")
}

controlador.zona_mision_vision=(consulta,respuesta)=> {
    respuesta.render("MisionVision/MisionVision")
}

controlador.zona_combos=(consulta,respuesta)=> {
    respuesta.render("combos/combos")
}
controlador.zona_comerciales=(consulta,respuesta)=> {
    respuesta.render("comerciales/comerciales")
}

controlador.zona_compras=(consulta,respuesta)=> {

    consulta.getConnection((error,conexion)=>{
        if(error){
            respuesta.json(error)
        }
        conexion.query("SELECT nombre_departamento FROM departamento",(error, resultado, fields) => {
                console.log(resultado)
                console.log(fields)
        })
        
        conexion.query('SELECT * FROM departamento',(error,departamentos)=>{
            if(error){
                respuesta.json(error)
            }
            console.log(departamentos)
            conexion.query('select * from ciudad',(error,ciudades)=>{
                if(error){
                    respuesta.json(error)
                }

                conexion.query('select * from tipo_pago',(error,tipo_pago)=>{
                    if(error){
                        respuesta.json(error)
                    }

                    respuesta.render("comprar/comprar",{
                        departamento:departamentos,
                        ciudades:ciudades,
                        tipo_pago:tipo_pago
                    })
                    
                })
            })

        })
        
    })
}

controlador.crear_compra= ((consulta,respuesta)=>{
    
    let data = consulta.body
    consulta.getConnection((error,conexion)=>{
        conexion.query ('insert into comprar set ?',[data],(error,compra)=>{
            //respuesta.redirect("/comerciales")
        })
    })

})





controlador.zona_crear_compra = (consulta, respuesta) => {

    consulta.getConnection((error, conexion) => {
        conexion.query('SELECT * FROM departamento', (error, departamento) => {
            if(error){
                respuesta.json(error)
            }
            conexion.query('SELECT * FROM ciudad', (error, ciudad) => {
                conexion.query ('SELECT * from tipo_pago', (error,tipo_pago)=> {
                    if(error){
                        respuesta.json(error)
                    }
                    respuesta.render('crear_dulce', {
                        departamentos:departamento,
                        ciudades: ciudad,
                        tipos_pago: tipo_pago
                    })
                }) 
            })
        })
    })
}




controlador.guardar = ((consulta, respuesta) => {
    const data = consulta.body
    fs.renameSync(consulta.file.path, consulta.file.path + '.' + consulta.file.mimetype.split('/')[1])
    const rutaImagen = {

        ruta_foto: consulta.file.filename + '.' + consulta.file.mimetype.split('/')[1]

    }
    const dataFinal = Object.assign(data, rutaImagen)

    consulta.getConnection((error, conexion) => {
        conexion.query('INSERT INTO comprar SET ?', [dataFinal], (error, comprar) => {
            respuesta.redirect('/')
        })
    })

})

controlador.zona_editar = ((consulta, respuesta) => {

    const {id} = consulta.params
    consulta.getConnection((error, conexion) => {
        conexion.query('SELECT * FROM fabrica', (error, fabricas) => {
            if(error){
                respuesta.json(error)
            }
            conexion.query('SELECT * FROM tipo_dulce', (error, tipo_dulces) => {
                if(error){
                    respuesta.json(error)
                }
                conexion.query('SELECT * FROM dulces WHERE id_dulce=?', [id], (error, dulce) => {
                    respuesta.render('actualizar_dulces', {
                        data: dulce[0],
                        fabricas: fabricas,
                        tipo_dulces: tipo_dulces
                    })
                })
            })
        })
    })

}) 

controlador.actualizar = (consulta, respuesta) => {

    const {id} = consulta.params
    const actulizarDulce = consulta.body
    fs.renameSync(consulta.file.path, consulta.file.path + '.' + consulta.file.mimetype.split('/')[1])
    const rutaImagen = {

        ruta_foto: consulta.file.filename + '.' + consulta.file.mimetype.split('/')[1]

    }
    const dataFinal = Object.assign(actulizarDulce, rutaImagen)

    consulta.getConnection((error, conexion) => {
        conexion.query('SELECT ruta_foto FROM dulces WHERE id_dulce=?', [id], (error, dulce) => {

            fs.unlinkSync('src/public/imagenes/' + dulce[0].ruta_foto)
            
            conexion.query('UPDATE dulces SET ? WHERE id_dulce=?', [dataFinal, id], (error, filas) => {
                respuesta.redirect('/')
            })
        })
    })
}

controlador.eliminar = ((consulta, respuesta) => {
    const {id} = consulta.params

    consulta.getConnection((error, conexion) => {
        conexion.query('DELETE FROM dulces WHERE id_dulce = ?', [id], (error, filas) => {
            respuesta.redirect('/')
        })
    })
})

module.exports = controlador