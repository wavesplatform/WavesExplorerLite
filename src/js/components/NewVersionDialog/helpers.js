export const isDialogEnabled = () => {
    const url = new URL(window.location);

    return !(/faucet/.test(url.pathname));
    // return url.searchParams.has('new_version');
};

export const setRedirectCookie = () => {
    const cookieName = 'new_version_url';
    const newVersionUrl = 'https://dev.wavesexplorer.com';
    const domain = '.wavesexplorer.com';
    const expires = new Date(2023, 11, 31).getTime();

    document.cookie=`${cookieName}=${newVersionUrl};domain=${domain};path=/;expires=${expires};`;
}
