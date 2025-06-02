const express = require('express');
const app = express();

app.use(express.static('.'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
