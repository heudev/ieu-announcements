require("./config")();
const express = require("express");
const helmet = require("helmet");
const loaders = require("./loaders");
const { Announcement, News, SflAnnouncement, OimAnnouncement } = require("./routes");

loaders();

const app = express();
app.use(helmet());

app.get("/", (req, res) => {
    res.send(`
    <h1>IEU Announcements</h1>
    ENDPOINTS:
    <ul>
        <li>GET <a href="/api/announcements/en">/api/announcements/en</a></li>
        <li>GET <a href="/api/news/en">/api/news/en</a></li>
        <li>GET <a href="/api/sflannouncements/en">/api/sflannouncements/en</a></li>
        <li>GET <a href="/api/oimannouncements/en">/api/oimannouncements/en</a></li>
    </ul>
    <ul>
        <li>GET <a href="/api/announcements/tr">/api/announcements/tr</a></li>
        <li>GET <a href="/api/news/tr">/api/news/tr</a></li>
        <li>GET <a href="/api/sflannouncements/tr">/api/sflannouncements/tr</a></li>
        <li>GET <a href="/api/oimannouncements/tr">/api/oimannouncements/tr</a></li>
    </ul>
    <p>This application periodically checks the announcements and news of Izmir University of Economics and provides API service. It also shares announcements and news via Telegram channel.</p>
    <p>You can join the Telegram channel <a href="https://telegram.ieu.app">telegram.ieu.app</a> and get IEU notifications instantly.</p>
    `);
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.APP_PORT}`);

    app.use("/api/announcements", Announcement);
    app.use("/api/news", News);
    app.use("/api/sflannouncements", SflAnnouncement);
    app.use("/api/oimannouncements", OimAnnouncement);
});