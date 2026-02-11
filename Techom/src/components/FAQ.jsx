import React, { useState } from 'react';

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            q: "Can I keep my existing landline number?",
            a: "Absolutely! We handle the entire 'porting' process for you. It usually takes 5-10 business days, and there is zero downtime. You won't miss a single call."
        },
        {
            q: "What happens if my internet goes down?",
            a: "Unlike traditional lines, your calls are safe. If your office internet cuts out, our system automatically redirects calls to your mobile app instantly, so you're always reachable."
        },
        {
            q: "Do I need to buy expensive phones?",
            a: "No! You can use our free mobile app or desktop app. If you prefer a physical desk phone, we have affordable options starting from $99, or you might be able to use your existing IP phones."
        },
        {
            q: "Is there a lock-in contract?",
            a: "Never. We believe you should stay because you love the service, not because you have to. All our plans are month-to-month and you can cancel anytime."
        }
    ];

    const toggle = (i) => {
        setActiveIndex(activeIndex === i ? null : i);
    };

    return (
        <section className="py-20 bg-white" data-name="faq" data-file="components/FAQ.js">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        Questions Answered
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Frequently Asked Questions</h2>
                    <p className="text-lg text-slate-600">Got questions? We've got answers.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((item, i) => (
                        <div key={i} className="group bg-white rounded-2xl border-2 border-slate-100 overflow-hidden hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between p-6 text-left transition-colors"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Number Badge */}
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 ${activeIndex === i
                                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md'
                                        : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                                        }`}>
                                        {i + 1}
                                    </div>
                                    <span className="font-bold text-slate-900 text-lg flex-1">{item.q}</span>
                                </div>
                                <div className={`transition-all duration-300 ${activeIndex === i ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
                                    <div className="icon-chevron-down text-xl"></div>
                                </div>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 ml-14">
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
