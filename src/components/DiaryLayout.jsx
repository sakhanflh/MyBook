import { useState } from "react";

export function DiaryLayout({ children, onAddClick, onViewClick, expanded, onDeleteClick, diaryContent, diaryTitle, onTitleChange, titlePlaceholder, isNew }) {
    const [isEditingTitle, setIsEditingTitle] = useState(isNew);

    const handleTitleClick = () => {
        if (!isEditingTitle) {
            setIsEditingTitle(true);
        }
    };

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
    };
    return (
        <>
            <div className={`flex flex-col justify-center items-center h-full border border-gray-300 rounded-lg p-4 relative transition-all ${expanded ? 'w-80 h-96' : 'w-40 h-44'}`}>
                {isEditingTitle ? (
                    <input
                        type="text"
                        className="text-xl font-bold mb-2 w-full text-center border-b-2"
                        value={diaryTitle}
                        onChange={onTitleChange}
                        onBlur={handleTitleBlur}
                        placeholder={titlePlaceholder}
                        autoFocus
                    />
                ) : (
                    <h1
                        className="text-xl font-bold mb-2 cursor-pointer"
                        onClick={handleTitleClick}
                    >
                        {diaryTitle || titlePlaceholder}
                    </h1>
                )}
                {diaryContent ? (
                    <>
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded mb-2"
                            onClick={onViewClick}
                        >
                            View Diary
                        </button>
                        <button
                            className="bg-red-500 text-white px-2 py-1 rounded mb-2"
                            onClick={onDeleteClick}
                        >
                            Delete
                        </button>
                    </>
                ) : (
                    <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mb-2"
                        onClick={onAddClick}
                    >
                        Add
                    </button>
                )}
                {children}
            </div>
        </>
    )
}