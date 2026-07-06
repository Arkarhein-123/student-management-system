import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, ShieldCheck, Milestone, BookOpen, Users, Trophy, Laptop, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GuestLandingPage() {
    return (
        <div className="w-full min-h-screen bg-slate-50 font-sans selection:bg-blue-500/20 selection:text-blue-900">
            {/* 🎯 Section A: Hero Panel (Fixed High-Contrast Light Theme) */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50 text-slate-900 border-b border-slate-200/80">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-5 lg:py-6">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Left Copy Framework */}
                        <div className="lg:col-span-7 space-y-6 text-left">
                            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-xs text-blue-700 font-bold tracking-wide uppercase">
                                🚀 Learn Today. Lead Tomorrow.
                            </span>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-950">
                                Build Your{" "}
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-xs">
                                    Dream Career
                                </span>{" "}
                                with JDC Academy
                            </h1>

                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                                Learn Full Stack Development, Java Enterprise, Mobile Apps, UI/UX Design, and AI from
                                experienced mentors through practical, high-performance project architectures.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/register">
                                    <Button className="h-12 px-8 bg-blue-600 hover:bg-white hover:text-blue-600 text-white font-bold text-sm shadow-md shadow-blue-600/10  transition-all ease-in-out active:scale-98 cursor-pointer rounded-xl gap-2">
                                        Start Learning <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>

                                <Link to="/login">
                                    <Button
                                        variant="outline"
                                        className="h-12 px-8 border-slate-400 bg-white hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-sm  transition-all ease-in-out rounded-xl cursor-pointer shadow-xs"
                                    >
                                        Student Login
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Clean Panel Metrics Dashboard */}
                        <div className="lg:col-span-5">
                            <div className="rounded-3xl bg-slate-300 border border-slate-200 p-6 sm:p-8 shadow-xl relative group">
                                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                                    <div className="rounded-2xl bg-white border border-slate-200 p-5 transition duration-300 shadow-xs">
                                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center mb-3.5">
                                            <Users className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h3 className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                            12K+
                                        </h3>
                                        <p className="text-xs font-bold text-slate-500 tracking-wide uppercase mt-0.5">
                                            Students
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white border border-slate-200 p-5 transition duration-300 shadow-xs">
                                        <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center mb-3.5">
                                            <BookOpen className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <h3 className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                            50+
                                        </h3>
                                        <p className="text-xs font-bold text-slate-500 tracking-wide uppercase mt-0.5">
                                            Courses
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white border border-slate-200 p-5 transition duration-300 shadow-xs">
                                        <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center mb-3.5">
                                            <Laptop className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <h3 className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                            120+
                                        </h3>
                                        <p className="text-xs font-bold text-slate-500 tracking-wide uppercase mt-0.5">
                                            Projects
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-white border border-slate-200 p-5 transition duration-300 shadow-xs">
                                        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center mb-3.5">
                                            <Trophy className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <h3 className="font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
                                            94%
                                        </h3>
                                        <p className="text-xs font-bold text-slate-500 tracking-wide uppercase mt-0.5">
                                            Placement
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 💡 Section B: Premium Features Framework */}
            <section className="py-20 lg:py-28 bg-white border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20 space-y-3">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                            Core Value Ecosystem
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Why Learn With JDC Academy?
                        </h2>
                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                            Engineered for tech professionals who need verified skills, modern architectural execution,
                            and true career paths.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="rounded-2xl border border-slate-200/80  bg-slate-200 p-8 hover:shadow-xl hover:shadow-slate-100 hover:border-blue-200 transition duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                <GraduationCap className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 tracking-tight">Industry Mentors</h3>
                            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                                Learn directly from active staff engineers and system architects with proven
                                field-tested codebase records.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200/80  bg-slate-200 p-8 hover:shadow-xl hover:shadow-slate-100 hover:border-emerald-200 transition duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 tracking-tight">Global Certification</h3>
                            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                                Graduate with cryptographically secure, recognized credentials tailored to pass
                                automated recruiter screeners.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200/80  bg-slate-200 p-8 hover:shadow-xl hover:shadow-slate-100 hover:border-purple-200 transition duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                                <Milestone className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-xl text-slate-900 tracking-tight">Production Standards</h3>
                            <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                                Build real portfolio assets using modern toolings like Vite, Zustand stores, and
                                asynchronous API layers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 💬 Section C: Refined Peer Reviews */}
            <section className="bg-slate-50/70 py-20 lg:py-28 border-b border-slate-200/60">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-16">
                        Success Reports From Our Network
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Emily",
                                role: "Associate React Developer",
                                quote: "The curriculum matched exactly what local software agencies look for. I signed my offer letter within 90 days.",
                            },
                            {
                                name: "Justin Aung",
                                role: "Backend Engineer",
                                quote: "Building full-scale apps with microservices instead of standard dummy templates gave me a massive advantage in system design rounds.",
                            },
                            {
                                name: "Arkar Min",
                                role: "Mobile Software Engineer",
                                quote: "Clean code workflows, state synchronization stores, and modular packaging schemas. Absolutely essential runtime skills.",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-slate-200/60 bg-white p-6 sm:p-8 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed italic">"{item.quote}"</p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col">
                                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                                    <span className="text-xs text-slate-400 font-medium mt-0.5">{item.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 🚀 Section D: Clean Enterprise CTA Banner (Fixed Light Context Text Contrast from image_44e729.jpg) */}
            <section className="bg-white py-16 px-6 lg:px-12">
                <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden shadow-xl shadow-blue-600/20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.1),transparent_60%)] pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                            Ready to Start Your Journey?
                        </h2>
                        {/* High-visibility stark white text for the CTA description paragraph */}
                        <p className="text-sm sm:text-base text-blue-50 leading-relaxed max-w-md mx-auto font-medium">
                            Join thousands of candidates running our verified software framework modules inside JDC
                            Academy.
                        </p>
                        <div className="pt-2">
                            <Link to="/register">
                                <Button className="bg-white hover:bg-slate-50 text-blue-600 font-bold px-8 h-12 text-sm transition active:scale-98 cursor-pointer rounded-xl shadow-lg shadow-blue-950/20 gap-2">
                                    Enroll Today <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
