const express = require('express');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main'
}));

app.set('view engine', 'hbs');
app.set('views', './templates');

// Static files
app.use(express.static('public'));

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }

    console.log('Connected to MySQL database');
});

// Home page
app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM article',
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }

            console.log(results);

            res.render('index', {
                articles: results
            });
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
