const modals = () => { 
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) { // 1. Получем объект с которым совершили действие, 2. какое окно будем открывать, 3. селектор, который закрывает окно, 4. При нажатии на подложку можно закрыть элемент?
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'), // Все модальные окна по с атрибутом [data-modal]
            scroll = calcScroll(); 

        trigger.forEach(item => { // Перебераем все окна и им навешиваем обработчик события
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => { // Все скрываем
                    item.style.display = 'none';
                });

                modal.style.display = "block"; // Показываем конкретное модальное окно
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
                // document.body.classList.add('modal-open');
            });
        });

        close.addEventListener('click', () => { // При нажатии на кнопку закрытия
            windows.forEach(item => { // Все окна скрываем
                item.style.display = 'none';
            });

            modal.style.display = "none"; // Конкретное модальное тоже скрываем
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            // document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e) => { 
            if (e.target === modal && closeClickOverlay) { // Если нажимаем на подложку, значит можно закрыть эл-т
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
                // document.body.classList.remove('modal-open');
            }
        });
    }

    function showModalByTime(selector, time) { // Показываем модальное окно через несколько секунд
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
        }, time);
    }

    function calcScroll() { // Убираем дергание страницы, просто добавляем маргин body равный ширине скролла
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close'); // Для кнопки вызвать замерщика
    bindModal('.phone_link', '.popup', '.popup .popup_close'); // Для ссылки "Перезвонить мне"
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close'); // Для кнопок "Расчитать стоимость"
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false); // Для кнопки далее в первой страницы калькулятора (На следущем модальном окне уже закрыть при нажатии на подложку нельзя)
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false); // Аналогично для последней страницы
    // showModalByTime('.popup', 60000);
};

export default modals;