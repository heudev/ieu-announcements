const sendTelegramMessage = async (chatId, message) => {
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });
    }
    catch (error) {
        console.log('Failed to send message to Telegram' + error);
    }
};

module.exports = { sendTelegramMessage };