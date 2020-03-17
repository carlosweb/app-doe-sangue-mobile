// config servidor
const express = require("express")
const server = express()

// config servidor para apresentar arquivos estaticos
server.use(express.static("../frontend/public"))

// habilitar body do formulario
server.use(express.urlencoded({extended: true}))

// config conexão com o banco

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'kaduba@2020',
    host: 'localhost',
    port: 5432,
    database: 'donation'
})


// config a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("../frontend", {
    express: server,
    noCache: true,
})

// config apresentação da página
server.get("/", function(req, res) {

    db.query("SELECT * FROM donors", function(err, result) {
        if(err) return res.send("Erro no banco de dados")

        const donors = result.rows
        return res.render("../frontend/index.html", {donors})
    })
})

server.post("/", function(req, res) {
    // pegar dados do formulario

    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name == "" || email == "" || blood == ""){
        return res.send("Preencha os campos")
    }

    // valores no postgres
    const query = `
       INSERT INTO donors ("name", "email", "blood")
       VALUES ($1, $2, $3)`
    
       const values = [name, email, blood]
       db.query(query, values, function(err) {
            if(err) return res.send("erro no banco de dados")

            return res.redirect("/")
       })
})


// ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function() {
    console.log("Sevidor Started")
})


