
import app from "./app.js";
import config from "./config/config.js";
import connectToDB from "./config/database.js";








const port = config.PORT || 5000;

connectToDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});