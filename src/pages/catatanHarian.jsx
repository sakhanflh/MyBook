import { useEffect, useState } from "react";
import { DiaryLayout } from "../components/DiaryLayout";
import { Header } from "../components/Header";

export default function CatatanHarian() {
    const [diaries, setDiaries] = useState([]);
    const [currentDiary, setCurrentDiary] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [viewingDiary, setViewingDiary] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);

    useEffect(() => {
        const savedDiaries = localStorage.getItem('diaries');
        if (savedDiaries) {
            setDiaries(JSON.parse(savedDiaries));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('diaries', JSON.stringify(diaries));
    }, [diaries]);

    const handleAddDiary = () => {
        setExpanded(true);
    };

    const handleSaveDiary = (index) => {
        const newDiaries = [...diaries];
        newDiaries[index] = { title: currentTitle, content: currentDiary };
        setDiaries(newDiaries);
        setCurrentDiary('');
        setCurrentTitle('');
        setExpanded(false);
        setIsAddingNew(false);
    };

    const handleNewDiary = () => {
        setDiaries([...diaries, { title: '', content: '' }]);
        setIsAddingNew(true);
        setExpanded(true);
        setCurrentDiary('');
        setCurrentTitle('');
    };

    const handleViewDiary = (index) => {
        setViewingDiary(index);
    };

    const handleDeleteDiary = (index) => {
        const newDiaries = diaries.filter((_, i) => i !== index);
        setDiaries(newDiaries);
        if (viewingDiary === index) {
            setViewingDiary(null);
        }
    };

    const handleTitleChange = (e) => {
        setCurrentTitle(e.target.value);
    };

    return (
        <>
            <div className="w-full overflow-x-hidden">
                <Header />
                <div className="flex flex-wrap justify-center items-start gap-4 p-4">
                    {diaries.map((diary, index) => (
                        <DiaryLayout
                            key={index}
                            onAddClick={handleAddDiary}
                            onViewClick={() => handleViewDiary(index)}
                            onDeleteClick={() => handleDeleteDiary(index)}
                            expanded={expanded && isAddingNew && index === diaries.length - 1}
                            diaryContent={diary.content}
                            diaryTitle={expanded && isAddingNew && index === diaries.length - 1 ? currentTitle : diary.title}
                            onTitleChange={handleTitleChange}
                            titlePlaceholder="Enter Diary Title"
                            isNew={isAddingNew && index === diaries.length - 1}
                        >
                            {expanded && isAddingNew && index === diaries.length - 1 && (
                                <div className="absolute top-0 left-0 w-full h-full bg-gray-200 bg-opacity-50 flex justify-center items-center">
                                    <div className="w-80 bg-white p-4 rounded-lg">
                                        <textarea
                                            className="w-full h-32 border border-gray-300 rounded p-2 mb-2"
                                            placeholder="Write your diary here..."
                                            value={currentDiary}
                                            onChange={(e) => setCurrentDiary(e.target.value)}
                                        />
                                        <div className="flex justify-end">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                                onClick={() => handleSaveDiary(index)}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </DiaryLayout>
                    ))}
                    {viewingDiary !== null && (
                        <div className="absolute top-0 left-0 w-full h-full bg-gray-200 bg-opacity-50 flex justify-center items-center">
                            <div className="w-80 bg-white p-4 rounded-lg">
                                <h2 className="text-xl font-bold mb-2">{diaries[viewingDiary].title}</h2>
                                <p>{diaries[viewingDiary].content}</p>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => setViewingDiary(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        onClick={handleNewDiary}
                    >
                        Add New Diary
                    </button>
                </div>
            </div>
        </>
    )
}