import { useEffect, useState } from "react";

const useKeyDown = onChange => {
    const [key, setKey] = useState("");

    useEffect(() => {
        const handleKeyDown = ({ key }) => {
            setKey(key);
            onChange(key);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onChange]);

    return key;
};

export default useKeyDown