const sliders = (slides, dir, prev, next) => {
    let slideIdx = 1,
        paused = false;

    const items = document.querySelectorAll(slides);

    const showSlides = (n) => {
        if (n > items.length) {
            slideIdx = 1;
        }

        if (n < 1) {
            slideIdx = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';

            items[slideIdx - 1].style.display = 'block'; 
        }); 
    };

    showSlides();

    const plusSlides = (n) => {
        showSlides(slideIdx += n);
    };

    try {
        const prevBtn = document.querySelector(prev);
        const nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIdx - 1].classList.remove('fadeInLeft');
            items[slideIdx - 1].classList.add('fadeInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);

            items[slideIdx - 1].classList.remove('fadeInRight');
            items[slideIdx - 1].classList.add('fadeInLeft');
        });
    } catch (e) {}

    const activateAnim = () => {
        if (dir === 'vertical') {
            paused = setInterval(() => {
                plusSlides(1);

                items[slideIdx - 1].classList.add('fadeInDown');
            }, 4000);

        } else {
            paused = setInterval(() => {
                plusSlides(1);

                items[slideIdx - 1].classList.remove('fadeInRight');
                items[slideIdx - 1].classList.add('fadeInLeft');
            }, 4000);
        }

    };

    activateAnim();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnim();
    });
    
};

export default sliders;
