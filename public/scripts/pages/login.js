function LoginPage() {
    const mainEl = document.createElement('div');

    mainEl.insertAdjacentHTML('afterbegin', `
        <link rel="stylesheet" href="styles/login.css">

        <div class="login-content">
            <div class="login-form-container">
                <div class="user-img-container">
                    <div class="user-img">
                        <img src="images/user.png" alt="user">
                    </div>
                </div>
                <form id="loginForm">
                    <div>
                        <select class="custom-select" name="username">
                            <option class="custom-select" value="null">Select yourself</option>
                        </select>
                        <div class="pin">
                            <input class="pin-input" type="number" name="pinCode" min="0" max="9999">
                        </div>
                        <p class="message-box" id="loginMsg"></p>
                    </div>
                </form>
            </div>
        </div>
    `);

    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const getFormData = (form) => {
        let ob = {};
        let data = new FormData(form);
        for (let [key, value] of data.entries()) {
            ob[key] = value;
        }
        return ob;
    }

    const createLoginCookie = (username) => {
        const date = new Date();
        date.setDate(date.getDate() + 4);
        document.cookie = `username=${username}&true; path=/; expires=${date.toUTCString()}`;
    }

    (async () => {
        const pinInput = mainEl.querySelector('.pin-input');
        const loginForm = mainEl.querySelector('#loginForm');
        if (pinInput) {
            pinInput.addEventListener('input', async (e) => {
                if (e.target.value.length === 4) {
                    e.target.blur();
                    const wrongPin = mainEl.querySelector('.message-box');
                    wrongPin.innerHTML = '';
                    const formData = getFormData(loginForm);
                    e.target.value = '';
                    startLoader();
                    let res = await sendPostRequest('login', formData);
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
        const selectTag = mainEl.querySelector('.custom-select');
        if (selectTag) {
            let res = await sendPostRequest(getAllUsers);
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
    })();

    return mainEl;
}

