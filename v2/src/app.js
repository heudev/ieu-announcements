const express = require("express");
const helmet = require("helmet");
const loaders = require("./loaders");
const config = require("./config");
const { Announcement, News, SflAnnouncement } = require("./routes");

config();
loaders();

const app = express();
app.use(helmet());

app.get("/", (req, res) => {
    res.send(`
    <h1>IEU Announcements</h1>
    ENDPOINTS:
    <ul>
        <li>GET /api/announcement</li>
        <li>GET /api/news</li>
        <li>GET /api/sflannouncement</li>
    </ul>
        `);
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);

    app.use("/api/announcement", Announcement);
    app.use("/api/news", News);
    app.use("/api/sflannouncement", SflAnnouncement);
});