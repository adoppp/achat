import { useState } from "react";

export const useSearchbar = () => {
    const [search, setSearch] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const closeSearchBar = () => {
        setSearch('');
        setIsOpen(false);
    };
    
    return { search, setSearch, isOpen, setIsOpen, closeSearchBar };
};