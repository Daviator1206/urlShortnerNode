const express = require("express")
const path = require("path")
const {connnectToMongoDb} = require("./connect")
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const URL = require("./models/url")
const app = express()

const port = 8001

connnectToMongoDb("mongodb://127.0.0.1:27017/url-shortner")
.then(()=>console.log("MongoDb successfully Connected!"))
.catch((err)=>console.log("Error ", err))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/", staticRoute)
app.use("/url",urlRoute)
app.get("/url/:shortId",async(req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId},{
        $push:{
            visitHistory:{
                timestamp: Date.now()
            }
        }
    })
    console.log(entry)
    res.redirect(entry.redirectURL)
})


app.listen(port, ()=>{
    console.log("Server Started!")
})