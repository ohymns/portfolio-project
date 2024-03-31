import express, { response } from 'express';
import { request } from 'http';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/api/v1/services' , (request,response) =>{
    response.json ({
     skills:[
        { name: 'photography' , price: "25 euro/h"},
        { name: 'design' , price: "per request"} ,
        { name: 'DJ' , price: "30 euro/h"} ,
        {name: "event planning" , price: "to be discussed" }
     ]
     })
    })
