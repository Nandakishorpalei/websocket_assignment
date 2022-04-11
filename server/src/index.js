const app = require("./server");
const connect = require("./configs/db");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3003;
}
app.listen(port, async()=>{
    try{
        await connect();

        console.log("server runs on port 3003 with db connected")
    }
    catch(e){
        console.log(e.message)
    }
}) 