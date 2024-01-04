const express = require('express');
const multer = require('multer');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

let database = {};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/job-description', (req, res) => {
  const { userId, jobDescription } = req.body;

  if (!database[userId]) {
    database[userId] = {};
  }
  database[userId].jobDescription = jobDescription;

  res.status(200).json({ message: 'Job description saved successfully!' });
});

app.post('/upload-resume', upload.single('resume'), (req, res) => {
  const { userId } = req.body;

  if (!database[userId]) {
    database[userId] = {};
  }
  database[userId].resume = req.file.filename;

  res.status(200).json({ message: 'Resume uploaded successfully!' });
});

app.get('/user/:userId', (req, res) => {
  const { userId } = req.params;

  if (database[userId]) {
    res.status(200).json(database[userId]);
  } else {
    res.status(404).json({ message: 'User not found!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
