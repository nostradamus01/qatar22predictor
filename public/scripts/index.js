const loaderComponent = document.querySelector('.loader');

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

const userCookie = getUserCookie();

if (userCookie === null || !userCookie.alreadyLogined) {
    location.replace(createUrl('/toLogin'));
} else {
    startLoader();
    document.addEventListener('DOMContentLoaded', () => {
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                location.replace(createUrl('/toLogin'));
            });
        }
    });
}
