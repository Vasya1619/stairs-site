import express from 'express';
import mysql from 'mysql2/promise';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;;
const DB_URL = 'mysql://root:VhBgJTsagbxEhYGpRguvVgczcJVlOGUZ@junction.proxy.rlwy.net:19689/railway'
const connection = await mysql.createConnection(DB_URL)
const JWT_SECRET = 'mySecretKey123';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use('/images', express.static('images'));


app.get('/', (req, res) => {
    res.sendFile('HTML/home.html', { root: 'public' });
});

app.get('/admin', async (req, res) => {
    const token = req.cookies.token;
    
    // Если нет токена — отправляем на страницу входа
    if (!token) {
        return res.redirect('HTML/login.html');
    }
    
    try {
        const userData = jwt.verify(token, JWT_SECRET);
        
        // Если не админ — отправляем на страницу входа
        if (userData.role !== 'admin') {
            return res.redirect('HTML/login.html');
        }
        
        // Все проверки пройдены — отдаем админ-панель
        res.sendFile('HTML/admin.html', { root: 'public' });
        
    } catch (err) {
        // Токен недействительный — на вход
        res.redirect('HTML/login.html');
    }
})

app.get('/api/images', (req, res) => {
    try{
        const files = fs.readdirSync('./public/images');
        res.json(files);
    } catch (err) {
        res.status(400).json(err)
    }
})

app.post('/api/login',  async (req, res) => {
    const { username, password } = req.body;
    const [users] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) {
        return res.status(401).json({message: 'Неверное имя пользователя или пароль'});
    }
    const user = users[0]
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Неверное имя пользователя или пароль' });
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
    }, JWT_SECRET, {expiresIn: '7d'})

    res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

    res.json({
        message: 'Успешный вход!',
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    })
})

app.get('/api/me', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) { return res.status(401).json({message: 'Вы не авторизованы!'}); }
        
        const userData = jwt.verify(token, JWT_SECRET);
        res.status(200).json({message: 'Вы авторизованы', user: userData})
    } catch (err) {
        return res.status(401).json({message: 'недействительный токен', err})
    }
})

app.post('/api/logout', async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Вы вышли из системы' });
});

app.get("/api/galleries", async (req, res) => {
  const [rows] = await connection.execute("SELECT id, name FROM gallery");
  res.json(rows);
});

app.post("/api/gallery/update", async (req, res) => {
  const { id, title, price, materials, duration } = req.body;

  await connection.execute(
    `UPDATE gallery 
     SET title = ?, price = ?, materials = ?, duration = ?
     WHERE id = ?`,
    [title, price, materials, duration, id]
  );

  res.json({ ok: true });
});



app.post("/api/gallery/update-images", async (req, res) => {
  const { gallery_id, img1, img2, img3 } = req.body;

  const images = [img1, img2, img3];

  for (let i = 0; i < images.length; i++) {

    if (!images[i]) continue;

    await connection.execute(
      `UPDATE gallery_img 
       SET url_image=? 
       WHERE gallery_id=? AND position=?`,
      [images[i], gallery_id, i + 1]
    );

  }

  res.json({ ok: true });
});

app.get("/api/galleries/full", async (req, res) => {
  try {
    const [galleries] = await connection.execute("SELECT * FROM gallery");
    const [images] = await connection.execute("SELECT * FROM gallery_img");

    res.json({ galleries, images });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "DB error" });
  }
});
async function start() {
    try {
        app.listen(PORT, () => console.log('SERVER IS STARTING ON ' + PORT));
    } catch (e) {
        console.log(e)
    }
}

start()