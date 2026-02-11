import React, { useState, useEffect } from 'react';

function CollabFeatures() {
    const [activeFeature, setActiveFeature] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const features = [
        {
            id: 'mobility',
            title: "Mobility & Devices",
            desc: "Your business number follows you. Switch from desk to mobile instantly.",
            color: "from-blue-500 to-cyan-500",
            dotColor: "bg-blue-500",
            icon: "smartphone",
            visual: (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                    {/* Floating Devices Animation */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <div className="w-64 h-64 border border-blue-500 rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
                        <div className="absolute w-48 h-48 border border-cyan-500 rounded-full animate-[spin_8s_linear_infinite_reverse] border-dashed"></div>
                    </div>

                    {/* Phone Mockup */}
                    <div className="relative z-10 w-32 h-64 bg-slate-900 rounded-[2rem] border-4 border-slate-700 shadow-2xl p-2 animate-[float-y-slow_4s_ease-in-out_infinite]">
                        <div className="w-full h-full bg-slate-800 rounded-[1.5rem] overflow-hidden relative">
                            {/* Screen Content */}
                            <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900 z-20 flex justify-center">
                                <div className="w-16 h-4 bg-slate-900 rounded-b-lg"></div>
                            </div>
                            <div className="pt-8 px-3">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-bold">JD</div>
                                    <div className="flex-1">
                                        <div className="h-2 w-16 bg-slate-600 rounded mb-1"></div>
                                        <div className="h-1.5 w-10 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                                <div className="bg-green-500/20 text-green-400 text-[10px] p-2 rounded mb-2 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    Active Call
                                </div>
                                <div className="flex justify-center gap-2 mt-8">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-white">X</div>
                                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-white">M</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Desktop Mockup (Behind) */}
                    <div className="absolute z-0 w-64 h-40 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 -right-4 top-10 transform rotate-6 animate-[float-y-delayed_5s_ease-in-out_infinite]"></div>
                </div>
            )
        },
        {
            id: 'analytics',
            title: "Live Analytics",
            desc: "Real-time insights into call volumes, wait times, and team performance.",
            color: "from-purple-500 to-pink-500",
            dotColor: "bg-purple-500",
            icon: "bar-chart",
            visual: (
                <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-4 overflow-hidden border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-xs font-bold text-slate-400">CALL VOLUME</div>
                            <div className="text-xs text-green-500 font-bold">+24% ↑</div>
                        </div>
                        <div className="flex items-end justify-between h-32 gap-2">
                            {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-full bg-purple-500 rounded-t-sm opacity-80"
                                    style={{
                                        height: `${h}%`,
                                        animation: `waveform 2s ease-in-out infinite ${i * 0.1}s`
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 'transcription',
            title: "Voicemail to Text",
            desc: "Read your voicemails just like emails. Delivered instantly to your inbox.",
            color: "from-orange-400 to-amber-500",
            dotColor: "bg-orange-500",
            icon: "mail",
            visual: (
                <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-4 border border-slate-100 relative overflow-hidden group">
                        {/* Email Header */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                <div className="icon-mic"></div>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-800">New Voicemail</div>
                                <div className="text-xs text-slate-400">From: +61 400 123 456</div>
                            </div>
                        </div>
                        {/* Audio Waveform */}
                        <div className="flex items-center gap-1 h-8 mb-4">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2">▶</div>
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className="w-1 bg-slate-300 rounded-full animate-pulse" style={{ height: Math.random() * 100 + '%', animationDelay: i * 0.05 + 's' }}></div>
                            ))}
                        </div>
                        {/* Transcription Text */}
                        <div className="space-y-2">
                            <div className="h-2 bg-slate-100 rounded w-full"></div>
                            <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                            <div className="h-2 bg-slate-100 rounded w-4/6"></div>
                        </div>

                        {/* Animated "Scanning" Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-100/20 to-transparent h-20 w-full -translate-y-full animate-[scan_3s_linear_infinite]"></div>
                    </div>
                </div>
            )
        },
        {
            id: 'integration',
            title: "CRM Integrations",
            desc: "Screen pops with customer details the moment they call. Works with your favorite tools.",
            color: "from-green-400 to-emerald-500",
            dotColor: "bg-green-500",
            icon: "link",
            visual: (
                <div className="relative w-full h-full flex items-center justify-center p-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[300px] h-[300px] border border-slate-200 rounded-full animate-[spin_20s_linear_infinite]">
                            {/* Orbiting Icons */}
                            <div className="absolute top-0 left-1/2 -ml-4 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-xs font-bold text-blue-600 shadow-sm transform -translate-y-1/2">SF</div>
                            <div className="absolute bottom-0 left-1/2 -ml-4 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-xs font-bold text-orange-600 shadow-sm transform translate-y-1/2">HS</div>
                            <div className="absolute left-0 top-1/2 -mt-4 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-xs font-bold text-green-600 shadow-sm transform -translate-x-1/2">ZD</div>
                            <div className="absolute right-0 top-1/2 -mt-4 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-600 shadow-sm transform translate-x-1/2">MS</div>
                        </div>
                    </div>
                    <div className="relative z-10 bg-white p-6 rounded-2xl shadow-xl border border-green-100 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 mb-3 flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                            <div className="w-full h-full bg-slate-200"></div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-slate-900">Incoming Call</div>
                            <div className="text-xs text-slate-500">Matching CRM Record...</div>
                            <div className="mt-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg shadow-green-500/30 animate-bounce">
                                Alice Smith (CEO)
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    // Auto-rotate tabs
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // CSS for custom animations
    const customStyles = `
        @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(500%); }
        }
    `;

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" data-name="collab-features-v2" data-file="components/CollabFeatures.js">
            <style>{customStyles}</style>

            <div className="container-custom relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        Power Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                        Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Modern Workspace</span>.
                    </h2>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        Tools that don't just work—they flow. Experience a phone system designed for the way you actually work.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left: Interactive Menu - Icon-Based Design */}
                    <div className="space-y-3">
                        {features.map((feature, idx) => (
                            <div
                                key={feature.id}
                                onMouseEnter={() => {
                                    setActiveFeature(idx);
                                    setIsAutoPlaying(false);
                                }}
                                className={`group relative rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden ${activeFeature === idx
                                    ? 'bg-white shadow-lg'
                                    : 'bg-transparent hover:bg-white/50'
                                    }`}
                            >
                                {/* Content */}
                                <div className="relative p-5 flex items-start gap-4">
                                    {/* Icon Circle */}
                                    <div className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${activeFeature === idx
                                        ? 'bg-slate-100 text-slate-600'
                                        : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
                                        }`}>
                                        <div className={`icon-${feature.icon} text-lg`}></div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Title with Colored Dot */}
                                        <div className="flex items-center gap-2 mb-1.5">
                                            {activeFeature === idx && (
                                                <div className={`w-2 h-2 rounded-full ${feature.dotColor} animate-pulse`}></div>
                                            )}
                                            <h3 className={`text-base font-bold transition-colors ${activeFeature === idx ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-800'
                                                }`}>
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <p className={`text-sm leading-relaxed transition-colors ${activeFeature === idx ? 'text-slate-600' : 'text-slate-500'
                                            }`}>
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Active Indicator Border */}
                                {activeFeature === idx && (
                                    <div className={`absolute inset-0 rounded-2xl border-2 border-blue-100 pointer-events-none`}></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: Dynamic Device Preview */}
                    <div className="relative h-[500px] w-full bg-white rounded-[2.5rem] border-8 border-slate-100 shadow-2xl overflow-hidden ring-1 ring-slate-900/5">

                        {/* Background Gradient Mesh */}
                        <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-700 opacity-10 ${features[activeFeature].color}`}></div>

                        {/* Content Container with Transition */}
                        <div className="absolute inset-0 transition-all duration-500 flex items-center justify-center">
                            {features[activeFeature].visual}
                        </div>

                        {/* Status Bar Mockup */}
                        <div className="absolute top-0 right-0 left-0 h-12 flex justify-between items-center px-6">
                            <div className="text-[10px] font-bold text-slate-300">TECHOM CLOUD</div>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/20"></div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

export default CollabFeatures;
