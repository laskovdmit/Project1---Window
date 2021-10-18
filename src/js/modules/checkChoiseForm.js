const checkChoiseForm = (state) => {
    const windows = document.querySelectorAll('[data-modal]');

    windows.forEach(item => {
        if (item.style.display === 'block' && item.classList.contains('popup_calc')) {

            if (state.height === undefined || state.width === undefined || state.form === undefined) {
                state.allow = false;

                const div = document.createElement('div');
                div.classList.add('status');
                div.textContent = "Вы ввели не все данные!";

                item.querySelector('.popup_calc_content').append(div);
                setTimeout(() => div.remove(), 5000);

                return;
            } else {
                state.allow = true;
                return;
            }
        } 

        if (item.style.display === 'block' && item.classList.contains('popup_calc_profile')) {

            if (state.type === undefined || state.profile === undefined) {
                state.allow = false;

                const div = document.createElement('div');
                div.classList.add('status');
                div.textContent = "Вы выбрали не все пункты!";

                item.querySelector('.popup_calc_profile_content').append(div);
                setTimeout(() => div.remove(), 5000);
                
                return;
            } else {
                state.allow = true;
                return;
            }
        }
    });
};

export default checkChoiseForm;