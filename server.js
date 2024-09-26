const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Cấu hình CORS để cho phép các domain khác truy cập
app.use(cors());
app.use(express.json());

// API endpoint trung gian
app.post('/api/tts', async (req, res) => {
    const { text, voice } = req.body;
    const apiKey = '3hlR0ZtgRGnHh2lK2RBM582L4VYOOfiy'; // Thay thế bằng API key của bạn
    const url = 'https://api.fpt.ai/hmi/tts/v5';

    try {
        const response = await axios.post(url, text, {
            headers: {
                'api_key': apiKey,
                'voice': voice || 'banmai',
                'Content-Type': 'application/json',
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Có lỗi xảy ra khi gọi API FPT.AI' });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
