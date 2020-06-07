const calc = (size, material, options, promo, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promoBlock = document.querySelector(promo),
          resultBlock = document.querySelector(result);

    let sum = 0;

    const calcFnc = () => {
        sum = Math.round(+sizeBlock.value * +materialBlock.value + (+optionsBlock.value));
        
        if (sizeBlock.value === '' || materialBlock.value === '') {
            resultBlock.textContent = 'Пожалуйста выберите материал или размер товара';
        
        } else if (promoBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);

        } else {
            resultBlock.textContent = sum;
        }
    }; 

    sizeBlock.addEventListener('change', calcFnc);
    materialBlock.addEventListener('change', calcFnc);
    optionsBlock.addEventListener('change', calcFnc);
    promoBlock.addEventListener('input', calcFnc);
};

export default calc;