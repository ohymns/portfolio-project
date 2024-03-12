import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Route for the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/public/landing.html'));
});

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
