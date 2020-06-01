const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
    try{
        console.log(req.body);
        const { username } = req.body;
        const { password } = req.body;
        const { minDuration } = req.body;
        const { maxDuration } = req.body;
        const { minS } = req.body;
        const { maxS } = req.body;
        const newUser = await pool.query("INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6)", [username, password, minDuration, maxDuration, minS, maxS] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.post('/users/:username', async (req, res) => {
    try{
        const { username } = req.body;
        const allUsers = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        res.json(allUsers.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/users/:username', async (req, res) => {
    try{
        const { username } = req.params;
        const newUser = await pool.query("SELECT password FROM users WHERE username = $1", [username] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.put('/users/', async (req, res) => {
    try{
        const { username } = req.body;
        const { newusername } = req.body;
        const { minDuration } = req.body;
        const { maxDuration } = req.body;
        const { minS } = req.body;
        const { maxS } = req.body;
        const updateUser = await pool.query("UPDATE users SET username = $6, minduration = $5, maxduration = $2, minseason = $3, maxseason = $4 WHERE username = $1", [username, maxDuration, minS, maxS, minDuration, newusername] );
        res.json(updateUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.delete('/users/:username', async (req, res) => {
    try{
        const { username } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE username = $1", [username] );
        res.json("Deleted");
    } catch (err){
        console.error(err.message);
    }
})
app.listen(5000, () => {
    console.log("sercer start");
});

//Movies

app.post('/allp', async (req, res) => {
    try{
        const { primev } = req.body;
        const { netflix } = req.body;
        const { hulu } = req.body;
        const { disneyp } = req.body;
        const { genre } = req.body;
        const { genre2 } = req.body;
        const { genre3 } = req.body;
        const {minDuration} = req.body;
        const {maxDuration} = req.body;
        const newUser = await pool.query("SELECT id FROM allp WHERE (netflix = $1 or hulu = $2 or disneyp = $3 or primev = $4) and genre LIKE '%" + genre + "%' and genre LIKE '%" + genre2 + "%' and genre LIKE '%" + genre3 + "%' and duration < $5 and duration > $6 ORDER BY id ASC LIMIT 9", [ netflix, hulu, disneyp, primev, maxDuration, minDuration] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.post('/allps', async (req, res) => {
    try{
        const { input } = req.body;
        const newUser = await pool.query("SELECT id FROM allp WHERE title LIKE '%" + input + "%' or (genre LIKE '%" + input + "%' or directors LIKE '%" + input + "%') ORDER BY id ASC LIMIT 9");
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.post('/allp2', async (req, res) => {
    try{
        const { primev } = req.body;
        const { netflix } = req.body;
        const { hulu } = req.body;
        const { disneyp } = req.body;
        const { genre } = req.body;
        const { genre2 } = req.body;
        const { genre3 } = req.body;
        const newUser = await pool.query("SELECT id FROM allp WHERE netflix = 1 and (hulu = $1 or disneyp = $2 or primev = $3) and (genre LIKE '%" + genre + "%' or genre LIKE '%" + genre2 + "%' or genre LIKE '%" + genre3 + "%') ORDER BY id ASC LIMIT 9", [ hulu, disneyp, primev] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/allp/:title', async (req, res) => {
    try{
        const { title } = req.params;
        const newUser = await pool.query("SELECT title, rated, year, directors, genre, language, duration, type, country FROM allp WHERE id = $1", [ title ] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/allpg/:title', async (req, res) => {
    try{
        const { title } = req.params;
        const newUser = await pool.query("SELECT netflix, disneyp, primev, hulu FROM allp WHERE id = $1", [ title ] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/allpi/:title', async (req, res) => {
    try{
        const { title } = req.params;
        const newUser = await pool.query("SELECT posters.image FROM posters INNER JOIN allp on allp.title = posters.title WHERE allp.id = $1", [ title ] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/allpt/:title', async (req, res) => {
    try{
        const { title } = req.params;
        const newUser = await pool.query("SELECT allp.title, netflixd.type, netflixd.director, netflixd.cast, netflixd.year, netflixd.rating, netflixd.duration, netflixd.genre, netflixd.country, netflixd.description, netflixd.cast FROM allp inner join netflixd on allp.title = netflixd.title WHERE allp.id = $1", [ title ] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/allpd/:title', async (req, res) => {
    try{
        const { title } = req.params;
        const newUser = await pool.query("SELECT allp.title, disneyp.type, disneyp.rated, disneyp.year, disneyp.duration, disneyp.genre, disneyp.director, disneyp.language, disneyp.rating, disneyp.country, disneyp.awards, disneyp.votes, disneyp.description, disneyp.cast FROM allp inner join disneyp on allp.title = disneyp.title WHERE allp.id = $1", [ title ] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})

//preferences
//platform
app.post('/prefplat', async (req, res) => {
    try{
        const { username } = req.body;
        const { platform } = req.body;
        const newUser = await pool.query("INSERT INTO prefplat VALUES ($1, $2)", [username, platform] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/prefplat/:username', async (req, res) => {
    try{
        const { username } = req.params;
        const newUser = await pool.query("SELECT platform FROM prefplat WHERE username = $1", [username] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.delete('/prefplat/:username', async (req, res) => {
    try{
        const { username } = req.params;
        const deleteUser = await pool.query("DELETE FROM prefplat WHERE username = $1", [username] );
        res.json("Deleted");
    } catch (err){
        console.error(err.message);
    }
})

//genre
app.post('/prefgenre/', async (req, res) => {
    try{
        const { username } = req.body;
        const { genre } = req.body;
        const newUser = await pool.query("INSERT INTO prefgenre VALUES ($1, $2)", [username, genre] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/prefgenre/:username', async (req, res) => {
    try{
        const { username } = req.params;
        const newUser = await pool.query("SELECT genre FROM prefgenre WHERE username = $1", [username] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.delete('/prefgenre/:username', async (req, res) => {
    try{
        const { username } = req.params;
        const deleteUser = await pool.query("DELETE FROM prefgenre WHERE username = $1", [username] );
        res.json("Deleted");
    } catch (err){
        console.error(err.message);
    }
})

//Chat/discusion
app.post('/chat', async (req, res) => {
    try{
        console.log(req.body);
        const { user } = req.body;
        const { id } = req.body;
        const { message } = req.body;
        const { movie } = req.body;
        const newUser = await pool.query("INSERT INTO messages VALUES ($1, $2, $3, $4)", [id, movie, message, user] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/chat/:movie', async (req, res) => {
    try{
        const { movie } = req.params;
        const newUser = await pool.query("SELECT message, movie, messages.user FROM messages WHERE movie = $1 ORDER BY id ASC", [movie] );
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})
app.get('/chat/', async (req, res) => {
    try{
        const newUser = await pool.query("SELECT (id + 1) as inde FROM messages ORDER BY id DESC LIMIT 1");
        res.json(newUser.rows);
    } catch (err){
        console.error(err.message);
    }
})