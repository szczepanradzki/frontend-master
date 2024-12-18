export class Auth {
    get getToken() {
        return sessionStorage.getItem("token");
    }

    set setToken(token) {
        sessionStorage.setItem("token", token);
    }

    get clearSession() {
        return sessionStorage.clear();
    }
}
