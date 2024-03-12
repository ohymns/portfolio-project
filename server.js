import express from 'express';
import path from 'path';
const app = express()
const PORT = 3000
app.use(express.static('public'));

// Route for the CV page
app.get('/cv', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/download-cv/cv.html'));
});

// Default route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/landing.html'));
});

// Start the server
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});
