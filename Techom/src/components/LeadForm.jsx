import React, { useState } from 'react';

function LeadForm({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessSize: '',
        currentSystem: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send data to backend
        alert("Thanks! We'll be in touch shortly to schedule your demo.");
        onClose();
        setStep(1);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200" data-name="lead-form" data-file="components/LeadForm.js">
            <div
                className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Get Your Free Demo</h3>
                        <p className="text-sm text-slate-500">See how much you can save.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <div className="icon-x text-slate-500"></div>
                    </button>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">How many employees do you have?</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['1-5', '6-20', '21-50', '50+'].map(opt => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, businessSize: opt })}
                                                className={`py-3 border rounded-lg text-sm font-medium transition-all ${formData.businessSize === opt ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    disabled={!formData.businessSize}
                                    className="btn btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next Step
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="name@company.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="0400 000 000"
                                    />
                                </div>
                                <button type="submit" className="btn btn-accent w-full mt-4">
                                    Book My Demo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full text-center text-sm text-slate-500 mt-2 hover:text-slate-800"
                                >
                                    Back
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                <div className="bg-slate-50 p-4 text-center text-xs text-slate-400 border-t border-slate-100">
                    <div className="icon-lock inline-block w-3 h-3 mr-1 align-middle"></div>
                    Your information is secure. No spam, ever.
                </div>
            </div>
        </div>
    );
}

export default LeadForm;
