import React, {useState, useEffect} from "react";
import axios from "axios";
import {List, ListButton, ListInput, LoginScreenTitle, Page, View} from "framework7-react";

export default function ResetPassword(props) {
    const [privateCode, setPrivateCode] = useState("")
    const [password, setPassword] = useState("");
    const [replyPassword, setReplyPassword] = useState("");

    useEffect(() => {
        setPrivateCode(props.f7route.query.code);
    },[])

    const handleReset = async () => {
        await axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/auth/reset-password`, {
                code: privateCode,
                password: password,
                passwordConfirmation: replyPassword
            })
            .then(response => {
                alert("Twoje hasło zostało zresetowane.");
                props.$f7router.navigate("/");
            })
            .catch(error => {
                alert("Napotkano błąd:", error.response);
            });
    };
    return (
        <Page>
            <View>
                <Page loginScreen>
                    <LoginScreenTitle>Ustaw nowe hasło</LoginScreenTitle>
                    <List form>
                        <ListInput
                            type="password"
                            name="password"
                            placeholder="Podaj nowe hasło"
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                            validate
                            onValidate={(isValid) => setInputValid(isValid)}
                            errorMessage="Podaj nowe hasło"
                            required
                        />
                        <ListInput
                            type="password"
                            name="replyPassword"
                            placeholder="Wprowadź ponownie swoje hasło"
                            value={replyPassword}
                            onInput={(e) => setReplyPassword(e.target.value)}
                            validate
                            onValidate={(isValid) => setInputValid(isValid)}
                            errorMessage="Podaj ponownie swoje hasło"
                            required
                        />
                    </List>
                    <List>
                        <ListButton title="Zresetuj hasło" onClick={() => handleReset()}/>
                    </List>
                </Page>
            </View>
        </Page>
    );
}
