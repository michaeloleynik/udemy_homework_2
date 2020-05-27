const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => { // 1. Область в которой находяться табы, 2. все табы, 3. контент под табами, 4. класс активности который будем добавлять при нажатии, 5. Для разных эл-тов разные отображения, по дефолту блок, можно грид и флекс...
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);

    function hideTabContent() { // Скрываем весь контент под табами
        content.forEach(item => {
            item.style.display = 'none';
        });

        tab.forEach(item => { // Удаляем все классы, которые задают переход
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) { // По дефолту показываем перывый таб и его контент
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    header.addEventListener('click', (e) => { // Делегирование на табы в шапке
        const target = e.target;
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) || // Убираем точку, чтобы все было окей
                target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            tab.forEach((item, i) => { // Перебираем эл-ты показываем лишь тот, который нам надо
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};

export default tabs;