import React from "react";
import UserMenu from "./UserMenu";
import MyProfile from "../myProfile/MyProfile";


const NavigationBar = () => {
    return (
        <div className="flex justify-between items-center bg-gray-700 px-5 py-2 h-14 max-h-14">
            <MyProfile />
            <UserMenu />
        </div>
    )
}

export default NavigationBar