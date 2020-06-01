const modals = () => {
    let btnPressed = false;

    const bindModal = (triggerSelector, modalSelector, closeSelector, destroy = false) => { // 1. Получем объект с которым совершили действие, 2. какое окно будем открывать, 3. селектор, который закрывает окно, 4. При нажатии на подложку можно закрыть элемент?
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

                if (destroy) {
                    item.remove();
                }

                btnPressed = true;

                windows.forEach(item => { // Все скрываем
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                modal.style.display = 'block'; // Показываем конкретное модальное окно
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => { // При нажатии на кнопку закрытия
            windows.forEach(item => { // Все окна скрываем
                item.style.display = 'none';
            });

            modal.style.display = 'none'; // Конкретное модальное тоже скрываем
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) { // Если нажимаем на подложку, значит можно закрыть эл-т
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.body.style.marginRight = `0px`;
                
            }
        });
    };

    const showModalByTime = (selector, time) => { // Показываем модальное окно через несколько секунд  
        setTimeout(function () {
            let display;
            let scroll = calcScroll();

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            }); 

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';
                document.body.style.marginRight = `${scroll}px`;
            }
            
        }, time);
    };

    const calcScroll = () => { // Убираем дергание страницы, просто добавляем маргин body равный ширине скролла
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    };

    const isPressed = (selector) => {
        window.addEventListener('scroll', () => {
            let scrollH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= scrollH) {
                document.querySelector(selector).click();
            }
        });
    };

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);

    isPressed('.fixed-gift');

    showModalByTime('.popup-consultation', 5000);
};

export default modals;