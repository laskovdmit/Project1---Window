import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const allForms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          windows = document.querySelectorAll('[data-modal]');

    checkNumInputs('input[name="user_phone"]');

    const messageText = {
        loading: 'Загрузука...',
        finished: 'Спасибо! Скоро мы с вами свяжемся',
        error: 'Ошибка. Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = messageText.loading;

        let res = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => item.value = "");
    };

    allForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const message = document.createElement('div');
            message.classList.add('status');
            form.append(message);

            const formData = new FormData(form);

            if (form.getAttribute('data-calc') === 'end') {
                delete state['allow'];

                for (let key in state) {
                    formData.append(key, state[key]);
                    delete state[key];
                }
            }

            postData('../../assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    message.textContent = messageText.finished;
                })
                .catch(() => message.textContent = messageText.error)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        message.remove();
                    
                        windows.forEach(item => {
                            item.style.display = 'none';
                        });
                        document.body.style.overflow = "";
                    }, 5000);
                });
        });
    });
};

export default forms;