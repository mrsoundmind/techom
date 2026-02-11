import React, { useState, useEffect } from 'react';

function Header({ onOpenModal }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Collaboration', href: '#collab-features-v2' },
        { label: 'Why Cloud?', href: '#comparison' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Pricing', href: '#pricing' }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-transparent py-3' : 'bg-transparent py-4'}`} data-name="header" data-file="components/Header.js">

            {/* Top Promo Bar */}
            <div className={`hidden md:flex justify-center items-center transition-all duration-300 absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold py-2 px-4 ${isScrolled ? '-translate-y-full opacity-0' : 'translate-y-0'}`}>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                    <span>Limited Offer: Cloud Plans start from $1/day - Ends Soon!</span>
                </div>
            </div>

            <div className={`${isScrolled ? 'container-custom' : ''} flex items-center justify-between ${!isScrolled ? 'mt-6 container-custom' : ''} ${isScrolled ? 'bg-white rounded-full px-6 py-2' : ''}`}>
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img
                        src="https://app.trickle.so/storage/public/images/usr_1b4718ab00000001/43d87f26-c791-4ce4-9a18-c057ed160b87.png?w=200&h=72"
                        alt="TechOM Systems"
                        className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`}
                    />
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                const targetId = link.href.replace('#', '');
                                const element = document.querySelector(`[data-name="${targetId}"]`);
                                if (element) {
                                    const offset = 80; // Account for fixed header
                                    const elementPosition = element.getBoundingClientRect().top;
                                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                    <button
                        onClick={onOpenModal}
                        className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 px-6 text-sm font-bold rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Book a Free Demo
                    </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className={isMobileMenuOpen ? "icon-x text-2xl" : "icon-menu text-2xl"}></div>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-200 shadow-xl animate-in slide-in-from-top-2">
                    <div className="container-custom py-6 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-base font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-3 rounded-lg transition-all"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsMobileMenuOpen(false);
                                    const targetId = link.href.replace('#', '');
                                    const element = document.querySelector(`[data-name="${targetId}"]`);
                                    if (element) {
                                        const offset = 80;
                                        const elementPosition = element.getBoundingClientRect().top;
                                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                                        window.scrollTo({
                                            top: offsetPosition,
                                            behavior: 'smooth'
                                        });
                                    }
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                        <button
                            onClick={() => { onOpenModal(); setIsMobileMenuOpen(false); }}
                            className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all"
                        >
                            Book a Free Demo
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
