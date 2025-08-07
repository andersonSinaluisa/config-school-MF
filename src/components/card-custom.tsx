import React from "react";

interface CardCustomProps {
    title: string;
    paragraph: string;
    icon: React.ReactNode;
    ribbonLabel: string;
}
export const CardCustom = (props: CardCustomProps) => {
    return (
        <div className="relative w-10/12 max-w-xs mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
            {/* Top Ribbon */}
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-2xl text-xs font-semibold tracking-wide z-10">
                {props.ribbonLabel}
            </div>

            {/* Icon */}
            <div className="bg-[#f4f5f2] flex items-center justify-center h-32">
                <div className="text-5xl text-primary">{props.icon}</div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-3">
                <h3 className="text-lg font-extrabold text-[#121513]">{props.title}</h3>
                <p className="text-sm text-gray-600">{props.paragraph}</p>
            </div>

            {/* Footer Badge */}
            <div className="flex items-center justify-center bg-primary text-white text-sm font-bold py-3 rounded-b-3xl">
                <span className="bg-white text-primary px-4 py-1 rounded-full text-base font-black shadow-md">
                    {props.ribbonLabel}
                </span>
            </div>
        </div>
      

    )
}

