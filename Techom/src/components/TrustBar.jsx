import React from 'react';

function TrustBar() {
    return (
        <section className="py-16 border-b border-slate-100 bg-white" data-name="trust-bar" data-file="components/TrustBar.js">
            <div className="container-custom">
                <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">
                    Featured In & Trusted By Industry Leaders
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-2xl font-black text-slate-800 tracking-tighter flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-slate-800"></div> Google News
                    </div>
                    <div className="text-2xl font-serif font-bold text-slate-800 italic">
                        Yahoo! Finance
                    </div>
                    <div className="text-xl font-bold text-slate-800 tracking-widest uppercase border-2 border-slate-800 px-2 py-0.5">
                        FOX
                    </div>
                    <div className="text-2xl font-bold text-slate-800 flex items-center gap-1">
                        <div className="icon-zap fill-current"></div> Bloomberg
                    </div>
                    <div className="text-xl font-semibold text-slate-800 flex items-center">
                        <span className="font-black text-2xl mr-1">NBC</span> News
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TrustBar;
