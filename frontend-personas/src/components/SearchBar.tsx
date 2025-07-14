import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (texto: string) => void;
    onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
    const [searchText, setSearchText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchText.trim()) {
            onSearch(searchText.trim());
        } else {
            onClear();
        }
    };

    const handleClear = () => {
        setSearchText('');
        onClear();
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Buscar por nombre o apellido..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                        flex: 1,
                        padding: '0.5rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Buscar
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Limpiar
                </button>
            </form>
        </div>
    );
};

export default SearchBar;