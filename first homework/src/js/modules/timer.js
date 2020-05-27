const timer = (id, deadline) => { // Блок в который передадуться значения таймера
    const addZero = (num) => { // Если значение меньше 10 то добавить нуль в начало
        if (num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const getNewTime = (deadline) => { // Получаем дедлайн
        const t = Date.parse(deadline) - Date.parse(new Date()), // Получем разницу во времени
              seconds = Math.floor((t / 1000) % 60), // Получаем значения сек, мин, часов и дней
              minutes = Math.floor((t / 1000 / 60) % 60),
              hours = Math.floor((t / 1000 / 60 / 60) % 24),
              days = Math.floor(t / 1000 / 60 / 60 / 24);

        return { // Возвращаем объект
            'total': t,
            'seconds': seconds,
            'minutes': minutes,
            'hours': hours,
            'days': days
        };
   
    };

    const setClock = (selector, deadline) => { // Устанавливаем время в блок, который мы хотим
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); // Задаем интервал

        updateClock(); // Вызываем функцию сразу же, чтобы не отображалась одну секунду статичная вёрстка
        
        function updateClock() {
            const t = getNewTime(deadline); // Получаем объект с данными

            days.textContent = addZero(t.days); // Обновляем данные в таймере
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) { // Если разница меньше или равна 0 то прекратить отсчет
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';

                clearInterval(timeInterval); // Чистим интервал
            }
        }
    };
    
    setClock(id, deadline); // Вызываем с данными которые мы передали в main.js
};

export default timer;