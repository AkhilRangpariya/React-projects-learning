import React, { useState, useCallback, useRef } from "react";

const SmoothSlider = () => {
    const [value, setValue] = useState(50);
    const timeoutRef = useRef(null);

    // Optimized handler with debouncing
    const handleChange = useCallback((e) => {
        const newValue = e.target.value;

        // Clear previous timeout (debounce effect)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new value immediately for UI responsiveness
        setValue(newValue);

        // Debounce: Delay further processing (e.g., API calls) to optimize performance
        timeoutRef.current = setTimeout(() => {
            console.log("Updated value:", newValue); // Simulate API or heavy logic
        }, 3000); // Adjust debounce time as needed
    }, []);

    return (
        <div className="slider-container text-white">
            <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={value}
                onChange={handleChange} // Optimized event handler
                className="slider"
            />
            <span className="slider-value text-white">{value}</span>
        </div>
    );
};

export default SmoothSlider;
