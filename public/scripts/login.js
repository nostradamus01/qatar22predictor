const createLoginCookie = (username) => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    document.cookie = `username=${username}&true; path=/; expires=${date.toUTCString()}`;
}

const loaderComponent = document.querySelector('.loader');

const sendPostRequest = async (url, data) => {
	return await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const startLoader = () => {
    loaderComponent.classList.remove('hidden');
}

const stopLoader = () => {
    loaderComponent.classList.add('hidden');
}

document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

const getFormData = (form) => {
	let ob = {};
	let data = new FormData(form);
	for (let [key, value] of data.entries()) {
		ob[key] = value;
	}
	return ob;
}

const sendGetRequest = async (url) => {
	return await fetch(url, {
		method: 'GET',
	});
}

document.addEventListener('DOMContentLoaded', async () => {
    const pinInput = document.querySelector('.pin-input');
    const loginForm = document.querySelector('#loginForm');
    if (pinInput) {
        pinInput.addEventListener('input', async (e) => {
            if (e.target.value.length === 4) {
                e.target.blur();
                const wrongPin = document.querySelector('.message-box');
                wrongPin.innerHTML = '';
                const formData = getFormData(loginForm);
                e.target.value = '';
                startLoader();
                let res = await sendPostRequest(createUrl('/login'), formData);
                res = await res.json();
                createLoginCookie(formData.username);
                if (res.success) {
                    location.replace('../');
                } else {  
                    wrongPin.innerHTML = 'Սխալ PIN';
                    stopLoader();
                }
            }
        });
    }
    const selectTag = document.querySelector('.custom-select');
    if (selectTag) {
        let res = await sendPostRequest(createUrl('/getAllUsers'), {});
        res = await res.json();
        selectTag.innerHTML = '';
        selectTag.insertAdjacentHTML('afterbegin', `
            <option disabled selected hidden>Ընտրիր քեզ</option>
        `);
        res.users.forEach((user) => {
            selectTag.insertAdjacentHTML('beforeend', `
                <option value="${user.username}">${user.name_tr}</option>
            `);
        });
        stopLoader();
    }
});