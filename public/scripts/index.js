const loaderComponent = document.querySelector('.loader');
const appEl = document.querySelector('#app');

const getUserCookie = () => {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find((cookie) => {
        return cookie.indexOf('username=') >= 0;
    });
    if (userCookie) {
        const value = userCookie.split('=')[1];
        const valueSet = value.split('&');
        return {
            username: valueSet[0],
            alreadyLogined: valueSet[1]
        }
    }
    return null;
}

const sendPostRequest = async (mainAction, data) => {
	return await fetch('/.netlify/functions/api', {
		method: 'POST',
		body: JSON.stringify({
            action: mainAction,
            data: data
        }),
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

let userCookie = getUserCookie();

const loadPage = (page) => {
    appEl.innerHTML = '';
    appEl.insertAdjacentElement('afterbegin', page);
}

if (userCookie === null || !userCookie.alreadyLogined) {
    loadPage(LoginPage());
} else {
    startLoader();
    loadPage(MainPage());
}
