import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserProfileSettings() {
    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans antialiased">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* ◄ Quick Return Navigation Control */}
                <div className="flex items-center justify-between">
                    <Link
                        to="/student"
                        className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                    >
                        <ArrowLeft className="w-4 h-4" /> Return to Dashboard
                    </Link>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Account Settings Terminal
                    </span>
                </div>

                {/* Main Profile Showcase Card Stub */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
                    <h1 className="text-xl font-bold text-slate-900">Manage Your Profile</h1>
                    <p className="text-sm text-slate-500">
                        {" "}
                        Update your personal details and account configurations here.
                    </p>
                    <div className="h-32 border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50/50 text-xs text-slate-400">
                        [ Profile Information Form Setup Area ]
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 h-9 gap-1.5 cursor-pointer shadow-sm">
                            <Save className="w-3.5 h-3.5" /> Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
