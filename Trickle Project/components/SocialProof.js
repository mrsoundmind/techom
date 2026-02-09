function SocialProof() {
    const stats = [
        { label: "Impact Evaluations", value: 10000, suffix: "+", icon: "file-check" },
        { label: "Systematic Reviews", value: 850, suffix: "+", icon: "search" },
        { label: "Countries Covered", value: 135, suffix: "+", icon: "globe" },
        { label: "Active Users", value: 50, suffix: "k/mo", icon: "users" },
    ];

    const partners = [
        "The World Bank",
        "United Nations",
        "Bill & Melinda Gates Foundation",
        "USAID",
        "WHO",
        "DFID",
        "3ie Impact",
        "J-PAL"
    ];

    // Duplicate partners for seamless marquee
    const marqueePartners = [...partners, ...partners];

    // Animated Counter Logic
    const Counter = ({ end, suffix }) => {
        const [count, setCount] = React.useState(0);
        const ref = React.useRef(null);
        const hasAnimated = React.useRef(false);

        React.useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        let start = 0;
                        const duration = 2000;
                        const startTime = performance.now();

                        const animate = (currentTime) => {
                            const elapsedTime = currentTime - startTime;
                            const progress = Math.min(elapsedTime / duration, 1);

                            // Easing function (easeOutExpo)
                            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                            setCount(Math.floor(start + (end - start) * ease));

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            }
                        };
                        requestAnimationFrame(animate);
                    }
                },
                { threshold: 0.5 }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }, [end]);

        return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
    };

    return (
        <section className="py-20 bg-white border-b border-gray-100 relative z-0 overflow-hidden">
            <div className="container-custom">

                {/* 1. Trusted By Section (Marquee) */}
                <div className="text-center mb-24">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Trusted by leading organizations</p>

                    <div className="relative w-full overflow-hidden mask-gradient-x">
                        {/* Gradient Masks */}
                        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
                        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

                        <div className="flex w-max animate-marquee hover:pause">
                            {marqueePartners.map((partner, index) => (
                                <div key={index} className="mx-8 md:mx-16 text-xl md:text-2xl font-bold text-gray-300 hover:text-[var(--primary-blue)] transition-colors cursor-default font-serif whitespace-nowrap">
                                    {partner}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Metrics Section (Animated) */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 relative overflow-hidden group/card hover:shadow-xl transition-all duration-500">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="mb-4 relative">
                                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 group-hover:shadow-lg group-hover:border-blue-100 group-hover:-rotate-3">
                                        <div className={`icon-${stat.icon} text-2xl text-[var(--primary-blue)] transition-all duration-500 group-hover:scale-110`}></div>
                                    </div>
                                    {/* Decorative dot */}
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 font-serif tracking-tight group-hover:text-[var(--primary-blue)] transition-colors duration-300">
                                    <Counter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-600 transition-colors">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}