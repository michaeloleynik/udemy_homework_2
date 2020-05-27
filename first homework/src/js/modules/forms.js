import checkNumInputs from './checkNumInputs'; // Добавляем ф-ию с валидацией цифр

const forms = (state) => { // Получем объект переданный из main.js, если таков имеется
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]'); // Валидация цифр только для формы с атрибтом name="user_phone"

    const message = { // Различные статусы
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => { // Отправляем данные на сервер, только после этого выдаем результат ввиде одного из сообщений из объекта message
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => { // Чистим инпуты
        inputs.forEach(item => {
            item.value = '';
        });
    };

    form.forEach(item => { // Добавляем обработчик на все формы
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div'); // Создаем блок где будет храниться статус работы формы
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item); // Создаем форм дату
            if (item.getAttribute('data-calc') === "end") { // В него помещаем данные переданные из объекта, если форма калькулятор
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData) // Обращаемся к серву
                .then(res => { // Получаем промис, который будет выдавать результат
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs(); // По итогу чистим инпуты и удаляем статус через 5 сек
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });

        });
    });
};

export default forms;