const app = require('./app');
const connection = require('./config/db');
const UserModel = require('./Models/userModel');

const port = 3000;

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(port, ()=>{
    console.log(`Server listening on port https://localhost:${port}`);
})