import axios from "axios";
import { createContext, useContext, useState, useEffect, useCallback } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAllProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await axios.get('https://dummyjson.com/products');
            setData(res?.data?.products || []); // 🛡 SAFE

        } catch (error) {
            console.log(error);
            setError("Unable to load products right now.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    const getUnique = (arr, key) => {
        if (!Array.isArray(arr) || arr.length === 0) return [];
        return [...new Set(arr.map(item => item?.[key]).filter(Boolean))];
    };

    const categoryOnlyData = getUnique(data, "category");
    const brandOnlyData = getUnique(data, "brand");

    return (
        <DataContext.Provider value={{
            data: data || [],          // 🛡 ALWAYS SAFE
            loading,
            error,
            categoryOnlyData: categoryOnlyData || [],
            brandOnlyData: brandOnlyData || [],
            fetchAllProducts
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);