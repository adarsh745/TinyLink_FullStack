// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');

// const healthRoutes = require('./routes/health');
// const linkRoutes = require('./routes/links');
// const redirectRoutes = require('./routes/redirect');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Health check
// app.use('/healthz', healthRoutes);

// // API for links
// app.use('/api/links', linkRoutes);

// // Redirect handler must be last to not conflict with other routes
// app.use('/', redirectRoutes);

// module.exports = app;
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes (correct paths)
const healthRoutes = require('./routes/health');
const linkRoutes = require('./routes/links');
const redirectRoutes = require('./routes/redirect');

// Mount routes properly
app.use('/healthz', healthRoutes);
app.use('/api/links', linkRoutes);

// Redirect must be LAST (important)
app.use('/', redirectRoutes);

module.exports = app;
