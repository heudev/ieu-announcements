require("./config")();
const express = require("express");
const helmet = require("helmet");
const loaders = require("./loaders");
const { Announcement, News, SflAnnouncement } = require("./routes");

loaders();

const app = express();
app.use(helmet());

app.get("/", (req, res) => {
    res.send(`
    <h1>IEU Announcements</h1>
    ENDPOINTS:
    <ul>
        <li>GET <a href="/api/announcement/en">/api/announcement/en</a></li>
        <li>GET <a href="/api/news/en">/api/news/en</a></li>
        <li>GET <a href="/api/sflannouncement/en">/api/sflannouncement/en</a></li>
    </ul>
    <ul>
        <li>GET <a href="/api/announcement/tr">/api/announcement/tr</a></li>
        <li>GET <a href="/api/news/tr">/api/news/tr</a></li>
        <li>GET <a href="/api/sflannouncement/tr">/api/sflannouncement/tr</a></li>
    </ul>
    <p>This application periodically checks the announcements and news of Izmir University of Economics and provides API service. It also shares announcements and news via Telegram channel.</p>
    <p>You can join the Telegram channel <a href="https://telegram.ieu.app">telegram.ieu.app</a> and get IEU notifications instantly.</p>
    `);
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.APP_PORT}`);

    app.use("/api/announcement", Announcement);
    app.use("/api/news", News);
    app.use("/api/sflannouncement", SflAnnouncement);
});