import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white">
            <div className="border-4 border-gray-300 border-t-gray-700 rounded-full w-12 h-12 animate-spin"></div>
        </div>
    );
};

export default Loading;