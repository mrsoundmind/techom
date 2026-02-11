import React, { useState, useEffect, useRef } from 'react';

function Features() {
    const [activeFeature, setActiveFeature] = useState(0);
    const containerRef = useRef(null);

    // Feature Data
    const features = [
        {
            id: 0,
            title: "Your Office. Anywhere.",
            subtitle: "Seamless Mobility",
            description: "Turn your personal device into a powerful business command center. Calls, texts, and voicemail—all strictly professional, all on your terms.",
            color: "text-blue-600",
            bg: "bg-blue-600",
            gradient: "from-blue-600 to-blue-400"
        },
        {
            id: 1,
            title: "Insights in Real-Time.",
            subtitle: "Live Analytics",
            description: "Watch your business pulse. Visualize call flows, wait times, and team performance on a dashboard that updates the millisecond data happens.",
            color: "text-indigo-600",
            bg: "bg-indigo-600",
            gradient: "from-indigo-600 to-purple-500"
        },
        {
            id: 2,
            title: "Zero Hardware. Pure Cloud.",
            subtitle: "Infrastructure",
            description: "We demolished the server room so you don't have to. No boxes, no wires, no expensive maintenance. Just pure, scalable, invisible power.",
            color: "text-emerald-600",
            bg: "bg-emerald-600",
            gradient: "from-emerald-500 to-teal-400"
        },
        {
            id: 3,
            title: "Support That Speaks Aussie.",
            subtitle: "Local Care",
            description: "Real humans, right here in Sydney. When you need help, you get an expert, not a script. We're an extension of your team.",
            color: "text-orange-500",
            bg: "bg-orange-500",
            gradient: "from-orange-500 to-amber-400"
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const triggerLine = window.innerHeight * 0.5;
            const sections = containerRef.current.querySelectorAll('.feature-text-section');

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
                    setActiveFeature(index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Init
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Custom CSS for animations
    const styleSheet = `
        @keyframes pulse-ring {
            0% { transform: scale(0.8); opacity: 0.6; }
            100% { transform: scale(3); opacity: 0; }
        }
        @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes grow-bar {
            from { height: 10%; }
            to { height: var(--target-height); }
        }
        @keyframes dash {
            to { stroke-dashoffset: 0; }
        }
        @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4); }
        }
        @keyframes particle-float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .animate-pulse-ring {
            animation: pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .animate-float {
            animation: float-slow 4s ease-in-out infinite;
        }
        .animate-glow {
            animation: glow-pulse 2s ease-in-out infinite;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.5);
        }
    `;

    return (
        <section ref={containerRef} className="bg-slate-50 relative" data-name="features" data-file="components/Features.js">
            <style>{styleSheet}</style>

            {/* Main Sticky Wrapper */}
            <div className="flex flex-col lg:flex-row">

                {/* STICKY VISUAL SIDE (The "Stage") */}
                <div className="lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 flex items-center justify-center overflow-hidden bg-slate-50 z-10">

                    {/* Background Ambience */}
                    <div className={`absolute inset-0 transition-colors duration-1000 opacity-10 bg-gradient-to-br ${features[activeFeature].gradient}`}></div>
                    <div className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-20 bg-blue-300/30 -top-40 -right-40 animate-pulse"></div>

                    {/* The Interactive Device/Scene Container */}
                    <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center">

                        {/* --- SCENE 1: MOBILITY --- */}
                        <div className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeFeature === 0 ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12 pointer-events-none'}`}>
                            {/* Central Phone */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="w-48 h-80 bg-slate-900 rounded-[3rem] border-4 border-slate-800 shadow-2xl relative overflow-hidden animate-float">
                                    {/* Screen Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20"></div>

                                    {/* Dynamic "Call" UI */}
                                    <div className="absolute top-12 left-0 right-0 flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full bg-slate-100/20 backdrop-blur-md flex items-center justify-center mb-4">
                                            <div className="icon-user text-white text-2xl"></div>
                                        </div>
                                        <div className="text-white font-bold text-lg">Incoming Call...</div>
                                        <div className="text-blue-200 text-sm">Business Line</div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="absolute bottom-12 left-0 right-0 px-6 flex justify-between">
                                        <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/50">
                                            <div className="icon-phone-off text-white"></div>
                                        </div>
                                        <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/50 animate-bounce">
                                            <div className="icon-phone text-white"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Radiating Waves - Enhanced */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-blue-400/40 rounded-full animate-pulse-ring"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-blue-500/30 rounded-full animate-pulse-ring" style={{ animationDelay: '0.7s' }}></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-blue-600/20 rounded-full animate-pulse-ring" style={{ animationDelay: '1.4s' }}></div>

                            {/* Floating Particles */}
                            <div className="absolute top-full left-1/4 w-2 h-2 bg-blue-400 rounded-full" style={{ animation: 'particle-float 4s ease-in-out infinite' }}></div>
                            <div className="absolute top-full left-3/4 w-2 h-2 bg-indigo-400 rounded-full" style={{ animation: 'particle-float 5s ease-in-out infinite 1s' }}></div>
                            <div className="absolute top-full left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full" style={{ animation: 'particle-float 4.5s ease-in-out infinite 2s' }}></div>

                            {/* Connection Lines (Simulated with icons) */}
                            <div className="absolute top-10 right-0 bg-white p-3 rounded-xl shadow-lg flex items-center gap-2 animate-[float_3s_ease-in-out_infinite_0.5s]">
                                <div className="icon-wifi text-blue-500"></div>
                                <span className="text-xs font-bold text-slate-600">5G Stable</span>
                            </div>
                        </div>


                        {/* --- SCENE 2: ANALYTICS --- */}
                        <div className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeFeature === 1 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-12 pointer-events-none'}`}>
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ backgroundSize: '200% 100%', animation: 'shimmer 3s linear infinite' }}></div>

                            {/* Floating Glass Dashboard */}
                            <div className="w-full h-full glass-panel rounded-3xl p-6 shadow-2xl border-t border-white/60 relative overflow-hidden flex flex-col animate-glow">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Metrics</div>
                                </div>

                                {/* Animated Charts - Enhanced */}
                                <div className="flex items-end justify-between h-40 gap-3 mb-6">
                                    {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                        <div key={i} className="w-full bg-indigo-100 rounded-t-lg relative overflow-hidden group">
                                            <div
                                                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-400 rounded-t-lg transition-all duration-1000 ease-out shadow-lg ${activeFeature === 1 ? 'h-[var(--h)]' : 'h-0'}`}
                                                style={{ '--h': `${h}%`, animationDelay: `${i * 0.1}s` }}
                                            ></div>
                                            {/* Glow effect on bars */}
                                            <div className={`absolute bottom-0 left-0 right-0 bg-indigo-400/50 rounded-t-lg blur-sm ${activeFeature === 1 ? 'h-[var(--h)]' : 'h-0'} transition-all duration-1000`} style={{ '--h': `${h}%` }}></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Data Cards */}
                                <div className="grid grid-cols-2 gap-4 mt-auto">
                                    <div className="bg-white/50 rounded-xl p-4">
                                        <div className="text-xs text-slate-500 mb-1">Total Calls</div>
                                        <div className="text-2xl font-black text-slate-800">1,284</div>
                                    </div>
                                    <div className="bg-white/50 rounded-xl p-4">
                                        <div className="text-xs text-slate-500 mb-1">Avg Wait</div>
                                        <div className="text-2xl font-black text-green-600">0:12s</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* --- SCENE 3: CLOUD INFRASTRUCTURE --- */}
                        <div className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeFeature === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
                            {/* Central Cloud Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative">
                                    {/* Multiple glow layers */}
                                    <div className="w-40 h-40 rounded-full bg-emerald-100 blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                                    <div className="w-60 h-60 rounded-full bg-emerald-200/30 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                    <div className="icon-cloud text-[180px] text-emerald-500 drop-shadow-2xl relative z-10 animate-[float-slow_6s_ease-in-out_infinite]" style={{ filter: 'drop-shadow(0 10px 30px rgba(16, 185, 129, 0.4))' }}></div>

                                    {/* Uploading Particles - Enhanced */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                        <div className="icon-server text-3xl text-slate-300 absolute -bottom-16 left-0 animate-[float-slow_4s_infinite_reverse] opacity-50 drop-shadow-lg"></div>
                                        <div className="icon-hard-drive text-3xl text-slate-300 absolute -bottom-12 right-0 animate-[float-slow_5s_infinite] opacity-50 drop-shadow-lg"></div>

                                        {/* Connection Beams - Animated */}
                                        <div className="absolute top-full left-1/2 w-0.5 h-24 bg-gradient-to-t from-transparent via-emerald-400 to-emerald-500 animate-pulse"></div>
                                        <div className="absolute top-full left-1/2 w-1 h-24 bg-gradient-to-t from-transparent to-emerald-300/50 blur-sm animate-pulse"></div>

                                        {/* Rising particles */}
                                        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-emerald-400 rounded-full" style={{ animation: 'particle-float 3s ease-in-out infinite' }}></div>
                                        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-emerald-300 rounded-full" style={{ animation: 'particle-float 3.5s ease-in-out infinite 0.5s' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Labels */}
                            <div className="absolute top-0 right-0 bg-white px-4 py-2 rounded-lg shadow-xl border border-emerald-100 animate-bounce">
                                <span className="text-emerald-700 font-bold text-sm">99.99% Uptime</span>
                            </div>
                        </div>


                        {/* --- SCENE 4: SUPPORT --- */}
                        <div className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${activeFeature === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 pointer-events-none'}`}>
                            {/* Chat Interface */}
                            <div className="w-full h-full relative">
                                {/* Support Agent Bubble */}
                                <div className="absolute top-1/4 left-0 flex items-start gap-4 max-w-[80%]">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-200 p-1">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="w-full h-full rounded-full object-cover" alt="Support" />
                                    </div>
                                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-xl border border-slate-100">
                                        <p className="text-slate-600 text-sm">G'day! Sarah from Sydney here. How can I help setup your extensions?</p>
                                    </div>
                                </div>

                                {/* User Response Bubble (Delayed) */}
                                <div className="absolute top-1/2 right-0 flex flex-row-reverse items-start gap-4 max-w-[80%]">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                                        <div className="icon-user text-slate-500"></div>
                                    </div>
                                    <div className="bg-orange-500 text-white p-4 rounded-2xl rounded-tr-none shadow-xl">
                                        <p className="text-sm">That was fast! Can we add 3 users?</p>
                                    </div>
                                </div>

                                {/* Typing Indicator */}
                                <div className="absolute bottom-1/4 left-16 bg-slate-100 px-4 py-2 rounded-full flex gap-1">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* SCROLLING TEXT SIDE */}
                <div className="lg:w-1/2 relative z-20">
                    <div className="lg:py-[20vh] px-6 md:px-20 max-w-2xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className="feature-text-section min-h-[80vh] flex flex-col justify-center"
                            >
                                <div className={`transition-all duration-700 transform ${activeFeature === index ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-8'}`}>

                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 bg-white border border-slate-200 shadow-sm ${feature.color}`}>
                                        <span className={`w-2 h-2 rounded-full ${feature.bg}`}></span>
                                        {feature.subtitle}
                                    </div>

                                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                                        {feature.title}
                                    </h2>

                                    <p className="text-xl text-slate-500 leading-relaxed font-medium">
                                        {feature.description}
                                    </p>

                                    {/* CTA Link specific to feature */}
                                    <div className="mt-8">
                                        <a href="#" className={`inline-flex items-center gap-2 font-bold hover:gap-4 transition-all duration-300 ${feature.color}`}>
                                            Learn more <div className="icon-arrow-right"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Features;
