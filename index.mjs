import express from 'express';
import fetch from 'node-fetch';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let apiKey = "lqv1Mc6kqGPOC1eF7m5t1Fzxrl-donO_sQCHPqFF7-U";
    let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index", { image: randomImage });
});

app.get('/earth', (req, res) => {
    let planetEarth = planets.getEarth();
    console.log(planetEarth);
    res.render('earth', { planetEarth });
});

app.get('/mercury', (req, res) => {
    let planetMercury = planets.getMercury();
    res.render('mercury', { planetMercury });
});

app.get('/venus', (req, res) => {
    let planetVenus = planets.getVenus();
    res.render('venus', { planetVenus });
});

app.get('/mars', (req, res) => {
    let planetMars = planets.getMars();
    res.render('mars', { planetMars });
});

app.get('/jupiter', (req, res) => {
    let planetJupiter = planets.getJupiter();
    res.render('jupiter', { planetJupiter });
});

app.get('/saturn', (req, res) => {
    let planetSaturn = planets.getSaturn();
    res.render('saturn', { planetSaturn });
});

app.get('/uranus', (req, res) => {
    let planetUranus = planets.getUranus();
    res.render('uranus', { planetUranus });
});

app.get('/neptune', (req, res) => {
    let planetNeptune = planets.getNeptune();
    res.render('neptune', { planetNeptune });
});

app.get('/pluto', (req, res) => {
    let planetPluto = planets.getPluto();
    res.render('pluto', { planetPluto });
});

// NASA Picture of the Day route
app.get('/nasa', async (req, res) => {
    try {
        let nasaApiKey = "9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD";
        let date = "2024-11-14";
        let url = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}&date=${date}`;
        let response = await fetch(url);
        let data = await response.json();
        res.render("nasa", { nasaData: data });
    } catch (error) {
        console.error('Error fetching NASA Picture of the Day:', error);
        res.render("nasa", { nasaData: { title: 'Error', explanation: 'Could not fetch NASA data.', url: '/img/nasa-default.jpg' } });
    }
});

app.listen(3000, () => {
    console.log('server started on http://localhost:3000');
});
