require("./config")();
const express = require("express");
const helmet = require("helmet");
const loaders = require("./loaders");
const { Announcement, News, SflAnnouncement, OimAnnouncement, FecsAnnouncement, DmAnnouncement } = require("./routes");

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
        <li>GET <a href="/api/sfl-announcements/en">/api/sfl-announcements/en</a></li>
        <li>GET <a href="/api/oim-announcements/en">/api/oim-announcements/en</a></li>
        <li>GET <a href="/api/fecs-announcements/en">/api/fecs-announcements/en</a></li>
        <li>GET <a href="/api/dm-announcements/en">/api/dm-announcements/en</a></li>
    </ul>
    <ul>
        <li>GET <a href="/api/announcements/tr">/api/announcements/tr</a></li>
        <li>GET <a href="/api/news/tr">/api/news/tr</a></li>
        <li>GET <a href="/api/sfl-announcements/tr">/api/sfl-announcements/tr</a></li>
        <li>GET <a href="/api/oim-announcements/tr">/api/oim-announcements/tr</a></li>
        <li>GET <a href="/api/fecs-announcements/tr">/api/fecs-announcements/tr</a></li>
        <li>GET <a href="/api/dm-announcements/tr">/api/dm-announcements/tr</a></li>
    </ul>
    <p>This application periodically checks the announcements and news of Izmir University of Economics and provides API service. It also shares announcements and news via Telegram channel.</p>
    <p>You can join the Telegram channel <a href="https://telegram.ieu.app">telegram.ieu.app</a> and get IEU notifications instantly.</p>
    `);
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.APP_PORT}`);

    app.use("/api/announcements", Announcement);
    app.use("/api/news", News);
    app.use("/api/sfl-announcements", SflAnnouncement);
    app.use("/api/oim-announcements", OimAnnouncement);
    app.use("/api/fecs-announcements", FecsAnnouncement);
    app.use("/api/dm-announcements", DmAnnouncement);
});