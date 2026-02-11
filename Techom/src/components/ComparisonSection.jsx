import React, { useState } from 'react';

function ComparisonSection({ onOpenModal }) {
    const [isCloud, setIsCloud] = useState(true);

    return (
        <section id="comparison" className="py-32 bg-white overflow-hidden" data-name="comparison" data-file="components/ComparisonSection.js">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Legacy vs Cloud
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">See The Difference</h2>
                    <p className="text-xl text-slate-500 mb-10">Stop letting outdated technology hold your business back.</p>

                    {/* The Toggle Switch */}
                    <div className="inline-flex bg-slate-100 p-1.5 rounded-full cursor-pointer select-none relative shadow-inner">
                        <div
                            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors duration-300 ${!isCloud ? 'text-white' : 'text-slate-500'}`}
                            onClick={() => setIsCloud(false)}
                        >
                            Legacy System
                        </div>
                        <div
                            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors duration-300 ${isCloud ? 'text-white' : 'text-slate-500'}`}
                            onClick={() => setIsCloud(true)}
                        >
                            TechOM Cloud
                        </div>

                        {/* Moving Background */}
                        <div
                            className={`absolute top-1.5 bottom-1.5 w-[50%] rounded-full shadow-lg transition-all duration-500 ease-spring ${isCloud ? 'left-[49%] bg-blue-600' : 'left-1.5 bg-red-500'}`}
                        ></div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className={`relative rounded-3xl p-8 md:p-12 border-2 transition-all duration-500 ${isCloud ? 'bg-blue-50 border-blue-200 shadow-xl shadow-blue-500/10' : 'bg-red-50 border-red-200'}`}>

                        {/* Header of Card */}
                        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-sm transition-colors duration-300 ${isCloud ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'}`}>
                                    <div className={isCloud ? 'icon-cloud' : 'icon-phone-off'}></div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">{isCloud ? 'TechOM Cloud System' : 'Traditional PBX System'}</h3>
                                    <p className={`font-medium text-lg ${isCloud ? 'text-blue-600' : 'text-red-500'}`}>{isCloud ? 'The Modern Standard' : 'The Old Way'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Setup Time</div>
                                <div className={`text-4xl font-bold ${isCloud ? 'text-slate-900' : 'text-slate-400'}`}>
                                    {isCloud ? '15 Minutes' : '3-6 Weeks'}
                                </div>
                            </div>
                        </div>

                        {/* Comparison Items */}
                        <div className="space-y-4">
                            {[
                                { label: "Hardware Costs", cloud: "$0 (No Hardware)", legacy: "$2,000+ Upfront" },
                                { label: "Monthly Maintenance", cloud: "$0 (Managed by us)", legacy: "$150/hour Technician" },
                                { label: "Flexibility", cloud: "Work Anywhere", legacy: "Desk Bound" },
                                { label: "Contract", cloud: "Month-to-Month", legacy: "3 Year Lock-in" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row items-center bg-white/80 backdrop-blur rounded-xl p-5 shadow-sm border border-slate-100">
                                    <div className="w-full md:w-1/3 font-semibold text-slate-500 mb-2 md:mb-0 text-center md:text-left md:pl-2">{item.label}</div>
                                    <div className="w-full md:w-2/3 flex items-center justify-between md:justify-end gap-4 px-4">
                                        {/* Since we toggle the view, we show the relevant value prominently */}
                                        <span className={`text-xl font-bold transition-all duration-500 ${isCloud ? 'text-green-600' : 'text-slate-400 line-through decoration-red-400'}`}>
                                            {isCloud ? item.cloud : item.legacy}
                                        </span>
                                        <div className={`transition-all duration-500 ${isCloud ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0'}`}>
                                            <div className="icon-circle-check text-green-500 text-2xl"></div>
                                        </div>
                                        <div className={`transition-all duration-500 ${!isCloud ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0'}`}>
                                            <div className="icon-x-circle text-red-500 text-2xl"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Inside Card */}
                        {isCloud && (
                            <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <button onClick={onOpenModal} className="btn btn-primary px-10 py-4 text-lg shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform">
                                    Switch & Save Today
                                </button>
                                <p className="mt-4 text-sm text-slate-500">30-day money back guarantee. No risk.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ComparisonSection;
