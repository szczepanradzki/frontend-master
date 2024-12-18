import React, {useState} from "react";
import axios from "axios";
import {List, ListButton, ListInput, LoginScreenTitle, Page, View, Navbar, NavRight, Link, Popup, Block, Button} from "framework7-react";
import {Auth} from "../js/auth";

export default function HomePage(props) {
    const auth = new Auth();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [inputValid, setInputValid] = useState(false);
    const [popupOpened, setPopupOpened] = useState(false);
    const [email, setEmail] = useState("");

    const handleLogin = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/local`, {
            identifier: login,
            password: password
        }).then(response => {
            if(response.data.user.blocked || !response.data.user.confirmed) {
                alert("Shall not pass!")
            } else {
                auth.setToken = response.data.jwt;
                sessionStorage.setItem("username", response.data.user.username);
                sessionStorage.setItem("userEmail", response.data.user.email);
                sessionStorage.setItem("userPhone", response.data.user.phone);
                sessionStorage.setItem("role", response.data.user.role.type);
                props.$f7router.navigate("/dashboard/");
            }

        }).catch(err => alert(err.message));
    };

    const handleForgottenPassword = async () => {
        const formdata = new FormData();
        formdata.append("email", email);
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/forgot-password`, {
            email
        }).then(resp => {
            if(resp.status === 200) {
                alert("Email do zresetowania hasła został wysłany");
            }
        }).catch(err => alert(err.message));

    };

    return (
        <Page>
            <View>
                <Page loginScreen>
                    <LoginScreenTitle>Logowanie</LoginScreenTitle>
                    <List form>
                        <ListInput
                            type="text"
                            name="login"
                            placeholder="Nazwa użytkownika"
                            value={login}
                            onInput={(e) => setLogin(e.target.value)}
                            validate
                            onValidate={(isValid) => setInputValid(isValid)}
                            errorMessage="Podaj nazwę użytkownika"
                            required
                        />
                        <ListInput
                            type="password"
                            name="password"
                            placeholder="Hasło"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            validate
                            onValidate={(isValid) => setInputValid(isValid)}
                            errorMessage="Podaj hasło"
                            required
                        />
                    </List>
                    <List>
                        <ListButton title="Zaloguj się" onClick={() => handleLogin()}/>
                        <ListButton title="Przypomnij hasło" popupOpen="#forgotten-password"/>
                    </List>
                </Page>
            </View>
            <Popup id="forgotten-password" opened={popupOpened} onPopupClosed={() => setPopupOpened(false)}>
                <Page>
                    <Navbar title="Przypomnienie hasła">
                        <NavRight>
                            <Link popupClose>Zamknij</Link>
                        </NavRight>
                    </Navbar>
                    <Block>
                        <List>
                            <ListInput
                                type="email"
                                name="email"
                                placeholder="Wpisz swój adres e-mail"
                                value={email}
                                onInput={(e) => setEmail(e.target.value)}
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                validate
                                onValidate={(isValid) => setInputValid(isValid)}
                                errorMessage="Podaj prawidłowy e-mail"
                                required
                            />
                            <Button round
                                    outline
                                    className="reset"
                                    disabled={!inputValid}
                                    onClick={() => handleForgottenPassword()}>Przypomnij</Button>
                        </List>
                    </Block>
                </Page>
            </Popup>
        </Page>
    );
}
