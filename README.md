# IEU Announcements API

[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/izmirekonomiuni)

This project provides a RESTful API service that periodically scrapes and serves announcements and news from Izmir University of Economics (IEU). It includes announcements from various departments and automatically shares updates through a Telegram channel.

## Features

- 🔄 Periodic scraping of IEU announcements and news
- 🌐 RESTful API endpoints for different departments
- 📱 Automatic Telegram channel notifications
- 🌍 Supports both Turkish and English content
- 🔌 Easy deployment with Docker

## Available Endpoints

### English Endpoints

- `/api/announcements/en` - General announcements
- `/api/news/en` - News
- `/api/sfl-announcements/en` - School of Foreign Languages announcements
- `/api/oim-announcements/en` - Student Affairs Directorate announcements
- `/api/fecs-announcements/en` - Faculty of Engineering announcements
- `/api/dm-announcements/en` - Department of Mathematics announcements

### Turkish Endpoints

- `/api/announcements/tr` - General announcements
- `/api/news/tr` - News
- `/api/sfl-announcements/tr` - School of Foreign Languages announcements
- `/api/oim-announcements/tr` - Student Affairs Directorate announcements
- `/api/fecs-announcements/tr` - Faculty of Engineering announcements
- `/api/dm-announcements/tr` - Department of Mathematics announcements

## Installation

### Prerequisites

- Docker
- Docker Compose

### Setup and Running

1. Clone the repository:

```bash
git clone https://github.com/heudev/ieu-announcements.git
cd ieu-announcements
```

2. Create a `.env` file in the root directory with the following content:

```env
# Application Settings
APP_PORT=3001
SCRAPING_INTERVAL=120

# Database Settings
DB_HOST=mongodb
DB_PORT=27017
DB_NAME=ieu-announcements
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Telegram Bot Settings - General
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# Telegram Channel IDs - Announcements
TELEGRAM_CHAT_ID_ANNOUNCEMENT_TURKISH=your_chat_id
TELEGRAM_CHAT_ID_ANNOUNCEMENT_ENGLISH=your_chat_id

# Telegram Channel IDs - News
TELEGRAM_CHAT_ID_NEWS_TURKISH=your_chat_id
TELEGRAM_CHAT_ID_NEWS_ENGLISH=your_chat_id

# Telegram Channel IDs - School of Foreign Languages
TELEGRAM_CHAT_ID_SFL_ANNOUNCEMENT_TURKISH=your_chat_id
TELEGRAM_CHAT_ID_SFL_ANNOUNCEMENT_ENGLISH=your_chat_id

# Telegram Channel IDs - Student Affairs
TELEGRAM_CHAT_ID_OIM_ANNOUNCEMENT_TURKISH=your_chat_id
TELEGRAM_CHAT_ID_OIM_ANNOUNCEMENT_ENGLISH=your_chat_id

# Telegram Channel IDs - Faculty of Engineering
TELEGRAM_CHAT_ID_FECS_ANNOUNCEMENT_TURKISH=your_chat_id
TELEGRAM_CHAT_ID_FECS_ANNOUNCEMENT_ENGLISH=your_chat_id

# Telegram Channel IDs - Department of Mathematics
TELEGRAM_CHAT_ID_DM_ANNOUNCEMENT_TURKISH=your_chat_id
TELEGRAM_CHAT_ID_DM_ANNOUNCEMENT_ENGLISH=your_chat_id
```

3. Start the application using Docker Compose:

```bash
docker compose up -d
```

The API will be available at `http://localhost:3001`

## Telegram Channel

Join our Telegram channel to receive instant notifications: [IEU Announcements](https://t.me/izmirekonomiuni)
