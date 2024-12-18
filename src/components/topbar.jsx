import React, {useState, useEffect} from "react";
import {Appbar, Link, Button, Block} from "framework7-react";
import {Auth} from "../js/auth";

export function TopBar(props) {
    const [isDashboard, setIsDashboard] = useState(false);
    useEffect(() => {
        setIsDashboard(props.router.url !== "/dashboard/");
    })
    const auth = new Auth();
    const handleLogOut = () => {
        props.router.navigate("/");
        auth.clearSession;
    };
    return (
        <Appbar>
            {isDashboard &&
            <Button back iconF7="arrow_left_circle">Cofnij</Button>
            }
            <Block className="appbar__account-managment">
                <p className="appbar__account-managment--link">Jesteś zalogowany jako <strong>{sessionStorage.getItem("username")}</strong></p>
                <Button className="appbar__account-managment--button" outline onClick={() => handleLogOut()}>Wyloguj się</Button>
            </Block>
        </Appbar>
    );
}
