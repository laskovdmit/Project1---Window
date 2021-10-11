const checkChoiseForm = (state) => {
    const windows = document.querySelectorAll('[data-modal]');

    windows.forEach(item => {
        if (item.style.display === "block" && item.classList.contains('popup_calc')) {

            if (state.height === undefined || state.width === undefined || state.form === undefined) {
                state.allow = false;
                return;
            } else {
                state.allow = true;
                return;
            }
        } 

        if (item.style.display === "block" && item.classList.contains('popup_calc_profile')) {

            if (state.type === undefined || state.profile === undefined) {
                state.allow = false;
                return;
            } else {
                state.allow = true;
                return;
            }
        }
    });
};

export default checkChoiseForm;