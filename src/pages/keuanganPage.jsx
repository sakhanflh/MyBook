import { FaEdit, FaInfo, FaTrash } from "react-icons/fa";
import { Header } from "../components/Header";
import { FaCircleMinus, FaCirclePlus, FaCircleXmark, FaRegCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";


export default function KeuanganPage() {
    const [showElement, setShowElement] = useState(false)

    const handleShowElement = () => {
        setShowElement(!showElement)
    }



    // Transaksi
    const [modalOpen, setModalOpen] = useState(false);
    const [isIncome, setIsIncome] = useState(true);
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);


    const handleAddTransaction = () => {
        const newTransaction = {
            date,
            amount: parseFloat(amount) * (isIncome ? 1 : -1),
            description
        };
        setTransactions([
            ...transactions,
            newTransaction
        ]);
        setDate('');
        setAmount('');
        setDescription('');
        setModalOpen(false);
    };


    const handleConfirmDeleteTransaction = (index) => {
        setDeleteIndex(index);
        setConfirmDelete(true);
    };

    const handleDeleteTransaction = () => {
        const updatedTransactions = transactions.filter((_, i) => i !== deleteIndex);
        setTransactions(updatedTransactions);
        setConfirmDelete(false);
        setDeleteIndex(null);
    };


    const calculateTotalIncome = () => {
        return transactions
            .filter(transaction => transaction.amount > 0)
            .reduce((total, transaction) => total + transaction.amount, 0);
    };

    const calculateTotalExpense = () => {
        return transactions
            .filter(transaction => transaction.amount < 0)
            .reduce((total, transaction) => total + transaction.amount, 0);
    };

    const calculateTotal = () => {
        return transactions.reduce((total, transaction) => total + transaction.amount, 0);
    };

    const formatCurrency = (number) => {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    };

    // Transaksi End

    return (
        <>
            <div className="text-uang-text overflow-x-hidden w-full">
                <Header />

                <div className="w-full h-dvh pt-16 px-5 bg-uang-bg gap-5 flex flex-col">
                    <div className="w-full h-28 p-5 border flex items-center justify-center bg-uang-section text-uang-text rounded-xl text-xl flex-col gap-3">
                        <h1>Total Finances</h1>
                        <div className="flex gap-2">
                            <p>{formatCurrency(calculateTotal())},-</p>
                        </div>
                    </div>

                    <div className="flex w-full justify-center gap-5">
                        <div className="py-5 px-4 bg-uang-pemasukan rounded-lg border gap-5 items-center justify-center  text-center">
                            <p>Total Income</p>
                            <div className="flex w-full text-center items-center justify-center">
                                <p>{formatCurrency(calculateTotalIncome())},-</p>
                            </div>
                        </div>

                        <div className="py-5 px-4 bg-uang-pengeluaran rounded-lg border gap-5 items-center justify-center  text-center">
                            <p>Total Expens</p>
                            <div className="flex w-full text-center items-center justify-center">
                                <p>{formatCurrency(Math.abs(calculateTotalExpense()))},-</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full justify-center flex flex-col items-center gap-2">
                        <h1 className="text-xl">History</h1>

                        <div className="w-full justify-center flex ">
                            <table className="table-auto border-collapse border border-gray-400 text-sm justify-center ">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border border-gray-400">Date</th>
                                        <th className="px-4 py-2 border border-gray-400">Amount</th>
                                        <th className="px-4 py-2 border border-gray-400">Information</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 border border-gray-400">{transaction.date}</td>
                                            <td className="px-4 py-2 border border-gray-400">Rp {transaction.amount.toFixed(2)}</td>
                                            <td className="px-4 py-2 border border-gray-400">{transaction.description}</td>
                                            <td className="px-1 py-2 border border-gray-400">
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => handleConfirmDeleteTransaction(index)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="fixed text-5xl translate-x-[19rem] translate-y-[35rem]">
                        <button onClick={handleShowElement}>
                            {
                                showElement ?
                                    <FaCircleXmark />
                                    :
                                    <FaCirclePlus />
                            }
                        </button>
                        <div className={`${showElement ? 'translate-y-0' : 'translate-y-14'} transition-all duration-200 `}>
                            {showElement && (
                                <div className="-translate-y-44 -translate-x-[64px] flex flex-col gap-3">
                                    <div className="flex items-center gap-5 justify-between">
                                        <p className="text-sm">Expens</p>
                                        <button onClick={() => { setModalOpen(true); setIsIncome(false); }}>
                                            <FaCircleMinus />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-5 justify-between">
                                        <p className="text-sm">Income</p>
                                        <button onClick={() => { setModalOpen(true); setIsIncome(true); }}>
                                            <FaCirclePlus />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {modalOpen && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                            <div className="bg-black p-6 rounded shadow-lg">
                                <h2 className="text-xl mb-4">{isIncome ? 'Tambah Pemasukan' : 'Tambah Pengeluaran'}</h2>
                                <div className="mb-4">
                                    <label className="block mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="border p-2 w-full text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Amount</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="border p-2 w-full text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Information</label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="border p-2 w-full text-black"
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                        onClick={handleAddTransaction}
                                    >
                                        Tambah
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {confirmDelete && (
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                            <div className="bg-white p-6 rounded shadow-lg text-black">
                                <h2 className="text-xl mb-4">Confirm to delete</h2>
                                <p>Are you sure you want to delete this transaction?</p>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => setConfirmDelete(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={handleDeleteTransaction}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}