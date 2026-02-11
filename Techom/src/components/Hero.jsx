import React from 'react';

function Hero({ onOpenModal }) {
    // CSS for custom animations
    const heroStyles = `
        @keyframes float-y-slow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        @keyframes float-y-delayed {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        @keyframes waveform {
            0%, 100% { height: 10%; }
            50% { height: 100%; }
        }
        @keyframes ping-slow {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(2); opacity: 0; }
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;

    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-slate-50 overflow-hidden" data-name="hero" data-file="components/Hero.js">
            <style>{heroStyles}</style>

            {/* Elegant Background - Soft Aurora */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl text-center lg:text-left relative z-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            Next-Gen Cloud Voice
                        </div>

                        {/* REFINED HEADLINE: Compact & Clear */}
                        <div className="mb-6">
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight mb-1">
                                Your office phone system.
                            </h1>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 leading-tight">
                                Now an App.
                            </h1>
                        </div>

                        <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Your business number, everywhere you are. No hardware. No technicians. No limits.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12">
                            <button onClick={onOpenModal} className="btn btn-primary h-12 px-7 text-base rounded-xl shadow-lg shadow-blue-500/20 hover:-translate-y-1 transition-transform">
                                Book a Free Demo
                            </button>
                            <button onClick={onOpenModal} className="btn btn-outline h-12 px-7 text-base rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white">
                                See How It Works
                            </button>
                        </div>

                        {/* REFINED TRUST BAR: Simplified Pricing USP */}
                        <div className="border-t border-slate-200 pt-6 mt-auto">
                            <p className="text-sm font-semibold text-slate-600 mb-3">
                                Plans start from <span className="text-blue-600">$1/day</span>. <span className="text-slate-500 font-normal">No lock-in contracts.</span>
                            </p>

                            {/* Trust Signals */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <div className="icon-shield text-green-600"></div>
                                    <span>30-day money back</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="icon-users text-blue-600"></div>
                                    <span>Trusted by 500+ businesses</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="icon-check-circle text-indigo-600"></div>
                                    <span>Setup in 5 minutes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Visuals - High-End "Glass Stack" Cloud Concept */}
                    <div className="flex-1 w-full relative h-[600px] flex items-center justify-center perspective-[2000px]">

                        {/* 1. Base Layer: The Infrastructure (Abstract) */}
                        <div className="absolute w-[90%] h-[90%] bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-[3rem] rotate-[-6deg] opacity-60 scale-90 border border-white/50 animate-[float-y-delayed_8s_ease-in-out_infinite]"></div>

                        {/* 2. Middle Layer: The "Cloud Core" Glass Card */}
                        <div className="absolute w-[80%] h-[400px] bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center relative overflow-hidden animate-[float-y-slow_6s_ease-in-out_infinite] z-20">

                            {/* Inner Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-blue-400/10 to-transparent"></div>

                            {/* Digital Waveform Visualization (The "Voice" aspect) */}
                            <div className="flex items-center gap-1 h-16 mb-8">
                                {[...Array(12)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1.5 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-full"
                                        style={{
                                            height: '20%',
                                            animation: `waveform 1.2s ease-in-out infinite`,
                                            animationDelay: `${i * 0.1}s`
                                        }}
                                    ></div>
                                ))}
                            </div>

                            {/* Connection Hub Icon */}
                            <div className="relative">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 z-10 relative">
                                    <div className="icon-cloud text-white text-4xl"></div>
                                </div>
                                {/* Ripples */}
                                <div className="absolute inset-0 bg-blue-600 rounded-2xl animate-[ping-slow_3s_infinite]"></div>
                                <div className="absolute inset-0 bg-indigo-600 rounded-2xl animate-[ping-slow_3s_infinite_1s]"></div>
                            </div>

                            <div className="mt-6 text-center">
                                <div className="text-sm font-bold text-slate-800 tracking-wide">TechOM Cloud Core</div>
                                <div className="text-xs text-slate-500 font-medium mt-1 flex items-center justify-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                    Signal Active • 99.99% Uptime
                                </div>
                            </div>
                        </div>

                        {/* 3. Top Layer: Floating Device "Portals" */}

                        {/* Device 1: Mobile App (Top Right) */}
                        <div className="absolute top-[10%] right-[5%] z-30 animate-[float-y-slow_7s_ease-in-out_infinite_1s]">
                            <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-xl w-48">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        <div className="icon-phone text-xs"></div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Status</div>
                                        <div className="text-xs font-bold text-slate-800">Connected</div>
                                    </div>
                                </div>
                                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Device 2: Incoming Call Card (Bottom Left) */}
                        <div className="absolute bottom-[15%] left-[0%] z-30 animate-[float-y-delayed_5s_ease-in-out_infinite_0.5s]">
                            <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl w-56 border border-slate-700">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                                        <span className="font-bold text-sm">JD</span>
                                    </div>
                                    <div className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                        Incoming
                                    </div>
                                </div>
                                <div className="text-lg font-bold">John Doe</div>
                                <div className="text-sm text-slate-400 mb-4">+61 400 123 456</div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="bg-red-500/20 hover:bg-red-500/30 text-red-500 py-2 rounded-lg flex items-center justify-center transition-colors">
                                        <div className="icon-phone-off"></div>
                                    </button>
                                    <button className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20 transition-colors">
                                        <div className="icon-phone"></div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Decorative: Data Stream Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30" viewBox="0 0 400 400" preserveAspectRatio="none">
                            <path d="M 50 350 Q 200 200 350 50" fill="none" stroke="url(#grad1)" strokeWidth="2" strokeDasharray="5,5" className="animate-[pulse_3s_infinite]" />
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
                                    <stop offset="50%" stopColor="#2563eb" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
