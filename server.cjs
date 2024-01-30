const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const {connectMongodb , getdb } = require('./db.cjs')

app.use(express.static(__dirname))
app.use(express.json())
app.use(bodyParser.json())
const port = 3000
let db
connectMongodb(function(error)
{
    if(!error)
    {
        app.listen(port, () => 
        console.log(` App listening on port http://localhost:${port}`
        ))
        db=getdb()
    }
    else
    {
        console.log(error)
    }
})
app.post('/add-data',(req,res)=>
{
    db.collection('ExpenseData')
    .insertOne(req.body).then(function()
    {
        res.status(200).send()
    })
   
})
app.get("/get-data",function(req,res)
{
    const entries=[]
    db.collection('ExpenseData').find()
    .forEach(element => {
        entries.push(element)
    }).then(()=>
    {
        res.status(200).json(entries)
    })
    
})


