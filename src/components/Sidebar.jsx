import { FaBook, FaHome, FaWallet, FaWeight } from "react-icons/fa";
import { Link } from "react-router-dom";


export function Sidebar({ onShowSidebar }) {
    return (
        <>
            <div className={onShowSidebar ? 'w-[12rem] h-[47rem] -translate-x-5 translate-y-[407px] bg-black absolute transition-all duration-500' : 'w-[12rem] h-[47rem] -translate-x-96 translate-y-[407px] bg-black absolute transition-all duration-500'}>
                <ul className="w-full flex flex-col p-5 gap-10 text-white">
                    <div className="w-full">
                        <Link to='/'>
                            <li className="flex items-center gap-1"><FaHome /> Home</li>
                        </Link>
                    </div>

                    <div className="w-full">
                        <Link to='/keuangan'>
                            <li className="flex items-center gap-1"><FaWallet /> Keuangan</li>
                        </Link>
                    </div>

                    <div>
                        <Link to='/bb'>
                            <li className="flex items-center gap-1"><FaWeight /> Berat badan</li>
                        </Link>
                    </div>

                    <div>
                        <li className="flex items-center gap-1"><FaBook /> Diary</li>
                    </div>
                </ul>
            </div>
        </>
    )
}