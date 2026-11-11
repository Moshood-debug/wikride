import { statusStyles } from "@/constant";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";


const OrgHeader = ({ organization }) => {
    const router = useRouter();
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={() => router.back()}
                title="Go back"
                className="h-10 w-10 flex items-center justify-center rounded-xl border border-border-gray hover:border-brand-blue/30 hover:bg-accent transition-all cursor-pointer text-text-gray"
            >
                <ArrowLeft size={18} />
            </button>
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-primary-accent flex items-center gap-3">
                    {organization.name}
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusStyles[organization.status]}`}
                    >
                        {organization.status}
                    </span>
                </h1>
                <p className="text-sm text-zinc-400 mt-0.5 font-mono">{organization.id}</p>
            </div>
        </div>
    );
};

export default OrgHeader;