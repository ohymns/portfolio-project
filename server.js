import express, { response } from 'express';
import { request } from 'http';
import path from 'path';
import { CLIENT_RENEG_LIMIT } from 'tls';
import mongoose from 'mongoose'
import { error } from 'console';
import { stringify } from 'querystring';
import { url } from 'inspector';
//import { connectToDb , getDb } from './db';

const app = express();
app.set('view engine' , 'ejs')
app.use(express.json());
// Serve static files from the public directory
app.use(express.static(path.join(process.cwd(), 'public')));

const PORT = process.env.PORT || 3000;
//connecting to mongoDB database
mongoose.connect('mongodb+srv://oliviaheymanns:EasyPeasy@database-test.2aeusoi.mongodb.net/?retryWrites=true&w=majority&appName=database-test')
    .then(()=> console.log("Database Connected"))
    .catch(error => console.error(error))
//set database
const portfolioSchema = mongoose.Schema({
    author: { type: String, required: true },
    date: { type: Date, required: true } ,
    img_url: { type: String, required: true },
    title: { type: String, required: true } , 
    discription: { type: String, required: true } , 
    tags: { type: String, required: true }
})
const Image = mongoose.model('Image', portfolioSchema)

const blogSchema = new mongoose.Schema({
    author: { type: String, required: true },
    date: { type: String, required: true } ,
    img_url: { type: String, required: true },
    title: { type: String, required: true } , 
    content: { type: String, required: true } , 
    tags: { type: String, required: true }
})
const Blogpost = mongoose.model('Blogpost' , blogSchema)


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

// Route for the blog
app.get('/blog', async (req, res) => {
    res.render('blog', {blogposts: await Blogpost.find({}).exec()});
});
//update post 
app.patch('/blog/:id' , async (req , res) => {
    let updateData = req.body
    let newPost = await Blogpost.findByIdAndUpdate(req.params.id , updateData).exec()
    res.json(newPost)
})

app.delete('/blog/:id' , async (req , res) => {
     await Blogpost.deleteOne({_id : req.params.id})
})
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

app.post('/blog', async (req , res ) => {
    try {
        const blogpost = new Blogpost({
            author: "Olivia Heymanns",
            date: "01.04.24",
            img_url: "http//",
            title: "Event shoot for ***", 
            content: "This weekend, I was capturing *** for ***" , 
            tags: "events"
        })
        await blogpost.save()

        res.send('Blog post made :)')
    }catch (error) {
        console.error(error)
        res.send('Error: The cookie could not be created.') 
    } 
})



