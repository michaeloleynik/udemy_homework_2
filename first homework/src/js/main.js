import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import showImage from './modules/showImage';

window.addEventListener('DOMContentLoaded', () => { 
    "use strict";

    let modalState = {}; // Передаём пустой объект куда будем вносить данные с формы-калькулятора
    
    let deadLine = '2021-01-01'; // дэд лайн до которого будет работать таймер

    changeModalState(modalState); // Передаём пустой объект в который будут записываться значения с формы-калькулятора
    modals();
    tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active'); // Табы с остиклением
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click'); // Для табов с видом отделки
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
    forms(modalState); // Передаём объект в котором храняться значения с формы-калькулятора 
    timer('.container1', deadLine); // Таймер 
    showImage(); // Показ картинок в увеличенном формате
});