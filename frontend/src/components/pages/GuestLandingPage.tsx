import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, ShieldCheck, Milestone, BookOpen, Users, Trophy, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GuestLandingPage() {
    return (
        <div className="w-full">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,.18),transparent_45%)]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-flex rounded-full bg-blue-500/15 border border-blue-400/20 px-4 py-2 text-sm text-blue-300 font-semibold">
                                🚀 Learn Today. Lead Tomorrow.
                            </span>

                            <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                                Build Your
                                <span className="block text-blue-400">Dream Career</span>
                                with JDC Academy
                            </h1>

                            <p className="mt-6 text-slate-300 text-lg leading-8 max-w-xl">
                                Learn Full Stack Development, Java Enterprise, Mobile Apps, UI/UX Design, and AI from
                                experienced mentors through practical, project-based learning.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-10">
                                <Link to="/register">
                                    <Button className="h-12 px-7 bg-blue-600 hover:bg-blue-700">
                                        Start Learning
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>

                                <Link to="/login">
                                    <Button
                                        variant="outline"
                                        className="h-12 px-7 border-white/20 bg-white/5 hover:bg-white/10 text-white"
                                    >
                                        Student Login
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Hero Card */}
                        <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 px-8 shadow-2xl">
                            <div className="grid grid-cols-2 gap-5 py-6">
                                <div className="rounded-2xl bg-white p-5 text-slate-900">
                                    <Users className="text-blue-600 mb-4" />
                                    <h3 className="font-bold text-3xl">12K+</h3>
                                    <p className="text-sm text-slate-500">Students</p>
                                </div>

                                <div className="rounded-2xl bg-white p-5 text-slate-900">
                                    <BookOpen className="text-green-600 mb-4" />
                                    <h3 className="font-bold text-3xl">50+</h3>
                                    <p className="text-sm text-slate-500">Courses</p>
                                </div>

                                <div className="rounded-2xl bg-white p-5 text-slate-900">
                                    <Laptop className="text-purple-600 mb-4" />
                                    <h3 className="font-bold text-3xl">120+</h3>
                                    <p className="text-sm text-slate-500">Projects</p>
                                </div>

                                <div className="rounded-2xl bg-white p-5 text-slate-900">
                                    <Trophy className="text-orange-500 mb-4" />
                                    <h3 className="font-bold text-3xl">94%</h3>
                                    <p className="text-sm text-slate-500">Employment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-4xl font-bold">Why Learn With JDC Academy?</h2>

                        <p className="mt-4 text-slate-500">
                            Designed for students who want practical skills, industry experience, and career
                            opportunities.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="rounded-3xl border bg-white p-8 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                                <GraduationCap className="text-blue-600" />
                            </div>

                            <h3 className="font-bold text-xl">Industry Mentors</h3>

                            <p className="mt-4 text-slate-500">
                                Learn directly from experienced software engineers with real-world development
                                experience.
                            </p>
                        </div>

                        <div className="rounded-3xl border bg-white p-8 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                                <ShieldCheck className="text-green-600" />
                            </div>

                            <h3 className="font-bold text-xl">International Certificate</h3>

                            <p className="mt-4 text-slate-500">
                                Receive recognized certificates after successfully completing your learning journey.
                            </p>
                        </div>

                        <div className="rounded-3xl border bg-white p-8 hover:shadow-xl transition-all">
                            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                                <Milestone className="text-purple-600" />
                            </div>

                            <h3 className="font-bold text-xl">Real Projects</h3>

                            <p className="mt-4 text-slate-500">
                                Graduate with portfolio-ready applications built using modern technologies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}

            <section className="bg-slate-100 py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-center text-4xl font-bold mb-14">What Our Students Say</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Emily",
                                quote: "The mentors were amazing. I landed my first developer job within 3 months.",
                            },
                            {
                                name: "Michael",
                                quote: "The projects helped me build a strong portfolio for interviews.",
                            },
                            {
                                name: "Sophia",
                                quote: "Modern curriculum with React, Spring Boot and cloud deployment.",
                            },
                        ].map((item) => (
                            <div key={item.name} className="rounded-3xl bg-white p-8 shadow-sm">
                                <p className="text-slate-600 italic">"{item.quote}"</p>

                                <div className="mt-6 font-bold">{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}

            <section className="bg-blue-600 text-white py-20">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold">Ready to Start Your Journey?</h2>

                    <p className="mt-5 text-blue-100">
                        Join thousands of students building successful careers through JDC Academy.
                    </p>

                    <Link to="/register">
                        <Button className="mt-8 bg-white text-blue-700 hover:bg-slate-100 h-12 px-8">
                            Enroll Today
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
