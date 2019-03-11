const express = require('express');
const app = express();

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
   });
   

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
