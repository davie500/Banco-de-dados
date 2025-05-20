import {Pool} from "pg"

export const connection = new Pool({
    port:5432,
    database:"senac",
    host:"localhost",
    password:"admin",
    user:"postgres"
})
await connection.connect().then((res)=>{
    console.log("database conectado")
})
export const database = {
    users:[]
}