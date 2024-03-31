import express, { response } from 'express';
import { request } from 'http';
import path from 'path';
import { CLIENT_RENEG_LIMIT } from 'tls';
import mongoose from 'mongoose'
import { error } from 'console';

const app = express();
app.set('view engine' , 'ejs')
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb+srv://oliviaheymanns:IndecisiveAF@database-test.2aeusoi.mongodb.net/')
    .then(()=> console.log("∞∞Database∞∞Connected"))
    .catch(error => console.error(error))


// Serve static files from the public directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Route for the landing page
//app.get('/', (req, res) => {
//    res.sendFile(path.join(process.cwd(), '/public/landing.html'));
//});

app.get('/' , (req,res) => {
    res.render('index')
})
// Route for the CV download page
app.get('/cv', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/download-cv/cv.html'));
});

// Route for the hire me page
app.get('/hire-me', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/hire-now/hire-now.html'));
});

// Route for the portfolio
app.get('/portfolio', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/portfolio-page/portfolio.html'));
});

// Route for the portfolio
app.get('/about', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/about-me/about.html'));
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//Dynamic server site
app.get('/:slug' , (request, response) => {
   const sluging = request.params.slug
   response.send(`sorry we dont have ${sluging} on this site`)
})

app.get('/:slug/*' , (request, response) => {
    const sluging = request.params.slug
    response.send(`sorry we dont have ${sluging} on this site`)
})


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
 
   app.get('/api/v1/hobbies' , (request,response) =>{
    response.json ({
     skills:[
        { name: 'photography' , price: "25 euro/h"},
        { name: 'design' , price: "per request"} ,
        {name: "event planning"}
     ]
     })
    })


    
