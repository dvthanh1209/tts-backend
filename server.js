const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Cấu hình CORS để cho phép truy cập từ frontend
app.use(cors({
    origin: 'https://dvthanh1209.github.io', // URL GitHub Pages của bạn
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));



app.use(express.json());

// Định nghĩa API endpoint `/api/tts`
app.post('/api/tts', async (req, res) => {
    const { text, voice, speed } = req.body;
    const apiKey = '3hlR0ZtgRGnHh2lK2RBM582L4VYOOfiy'; // API key của bạn
    const url = 'https://api.fpt.ai/hmi/tts/v5';

    try {
        const response = await axios.post(url, {
            text: text,
            voice: voice || 'banmai',
            speed: speed || 0,
            format: 'mp3'
        }, {
            headers: {
                'api_key': apiKey,
                'Content-Type': 'application/json',
            }
        });
        res.json(response.data); // Trả về JSON từ FPT.AI
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Có lỗi xảy ra khi gọi API FPT.AI' });
    }
});

// Định nghĩa đường dẫn gốc để tránh lỗi "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Welcome to the TTS Backend!');
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
