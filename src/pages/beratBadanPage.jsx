import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Header } from '../components/Header';

export default function BeratBadanPage() {
    const [weight, setWeight] = useState('');
    const [weights, setWeights] = useState([]);
    const [latestWeight, setLatestWeight] = useState();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);

    useEffect(() => {
        const storedWeights = JSON.parse(localStorage.getItem('weights')) || [];
        setWeights(storedWeights);
        if (storedWeights.length > 0) {
            setLatestWeight(storedWeights[0]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('weights', JSON.stringify(weights));
        if (weights.length > 0) {
            setLatestWeight(weights[0]);
        } else {
            setLatestWeight(null);
        }
    }, [weights]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toLocaleDateString();
        const newEntry = { date: currentDate, weight };

        setWeights([newEntry, ...weights]);
        setWeight('');
    };

    const handleConfirmDeleteTransaction = (index) => {
        setDeleteIndex(index);
        setConfirmDelete(true);
    };

    const handleDeleteWeights = () => {
        const updatedWeights = weights.filter((_, i) => i !== deleteIndex);
        setWeights(updatedWeights);
        setConfirmDelete(false);
        setDeleteIndex(null);
    };

    return (
        <div className='w-full overflow-x-hidden'>
            <Header/>
            <div className=" bg-black w-full h-dvh flex flex-col items-center p-5 text-bb-text">
                <h1 className="text-2xl font-bold mb-6">Weight Record</h1>

                {latestWeight && (
                    <div className="py-3 flex flex-col gap-1 px-10 rounded-xl mb-5 bg-bb-section text-center text-white">
                        <h2 className="text-lg font-semibold">Weight</h2>
                        <p>
                            {latestWeight.weight} Kg
                        </p>
                    </div>
                )}

                <form className="mb-6" onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter body weight"
                        className="p-2 border border-gray-300 rounded-md text-black"
                        required
                    />
                    <button
                        type="submit"
                        className="ml-4 py-2 px-5 bg-bb-section text-white rounded-md"
                    >
                        Add
                    </button>
                </form>

                <table className="min-w-full bg-white border-2 border-bb-text text-black">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border ">Date</th>
                            <th className="py-2 px-4 border ">Weight (Kg)</th>
                            <th className="py-2 px-4 border ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weights.map((entry, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border text-center">{entry.date}</td>
                                <td className="py-2 px-4 border text-center">{entry.weight}</td>
                                <td className="px-4 py-2 border text-center">
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

                {confirmDelete && (
                    <div className="fixed inset-0 bg-bb-text bg-opacity-75 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg text-black">
                            <h2 className="text-xl mb-4">Konfirmasi Penghapusan</h2>
                            <p>Apakah Anda yakin ingin menghapus entri ini?</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={() => setConfirmDelete(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={handleDeleteWeights}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
