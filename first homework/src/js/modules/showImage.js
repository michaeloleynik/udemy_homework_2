const showImage = () => { // Создаем див, каринку, а также область с классом 'works' помещаем в переменную
    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImg = document.createElement('img');

    imgPopup.classList.add('popup'); // Добавим картинке класс popup, который добавляет визуальных эффектов
    workSection.appendChild(imgPopup); // К рабочей области добваляем блок

    imgPopup.style.justifyContent = 'center'; // Выравниваем её
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImg); // В блок добавляем картинку

    workSection.addEventListener('click', (e) => { // Для рабочей области добавляем событие
        e.preventDefault();
        let target = e.target;

        if (target && target.classList.contains('preview')) { // Если клик совершен был по картинке, то показываем конкретную картинку с увеличением
            imgPopup.style.display = 'flex';
            
            const path = target.parentNode.getAttribute('href');

            bigImg.setAttribute('src', path);

            document.body.style.overflow = 'hidden';
        }

        if (target && target.matches('div.popup')) { // Если клик по подложке, т.е не по самой картинке, то скрываем эл-т
            imgPopup.style.display = 'none';

            document.body.style.overflow = '';
        }
    });
};

export default showImage;
