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
        <li>GET <a href="/api/announcement">/api/announcement</a></li>
        <li>GET <a href="/api/news">/api/news</a></li>
        <li>GET <a href="/api/sflannouncement">/api/sflannouncement</a></li>
    </ul>
    <p>This application checks the announcements and news of Izmir University of Economics once a minute and provides API service. It also shares announcements and news on its Telegram channel.</p>
    <p>You can join the Telegram channel <a href="https://t.me/izmiruniversityofeconomics">here</a> and get IEU notifications instantly.</p>
    `);
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);

    app.use("/api/announcement", Announcement);
    app.use("/api/news", News);
    app.use("/api/sflannouncement", SflAnnouncement);
});