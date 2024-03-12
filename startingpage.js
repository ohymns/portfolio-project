import express from 'express'
const app = express()
const PORT = 3000
app.use(logger)
app.get('/' , (request , response)=>{
    response.send('Welcome to my Website!')
})
app.listen(PORT , ()=> {
    console.log('Started server on port ${PORT}')
})

app.get('/about' , (request , response)=>{
    response.send('Hey this is me :)')
})

app.get('/portfolio' , (request , response)=>{
    response.send('Take a look at my creations')
})
app.get('/contact' , (request , response)=>{
    response.send('feel free to contact me on: email or shoot me a DM on instsagram')
});
app.get('/math' , (request , response)=>{
    num1 = 5 ;
    num2 = 17 ;
    average = (num1 + num2) / 2;
    response.send(`the average of ${num1} and ${num2} is ${average}`)
})
app.get('/:slug' , (request, response) => {
    const notavailableId = request.params.slug

    response.send(`A page with the name " ${notavailableId} " was not found`)
})
app.get('/user/:userId/task/taskId', (request,response) => {
    const userId = request.params.userId
    const taskId = request.params.taskId

    response.send(`The user ID is ${userId} and the task ID is ${taskId}`)
})

app.get('/:slug' , (request, response) => {
    const notavailableId = request.params.slug

    response.send(`Im sorry, we could not find " ${notavailableId} " in the system`)
})

app.get('/math/:slug' , (request, response) => {
    const num1 = 67
    const num2 = 54
    const multiplication = num1 * num2
    response.send(`the result of ${num1} times ${num2} is ${multiplication} `)
})

import { logger } from './middlewares/logger.js'

app.use(express.static('public'))