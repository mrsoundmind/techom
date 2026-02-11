import React, { useState, useEffect } from 'react';

function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const reviews = [
        {
            name: "Michael Chen",
            role: "Director",
            company: "Apex Realty",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            quote: "We cut our phone bill by 60% instantly. The app lets my agents take calls from open houses seamlessly. Best business decision of the year.",
            stars: 5,
            metric: "60% Cost Savings",
            hasVideo: true
        },
        {
            name: "Sarah Jenkins",
            role: "Owner",
            company: "Jenkins Cafe Group",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            quote: "I was terrified of switching, thinking I'd lose my number. TechOM handled everything. I didn't have to lift a finger.",
            stars: 5,
            metric: "15 Min Setup",
            hasVideo: false
        },
        {
            name: "David Ross",
            role: "Founder",
            company: "Ross Logistics",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            quote: "Finally, a phone company with Aussie support. When I call, I speak to someone in Sydney, not a robot.",
            stars: 5,
            metric: "24/7 AU Support",
            hasVideo: true
        },
        {
            name: "Emily Watson",
            role: "CEO",
            company: "Watson Design Co",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
            quote: "The mobile app changed everything. I can take client calls while traveling without anyone knowing I'm not at my desk.",
            stars: 5,
            metric: "100% Remote",
            hasVideo: false
        }
    ];

    // Auto-advance carousel
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % reviews.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, reviews.length]);

    const handleDotClick = (index) => {
        setActiveIndex(index);
        setIsAutoPlaying(false);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        setIsAutoPlaying(false);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
        setIsAutoPlaying(false);
    };

    return (
        <section className="py-20 bg-white overflow-hidden" data-name="testimonials" data-file="components/Testimonials.js">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                        Social Proof
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900">Loved by Aussie Businesses</h2>
                    <p className="text-base text-slate-600">Join 500+ happy customers growing with TechOM.</p>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-5xl mx-auto">

                    {/* Main Card Display */}
                    <div className="relative h-[320px] mb-12">
                        {reviews.map((review, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-all duration-700 ${idx === activeIndex
                                    ? 'opacity-100 scale-100 z-20'
                                    : idx === (activeIndex + 1) % reviews.length
                                        ? 'opacity-40 scale-95 translate-x-16 z-10 pointer-events-none'
                                        : 'opacity-0 scale-90 pointer-events-none'
                                    }`}
                            >
                                <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-slate-200 shadow-xl h-full flex flex-col relative overflow-hidden group">

                                    {/* Decorative Quote BG */}
                                    <div className="absolute top-6 right-6 text-slate-100 opacity-40 group-hover:opacity-70 transition-opacity">
                                        <div className="icon-quote text-7xl"></div>
                                    </div>

                                    {/* Top Row: Avatar + Info + Metric */}
                                    <div className="flex items-start justify-between mb-6 relative z-10">
                                        <div className="flex items-center gap-4">
                                            {/* Avatar with Video Indicator */}
                                            <div className="relative">
                                                <img
                                                    src={review.image}
                                                    alt={review.name}
                                                    className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                                                />
                                                {review.hasVideo && (
                                                    <div className="absolute inset-0 rounded-full bg-blue-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                                                        <div className="icon-play text-white text-lg"></div>
                                                    </div>
                                                )}
                                                {/* Verified Badge */}
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                                                    <div className="icon-circle-check text-white text-xs"></div>
                                                </div>
                                            </div>

                                            {/* Name + Role */}
                                            <div>
                                                <div className="font-bold text-slate-900 text-lg mb-1">{review.name}</div>
                                                <div className="text-xs text-slate-500 font-medium">{review.role}, {review.company}</div>
                                            </div>
                                        </div>

                                        {/* Metric Badge */}
                                        <div className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl text-center min-w-[120px] shadow-sm">
                                            <div className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-0.5">Impact</div>
                                            <div className="text-lg font-black text-blue-600">{review.metric}</div>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <div className="flex-1 flex items-center">
                                        <p className="text-slate-700 leading-relaxed italic text-lg font-medium relative z-10">
                                            "{review.quote}"
                                        </p>
                                    </div>

                                    {/* Company Logo Placeholder */}
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Trusted Partner</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        {/* Prev Button */}
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all hover:scale-110 shadow-md"
                        >
                            <div className="icon-chevron-left text-slate-600"></div>
                        </button>

                        {/* Dot Indicators */}
                        <div className="flex gap-3">
                            {reviews.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleDotClick(idx)}
                                    className={`transition-all duration-300 rounded-full ${idx === activeIndex
                                        ? 'w-12 h-3 bg-blue-600'
                                        : 'w-3 h-3 bg-slate-300 hover:bg-slate-400'
                                        }`}
                                ></button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all hover:scale-110 shadow-md"
                        >
                            <div className="icon-chevron-right text-slate-600"></div>
                        </button>
                    </div>

                    {/* Auto-play Indicator */}
                    <div className="text-center mt-8">
                        <button
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className="text-xs text-slate-400 hover:text-slate-600 uppercase tracking-wider font-bold flex items-center gap-2 mx-auto"
                        >
                            {isAutoPlaying ? (
                                <>
                                    <div className="icon-pause text-sm"></div>
                                    Auto-playing
                                </>
                            ) : (
                                <>
                                    <div className="icon-play text-sm"></div>
                                    Paused
                                </>
                            )}
                        </button>
                    </div>
                </div>


            </div>
        </section>
    );
}

export default Testimonials;
