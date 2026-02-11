import React from 'react';

function PricingTeaser({ onOpenModal }) {
    return (
        <section id="pricing" className="py-32 bg-white overflow-hidden" data-name="pricing-teaser" data-file="components/PricingTeaser.js">
            <div className="container-custom">
                <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left shadow-2xl">

                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-20 -mt-20 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -ml-20 -mb-20 animate-pulse delay-1000"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                                Limited Offer
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                                Start for as little as <span className="text-blue-400">$1 a day</span>
                            </h2>
                            <p className="text-slate-300 text-xl mb-10 leading-relaxed">
                                Flexible plans that grow with you. No lock-in contracts, no hidden fees.
                                Try it risk-free and see the difference in your bottom line.
                            </p>
                            <ul className="space-y-4 mb-8 text-slate-300 text-lg">
                                <li className="flex items-center gap-4">
                                    <div className="icon-circle-check text-blue-400 text-xl"></div>
                                    <span>Unlimited local calls included</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="icon-circle-check text-blue-400 text-xl"></div>
                                    <span>Free mobile app</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="icon-circle-check text-blue-400 text-xl"></div>
                                    <span>24/7 Australian support</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-3xl p-10 shadow-xl w-full max-w-sm text-center transform hover:scale-105 transition-transform duration-300">
                            <div className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-4">Special Offer</div>
                            <div className="text-6xl font-extrabold text-slate-900 mb-2">$1<span className="text-2xl text-slate-500 font-medium">/day</span></div>
                            <div className="text-slate-600 text-sm mb-8 font-medium">Per user, billed monthly</div>

                            <button onClick={onOpenModal} className="btn btn-accent w-full py-4 text-lg mb-4 shadow-red-500/25">
                                Claim Offer Now
                            </button>
                            <p className="text-xs text-slate-400">Limited time offer for new customers.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PricingTeaser;
