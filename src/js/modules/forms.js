const forms = () => {
    const allForms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });

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

        console.log(res);
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

            const formData = new FormData(form),
                  obj = {};

            // formData.forEach((value, key) => {
            //     obj[key] = value;
            // });

            // console.log(obj);

            postData('../../assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    message.textContent = messageText.finished;
                })
                .catch(() => message.textContent = messageText.error)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => message.remove(), 5000);
                });

        });
    });
};

export default forms;