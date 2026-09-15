
const express = require('express');

const app = express();

const PORT = 3003;

// Serve HTML and CSS files
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
});