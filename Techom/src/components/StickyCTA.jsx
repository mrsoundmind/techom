import React, { useState, useEffect } from 'react';

function StickyCTA({ onOpenModal }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past the first 300px
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 animate-in slide-in-from-bottom-full duration-300">
            <button
                onClick={onOpenModal}
                className="btn btn-primary w-full shadow-lg"
            >
                Book Free Demo
            </button>
        </div>
    );
}

export default StickyCTA;
