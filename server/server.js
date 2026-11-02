require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

// 1. Маршрут для получения всех товаров (с названием категории)
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT p.id, p.title, p.price, p.stock, c.name AS category
             FROM products p
             JOIN categories c ON c.id = p.category_id
             ORDER BY p.id`
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// 2. Маршрут для получения всех категорий
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT * FROM categories ORDER BY id`
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Сервер запущен: http://localhost:3000');
});