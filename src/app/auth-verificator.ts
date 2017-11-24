
export class AuthVerificator {

    public login(data) {
        localStorage.setItem('access_token_received', String(Date.now()));
        localStorage.setItem('token_type', data.token_type);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('expires_in', data.expires_in);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('logged', 'true');
    }

    public refreshTokenData(data) {
        localStorage.setItem('access_token_received', String(Date.now()));
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('expires_in', data.expires_in);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('logged', 'true');
    }

    public logout() {
        localStorage.setItem('access_token_received', '');
        localStorage.setItem('token_type', '');
        localStorage.setItem('access_token', '');
        localStorage.setItem('expires_in', '');
        localStorage.setItem('refresh_token', '');
        localStorage.setItem('logged', 'false');
    }

    public isTokenExpired(callback) {
        // Contamos el tiempo que lleva el token activo y si está expirado mandamos renovar
        const expires_in = localStorage.getItem('expires_in');
        const access_token_received = localStorage.getItem('access_token_received');
        if (Number(access_token_received) + Number(expires_in) >= Date.now()) {
            return true;
        }
        return false;
    }

    public isLoggedIn() {
        // Verificamos que estemos loggeados, que tengamos un token de acceso y que este no haya expirado
        if (localStorage.getItem('logged') === 'true' && localStorage.getItem('access_token') !== '') {
            return true;
        } else {
            return false;
        }
    }
}
