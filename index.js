const app = require("express")();
const PORT = 8080;
const appRoutes = require("./routes/apps");

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use("/apps", appRoutes);
