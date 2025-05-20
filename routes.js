import {Router} from "express"
import { connection, database } from "./db.js"

const dadosUsuario = [
    "name","email","password"
]

export const userRoutes = Router()

userRoutes.get("",async (req,res)=>{
    // const users = database.users
    // return res.status(200).json(users)
    const users = await connection.query("select * from Cliente;")
    return res.status(200).json(users)
})
userRoutes.post("",async(req,res)=>{
    const obj = {}
    for(const key in req.body){
        if(dadosUsuario.includes(key)){
            obj[key] = req.body[key]
        }
    }
    const infos = Object.keys(obj)
    if(infos.length < dadosUsuario.length){
        return res.status(403).
        json({message:`Dados inválidos, os dados que devem ser enviados são:
             ${dadosUsuario.map((dado)=>dado)}`})
    }
    const user = obj
    user.id = parseInt((new Date().getTime()/1000))
    
    //database.users.push(user)
    console.log(user,"user")
    const text = 'INSERT INTO usuarios(id, name, email, password) VALUES($1, $2,$3,$4) RETURNING *'
    const values = [user.id, user.name,user.email,user.password]
    const query = await  connection.query(text,values)
    // await pool.end()
    console.log(query,"query")
    return res.status(201).json(user)
})
userRoutes.get("/:id",(req,res)=>{
    const findUser = database.users.find((user)=>user.id === req.params.id)
    if(!findUser){
       return res.status(404).json({message:"Usuário não encontrado"})
    }
    return res.status(200).json(findUser)
    
})
userRoutes.delete("/:id",(req,res)=>{
    const findIndex = database.users.findIndex((user)=>user.id === req.params.id)
      if(findIndex === -1){
       return res.status(404).json({message:"Usuário não encontrado"})
    }
    database.users.splice(findIndex,1)
    return res.status(204).send()
})
userRoutes.patch("/:id",(req,res)=>{
     const findIndex = database.users.findIndex((user)=>user.id === req.params.id)
      if(findIndex === -1){
       return res.status(404).json({message:"Usuário não encontrado"})
    }
    const oldUser = database.users[findIndex]
    const obj = {}
    for(const key in req.body){
        if(dadosUsuario.includes(key)){
            obj[key] = req.body[key]
        }
    }
    const updateUser = {
        //name: obj.name ? obj.name : oldUser.name,
        //password: obj.password ? obj.password : obj.password,
        //email: obj.email ? obj.email : obj.email,
        //id: oldUser.id
        // jeito mais difícil.
        
        ...oldUser,
        ...obj,
        // jeito mias fácil.
    }
    database.users[findIndex] = updateUser
    return res.status(200).json(updateUser)
})