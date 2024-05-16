import { Header } from "../components/Header";

export default function CatatanHarian(){
    return(
        <>
        <div className="w-full overflow-x-hidden">
            <Header/>
            <div className="w-full h-dvh bg-black text-white">
                <div className="w-full justify-center flex pt-5 text-xl">
                    <h1>Dear Diary.</h1>
                </div>
            </div>
        </div>
        </>
    )
}