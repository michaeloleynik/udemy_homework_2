import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

    checkNumInputs('#width'); // Вызываем ф-ию с валидацией для инпутов с расчётом ширины и высоты окон
    checkNumInputs('#height');

    function bindActionToElems(event, elem, prop) { // Что делаем с элементами? 1. Событие обработчика, 2. конкретный элемент, 3. Значение элемента, т.е когда будем записывать значение в объект formDate, это значение будет выступать ключём
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) { // Если элемент span, это для формы окна, то записывем в объект с ключём prop позицию в массиве формы окна их там несколько
                    case 'SPAN':
                        state[prop] = i;
                        break;
                    case 'INPUT': // Если инпут, и тип чекбокс и позиция = 0, то значение будет равно "Холодное" иначе "Теплое"
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                            elem.forEach((box, j) => { // Со всех чекбоксов снимаем галочку, если выбранный эл-т = перебираемому, значит ставим галочку
                                box.checked = false;
                                if (i == j) {
                                    box.checked = true;
                                }
                            });
                        } else { // Если не чекбокс, то просто считываем значение
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT': // Также считываем просто значение
                        state[prop] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }

    bindActionToElems('click', windowForm, 'form'); // Функция для формы окон
    bindActionToElems('input', windowHeight, 'height'); // Ф-ия для высоты окон
    bindActionToElems('input', windowWidth, 'width'); // Ф-ия для ширины
    bindActionToElems('change', windowType, 'type'); // Ф-ия для типа окна (холодное или горячее)
    bindActionToElems('change', windowProfile, 'profile'); // Ф-ия для профиля окна
};

export default changeModalState;