import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import DropdownMenu from '../Navbar/DropdownMenu'
import "./ProfileInfo.scss"

export default function ProfileInfo() {
    const { user, logout } = useAuth0();

    return (
        <div id="profile-info">
            <img src={user.picture} alt={user.name} />
            <DropdownMenu key="login" text={user.name} children={[{ linkTo: `#`, text: "Log out", onClick: () => logout({ returnTo: process.env.PUBLIC_URL }) }]}></DropdownMenu>
        </div>
    )
}