import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sidebar } from "./Sidebar";


export function Header() {
    const [showSidebar, setShowSidebar] = useState(false)

    function handleShowSidebar() {
        setShowSidebar(!showSidebar)
    }

    return (
        <>
            <div className="w-full h-16 flex items-center justify-between px-5 bg-black">
                <div className="">
                    <GiHamburgerMenu className="text-2xl text-white" onClick={handleShowSidebar} />
                </div>

                <div className="w-12">
                    <img src="/Senech-white.png" alt="" className="object-cover w-full h-full" />
                </div>

                <Sidebar onShowSidebar={showSidebar}/>
            </div>
        </>
    )
}