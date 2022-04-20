export const isDialogEnabled = () => {
    const url = new URL(window.location);

    return url.searchParams.has('new_version')
};

export const setRedirectCookie = () => {
    const cookieName = 'new_version_url';
    const newVersionUrl = 'https://dev.wavesexplorer.com';
    const domain = '.wavesexplorer.com';
    const expires = new Date(2023, 11, 31).toUTCString();
    const cookie = `${cookieName}=${newVersionUrl};domain=${domain};path=/;expires=${expires};`;

    document.cookie = cookie;
}
