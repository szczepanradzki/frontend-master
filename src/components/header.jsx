import React from "react";
import Logo from "../assets/img/fanuc-logo.png";
import {Link} from "framework7-react";

export function Header() {
    return (
        <div className="top-header">
            <Link href="/dashboard/"><img src={Logo} alt="fanuc logo"/></Link>
        </div>
    );
}
