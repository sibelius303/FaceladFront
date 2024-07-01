import React from 'react';


interface ProgressBarProps {
    items: any;
}

interface Task {
    id: number;
    title: string;
    description: string;
    assigned_to: string;
    status: boolean;
    is_active: boolean;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    work_id: number;
  }

function calculateTrueStatusPercentage(items: Task[]): number {
    const total = items?.length;
    if (total === 0) {
        return 0; // Evita división por cero
    }

    const trueCount = items?.filter(item => item.status).length;
    const percentage = (trueCount / total) * 100;
    console.log(percentage)
    return percentage;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ items }) => {
    const percentage = calculateTrueStatusPercentage(items);

    return (
        <div className='flex gap-1 w-full'>
            <div className="w-full bg-gray-300 rounded-full h-6">
                <div
                    className="bg-blue-600 h-full rounded-full transition-width duration-300 ease-in-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p>{`${percentage}%`}</p>
        </div>
    );
};

export default ProgressBar;