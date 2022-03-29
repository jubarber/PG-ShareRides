const { Router } = require("express");
const router = Router();
//const  getApiInfo = require("../controller/ApiLocalidades.js")
const axios = require('axios')
const { Localidad } = require('../db.js')


const getLocalidades = async()=>{
    const localTable = await Localidad.findAll();

    if(localTable.length === 0){

        try{
            const api = await axios.get("https://apis.datos.gob.ar/georef/api/localidades?aplanar=true&campos=estandar&max=5000&formato=json");
            const localidades = await api.data.localidades.map((l)=>{
                return{
                 //id: l.id,
                 nombre: l.nombre,
                 provincia: l.provincia_nombre,
                 municipio: l.municipio_nombre
                 }

            })
            localidades.map(async (e)=>{
                await Localidad.findOrCreate({
                    where:{
                        nombre: e.nombre,
                        provincia:e.provincia,
                        municipio: e.municipio
                    }
                })
            })
            return localidades
        } catch(error){
         
           console.log(error)
          //  next(error)
        }
    }else{
        return localTable
    }
}


router.get('/localidades', async (req, res)=>{
    const { name }= req.query
    const allLocalidades = await getLocalidades();
    try{

         if(name){
 
             const filtrado = allLocalidades.filter((e)=>{
                 return e.nombre.toLowerCase().includes(name.toLowerCase())
             })
             if(filtrado.length) return res.status(200).send(filtrado)
             return res.status(404).json("Localidad no existe")
         }else{
             return res.json(allLocalidades)
         }
     }catch(err){
         err
         console.log(err)
     } 
})

module.exports = router;