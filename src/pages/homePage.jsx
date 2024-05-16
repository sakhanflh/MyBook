import { useEffect, useState } from "react";
import { Header } from "../components/Header";

export default function HomePage() {
    const [totalKeuangan, setTotalKeuangan] = useState(0);
    const [weights, setWeights] = useState([]);

    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            const transactions = JSON.parse(storedTransactions);
            const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
            setTotalKeuangan(total);
        }
    }, []);

    const formatCurrency = (number) => {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    };

    useEffect(() => {
        const storedWeights = localStorage.getItem('weights');
        if (storedWeights) {
            const weights = JSON.parse(storedWeights);
            setWeights(weights);
        }
    }, []);

    return (
        <>
            <div className="overflow-x-hidden w-full">
                <Header />
                <div className="bg-black px-5 pt-5 flex flex-col gap-5 w-full h-dvh">
                    <div className="w-full h-28 p-5 border flex items-center justify-center bg-uang-section text-white rounded-xl text-xl flex-col gap-3">
                        <h1>Total Finances</h1>
                        <div className="flex gap-2">
                            <p>{formatCurrency(totalKeuangan)},-</p>
                        </div>
                    </div>

                    <div className="flex flex-col p-5 bg-bb-section rounded-xl border items-center text-white gap-2">
                        <h1 className="text-xl">Berat Badan</h1>
                        {weights.length > 0 ? (
                            weights.map((weight, index) => (
                                <p key={index}>{weight.weight} Kg</p>
                            ))
                        ) : (
                            <p>Belum ada data berat badan.</p>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}