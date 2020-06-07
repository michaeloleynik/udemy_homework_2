const checkTextInputs = selector => {
    const inputs = document.querySelectorAll(selector);

    inputs.forEach(item => {
        item.addEventListener('keypress', (e) => {
            if (e.key.match(/[^а-яё 0-9]/gi)) {
                e.preventDefault();
            }
        });
    });
};

export default checkTextInputs;