import React from 'react';

function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 py-16 lg:py-20 relative overflow-hidden" data-name="footer" data-file="components/Footer.js">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="container-custom relative z-10">

                {/* Top Section: Newsletter & Branding */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 border-b border-slate-800 pb-12">
                    <div>
                        <div className="mb-6">
                            <img
                                src="https://app.trickle.so/storage/public/images/usr_1b4718ab00000001/43d87f26-c791-4ce4-9a18-c057ed160b87.png?w=200&h=72"
                                alt="TechOM Systems"
                                className="h-12 w-auto brightness-0 invert opacity-90"
                            />
                        </div>
                        <p className="text-lg text-slate-400 max-w-md leading-relaxed">
                            Australia's leading cloud communication platform. We replace complex hardware with simple, powerful software.
                        </p>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                        <h4 className="text-white font-bold mb-2">Stay ahead of the curve</h4>
                        <p className="text-sm mb-4">Get the latest VoIP tips and business tech news.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                            <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Middle Section: Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Cloud PBX</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">SIP Trunking</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Mobile App</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Hardware</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Solutions</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Small Business</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Enterprise</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Real Estate</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Healthcare</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Remote Teams</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Partners</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Contact & Support</h4>
                        <ul className="space-y-4 text-sm mb-6">
                            <li className="flex items-start gap-3">
                                <div className="icon-map-pin mt-1 text-blue-500"></div>
                                <span>Level 5, 100 Market St,<br />Sydney NSW 2000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="icon-phone text-blue-500"></div>
                                <span className="text-white font-semibold">1300 TECH OM</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="icon-mail text-blue-500"></div>
                                <span>support@techomsystems.com.au</span>
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><div className="icon-facebook"></div></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all"><div className="icon-twitter"></div></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all"><div className="icon-linkedin"></div></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Badges & Copyright */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <div className="text-sm">
                            &copy; 2026 TechOM Systems. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-xs font-medium">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* App Store Badges (Simulated) */}
                        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 transition-colors">
                            <div className="icon-apple text-white text-xl"></div>
                            <div className="text-left leading-none">
                                <div className="text-[10px] uppercase">Download on the</div>
                                <div className="text-xs font-bold text-white">App Store</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 transition-colors">
                            <div className="icon-play text-white text-xl"></div>
                            <div className="text-left leading-none">
                                <div className="text-[10px] uppercase">Get it on</div>
                                <div className="text-xs font-bold text-white">Google Play</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
