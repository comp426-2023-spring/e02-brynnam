import { rps, rpsls } from "./rpsls.js";
import express from 'express';
import minimist from "minimist";
export const app = express.Router()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// endpoint at /app/ returns 200 OK
app.get("/", (req, res, next) => {
    res.set('Content-Type', 'application/json')
    res.status(200).json({"message":"200 OK"}); 
});

// endpoint at /app/rps/ returns {"player":"(rock|paper|scissors)"}
app.get("/rps/", (req, res, next) => {
    res.set('Content-Type', 'application/json')
    const player = rps(); 
    res.status(200).json({player});
});

// endpoint at /app/rpsls/ returns {"player":"(rock|paper|scissors|lizard|spock)"}
app.get("/rpsls/", (req, res, next) => {
    res.set('Content-Type', 'application/json')
    const player = rpsls(); 
    res.status(200).json({player});
});

// '/app/rps/play/' accepts the correct request bodies
app.get('/rps/play/', (req, res) => {
    res.set('Content-Type', 'application/json')
    const player = rps(req.query.shot);
    res.status(200).send(player);
});

app.post('/rps/play/', (req, res) => {
    res.set('Content-Type', 'application/json')
    const player = rps(req.body.shot);
    res.status(200).send(player);
});

// /app/rpsls/play/' accepts the correct request bodies
app.get('/rpsls/play/', (req, res) => {
    res.set('Content-Type', 'application/json')
    const player = rpsls(req.query.shot);
    res.status(200).send(player);
});

app.post('/rpsls/play/', (req, res) => {
    res.set('Content-Type', 'application/json')
    const player = rpsls(req.body.shot);
    res.status(200).send(player);
});

// the endpoint at '/app/rps/play/:shot/' returns the proper shot params
app.get('/rps/play/:shot/', (req, res) => {
    res.set('Content-Type', 'application/json')
    const player = rps(req.params.shot);
    res.status(200).send(player);
});

// the endpoint at '/app/rpsls/play/:shot/' returns the proper shot params
app.get('/rpsls/play/:shot/', (req, res) => {
    res.set('Content-Type', 'application/json')
    const player = rpsls(req.params.shot);
    res.status(200).send(player);
});

// Default undefined endpoint catcher
app.use((req, res, next) => {
    res.set('Content-Type', 'application/json')
    res.status(404).json({"message":"404 NOT FOUND"});
});

// running the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

export default app;