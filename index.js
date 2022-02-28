const app = require('./server');

// Port
const PORT = 3300;

// Server listening on a specific port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))