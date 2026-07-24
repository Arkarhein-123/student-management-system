import { useState, useEffect } from "react";
import { X, Lock, Mail, User as UserIcon } from "lucide-react";
import type { UserResponse } from "@/types/user";

interface EditUserModalProps {
    isOpen: boolean;
    user: UserResponse | null;
    onClose: () => void;
    onSave: (userId: number, payload: { name: string; email: string; password?: string }) => Promise<void>;
}

export function EditUserModal({ isOpen, user, onClose, onSave }: EditUserModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword(""); // Password stays empty unless updated
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload: { name: string; email: string; password?: string } = { name, email };
            if (password.trim().length > 0) {
                payload.password = password;
            }
            await onSave(user.id, payload);
            onClose();
        } catch (err) {
            console.error("Failed to update user:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-slate-100">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <h2 className="text-lg font-semibold text-slate-800">Edit User #{user.id}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-lg p-1">
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                        <div className="relative">
                            <UserIcon size={16} className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                            New Password{" "}
                            <span className="text-slate-400 font-normal">(Leave blank to keep current)</span>
                        </label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
