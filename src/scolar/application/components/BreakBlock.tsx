type BreakBlockProps = {
    startTime: number;   // en minutos
    endTime: number;     // en minutos
    baseStart: number;   // hora inicio de la jornada (minutos)
    heightPerHour: number;
};

export const BreakBlock = ({ startTime, endTime, baseStart, heightPerHour }: BreakBlockProps) => {
    const style = {
        top: ((startTime - baseStart) / 60) * heightPerHour-10,
        height: ((endTime - startTime) / 60) * heightPerHour,
    };

    return (
        <div
            className="absolute left-0 right-0 bg-yellow-100 text-[10px] font-semibold text-yellow-700 flex items-center justify-center border-y"
            style={style}
        >
            RECESO
        </div>
    );
};
