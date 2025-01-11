interface FilterBarProps {
    search: string;
    location: string;
    options: string[];
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onLocationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterBar({ search, location, options, onSearchChange, onLocationChange }: FilterBarProps) {
    return (
        <div className="flex space-x-4 mb-4">
            <input
                type="text"
                value={search}
                onChange={onSearchChange}
                placeholder="Filter events"
                className="p-2 border border-gray-300 rounded"
            />
            <select value={location} onChange={onLocationChange} className="p-2 border border-gray-300 rounded">
                <option value="">All Locations</option>
                {options.map((option, i) => (
                    <option key={`${option}-${i}`} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}