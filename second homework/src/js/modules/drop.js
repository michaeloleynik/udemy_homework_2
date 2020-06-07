const drop = () => {
    // drag *
    // dragend *
    // dragenter - объект над dropArea
    // dragexit *
    // dragleave - объект за пределами dropArea
    // dragover - объект зависает над dropArea
    // dragstart *
    // drop - объект отправлен в dropArea

    const fileInputs = document.querySelectorAll('[name="upload"]'); // все импуты с именем загрузка

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => { // Навешиваем 4 события на все кнопки
        fileInputs.forEach(input => { 
            input.addEventListener(eventName, preventDefaults, false); // Запрещаем всплытие событий
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid #a12ab1"; // При наведении на инпут добавим границу и сделаем фон полупрозрачно-серым
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .1)";
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none"; // При отведении файла с области сбрасываем стили, причем для разных инпутов разные фоны
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => { // Для событий над рабочей областью навешиваем доп ф-ию ввиде добавления рамки и фона
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => { // Для событий вне рабочей области навешиваем доп ф-ию ввиде удаления рамки и фона
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => { // при событии сброса файла 
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files; // Получаем наз-е файла
            let dots;
            const arr = input.files[0].name.split('.'); // Разбиваем название в массив, деля наз-е и расширение

            arr[0].length > 6 ? dots = "..." : dots = '.'; // Если длина названия > 6 символов, значит в переменную dots 3 точки, иначе 1
            const name = arr[0].substring(0, 6) + dots + arr[1]; // Получаем из названия первые 6 символов, добавляем точку/точки и расширение файла
            input.previousElementSibling.textContent = name; // Записываем в блок рядом с кнопкой загрузить файл, новое имя файла
        });
    });
};

export default drop;