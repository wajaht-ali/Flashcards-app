/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [find, setFind] = useState({
        keyword: "",
        values: []
    })

    return <SearchContext.Provider value={[find, setFind]}>
        {children}
    </SearchContext.Provider>
}

//custom hook
const useSearch = () => useContext(SearchContext);

// eslint-disable-next-line react-refresh/only-export-components
export { useSearch, SearchProvider };
