const express = require("express");
const cors = require("cors")
const taskRoute = require("./routes/tasks.route");
const notFound = require("./middleware/notFound.middleware");
const error = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoute)

app.get('/health', (req,res) => {
    return res.json({ok : true});
})

// error middlewares
app.use(notFound);
app.use(error);



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listening to port: ${PORT}`);
})