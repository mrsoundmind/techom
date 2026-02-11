import React, { useState, useEffect } from 'react';

function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    // Auto-cycle through steps for the visualization
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        {
            id: 1,
            title: "Virtualize",
            desc: "We take your phone number and put it in the cloud. No cables, no drilling.",
            icon: "icon-cloud-upload",
            color: "text-blue-600",
            bg: "bg-blue-100",
            lineColor: "bg-blue-600"
        },
        {
            id: 2,
            title: "Download",
            desc: "Install the TechOM app on your laptop, mobile, or tablet. It's just software.",
            icon: "icon-download",
            color: "text-indigo-600",
            bg: "bg-indigo-100",
            lineColor: "bg-indigo-600"
        },
        {
            id: 3,
            title: "Communicate",
            desc: "Make and receive calls instantly using your internet connection.",
            icon: "icon-globe",
            color: "text-emerald-600",
            bg: "bg-emerald-100",
            lineColor: "bg-emerald-600"
        }
    ];

    const styles = `
        @keyframes flow-h {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes flow-v {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(100%); opacity: 0; }
        }
        .flow-line-h {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, currentColor, transparent);
            opacity: 0.3;
            animation: flow-h 2s infinite linear;
        }
        .flow-line-v {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, transparent, currentColor, transparent);
            opacity: 0.3;
            animation: flow-v 2s infinite linear;
        }
    `;

    return (
        <section className="py-32 bg-white overflow-hidden relative" data-name="how-it-works" data-file="components/HowItWorks.js">
            <style>{styles}</style>

            <div className="container-custom relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse"></span>
                        Demystifying The Tech
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">It's Just Data, Not Hardware.</h2>
                    <p className="text-xl text-slate-500 leading-relaxed">
                        Traditional phones run on copper wires underground.
                        <span className="text-blue-600 font-bold mx-1">TechOM Cloud</span> runs on the internet you already have.
                        Think of it like upgrading from DVDs to streaming.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left: The Steps */}
                    <div className="space-y-8 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-100 hidden md:block"></div>

                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`relative flex gap-6 p-6 rounded-2xl transition-all duration-500 cursor-pointer group ${activeStep === index ? 'bg-slate-50 scale-105 shadow-sm border border-slate-100' : 'hover:bg-slate-50 border border-transparent'}`}
                                onClick={() => setActiveStep(index)}
                            >
                                <div className={`relative z-10 w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center text-2xl transition-colors duration-300 ${activeStep === index ? `${step.bg} ${step.color}` : 'bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-md'}`}>
                                    <div className={step.icon}></div>
                                    {activeStep === index && (
                                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${step.lineColor}`}></span>
                                            <span className={`relative inline-flex rounded-full h-3 w-3 ${step.lineColor}`}></span>
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <h3 className={`text-xl font-bold mb-2 transition-colors ${activeStep === index ? 'text-slate-900' : 'text-slate-500'}`}>
                                        {step.id}. {step.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: The Interactive Visualization */}
                    <div className="relative h-[450px] bg-slate-900 rounded-3xl p-8 shadow-2xl overflow-hidden flex flex-col items-center justify-center border-4 border-slate-800">

                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-20"
                            style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                        </div>

                        {/* Central Cloud Node */}
                        <div className="relative z-10 mb-12">
                            <div className="relative w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.5)] z-20">
                                <div className="icon-cloud text-white text-4xl"></div>
                            </div>
                            <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                            <div className="absolute inset-[-20px] rounded-full border border-blue-500/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
                        </div>

                        {/* Connection Lines Container */}
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Horizontal Line to center */}
                            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-700"></div>
                            {/* Vertical Line to center */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-700"></div>

                            {/* Animated Data Packets */}
                            <div className="absolute top-1/2 left-0 right-0 h-[1px] text-blue-400 overflow-hidden">
                                <div className="flow-line-h"></div>
                            </div>
                            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] text-blue-400 overflow-hidden">
                                <div className="flow-line-v"></div>
                            </div>
                        </div>

                        {/* Devices Layer */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            {/* Device 1: Laptop (Top Left) */}
                            <div className={`absolute top-12 left-12 transition-all duration-700 ${activeStep === 1 ? 'scale-110 opacity-100' : 'opacity-40 scale-90'}`}>
                                <div className="w-16 h-12 bg-slate-800 border-b-4 border-slate-700 rounded-lg flex items-center justify-center relative shadow-lg">
                                    <div className={`w-1 h-1 rounded-full absolute top-1 right-2 ${activeStep === 1 ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-red-900'}`}></div>
                                    <div className="icon-laptop text-slate-400 text-xl"></div>
                                </div>
                            </div>

                            {/* Device 2: Mobile (Top Right) */}
                            <div className={`absolute top-12 right-12 transition-all duration-700 ${activeStep === 1 ? 'scale-110 opacity-100' : 'opacity-40 scale-90'}`}>
                                <div className="w-10 h-16 bg-slate-800 border-2 border-slate-700 rounded-xl flex items-center justify-center relative shadow-lg">
                                    <div className="icon-smartphone text-slate-400 text-xl"></div>
                                    {activeStep === 1 && (
                                        <div className="absolute inset-0 bg-blue-500/10 rounded-xl animate-pulse"></div>
                                    )}
                                </div>
                            </div>

                            {/* Device 3: World/Network (Bottom) */}
                            <div className={`absolute bottom-12 transition-all duration-700 ${activeStep === 2 ? 'scale-110 opacity-100' : 'opacity-40 scale-90'}`}>
                                <div className="bg-slate-800/80 backdrop-blur rounded-full px-6 py-2 border border-slate-700 flex items-center gap-3 shadow-lg">
                                    <div className="icon-signal text-green-400 animate-pulse"></div>
                                    <span className="text-slate-300 text-xs font-mono">Status: Connected</span>
                                </div>
                            </div>
                        </div>

                        {/* Context Overlay */}
                        <div className="absolute bottom-4 right-4 text-right">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Network Load</div>
                            <div className="text-xl font-mono text-blue-400">0.02ms</div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
