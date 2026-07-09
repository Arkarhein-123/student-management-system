import { Link } from "react-router-dom";
import { Cpu, ArrowUpRight } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-200/90 w-full mt-auto">
            {/* ─── MAIN LINK DIRECTORY MAP ─── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8 pb-12 border-b border-slate-100">
                    {/* Brand Meta Column */}
                    <div className="col-span-2 space-y-5">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
                                <span className="text-xs tracking-tighter">JDC</span>
                            </div>
                            <span className="text-base font-black tracking-tight text-slate-900 uppercase">
                                JDC Academy
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                            High-performance software training architectures. Engineered to bridge the gap between
                            academic code and enterprise runtime execution standards.
                        </p>
                        {/* Interactive Status Indicator Grid Box */}
                        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-xs font-semibold text-emerald-700">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            All Systems Operational
                        </div>
                    </div>

                    {/* Column 2: Platform Links */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Ecosystem</h4>
                        <ul className="space-y-2.5 text-sm font-medium text-slate-500">
                            <li>
                                <Link
                                    to="/student/courses"
                                    className="hover:text-blue-600 transition duration-150 flex items-center gap-0.5 group"
                                >
                                    Explore Catalog{" "}
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    Track Paths
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    Enterprise Plans
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    Cloud Sandboxes
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Resources</h4>
                        <ul className="space-y-2.5 text-sm font-medium text-slate-500">
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    Open Source Assets
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    System Logs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Compliance / Security */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Security</h4>
                        <ul className="space-y-2.5 text-sm font-medium text-slate-500">
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    Privacy Shield
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    Crypto Verification
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-600 transition duration-150">
                                    Trust Center
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 5: Engineering Stack Info */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Runtime Matrix</h4>
                        <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2 text-slate-500 text-xs font-medium">
                            <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                                <Cpu className="w-3.5 h-3.5 text-blue-600" /> Cluster Meta:
                            </div>
                            <p>Engine: Vite v8.1</p>
                            <p>State: Zustand v5</p>
                            <p>UI: Tailwind v4</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── BASE BAR: SOCIALS & LEGAL COPYRIGHT ─── */}
            <div className="bg-slate-50/80 border-t border-slate-100 w-full py-6">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Legal Meta */}
                    <div className="text-xs font-medium text-slate-500 text-center sm:text-left">
                        &copy; {currentYear} JDC Academy Inc. Cryptographically signed learning pipelines. All rights
                        reserved.
                    </div>

                    {/* Social Interaction Array Links with Custom Inline SVGs */}
                    <div className="flex items-center gap-4 text-slate-400">
                        {/* GitHub */}
                        <a
                            href="#"
                            className="hover:text-slate-900 transition-colors duration-150 p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200/80 shadow-xs"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                        </a>

                        {/* X / Twitter */}
                        <a
                            href="#"
                            className="hover:text-slate-900 transition-colors duration-150 p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200/80 shadow-xs"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="#"
                            className="hover:text-blue-700 transition-colors duration-150 p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200/80 shadow-xs"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" />
                                <circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>

                        {/* Globe */}
                        <a
                            href="#"
                            className="hover:text-slate-900 transition-colors duration-150 p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200/80 shadow-xs"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                <path d="M2 12h20" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
