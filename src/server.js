// const app = require('./app');

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`TinyLink backend listening on port ${PORT}`);
// });
const app = require('./app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`TinyLink backend running on port ${PORT}`);
});
