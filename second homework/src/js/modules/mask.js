const mask = selector => {
    const setCursorAt = (pos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);

        } else if (elem.createTextRange) {
            let range = elem.createTextRange();

            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    function createMask(e) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/gi, ''),
            val = this.value.replace(/\D/gi, '');

        if (def.length > val.length) {
            val = def;

        }

        this.value = matrix.replace(/./gi, a => {
            return /['_\d']/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (e.type === 'blur') {
            if (this.value.length === 2) {
                this.value = '';
            }
        } else {
            setCursorAt(this.value.length, this);
        }

    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

export default mask;