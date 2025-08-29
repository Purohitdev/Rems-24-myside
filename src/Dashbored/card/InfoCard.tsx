interface CardProps {
  title: string;
  value: number | string;
  unit?: string;
  change?: number;
  min?: number;
  max?: number;
  avg?: number;
}

export default function InfoCard({
  title,
  value,
  unit,
  change = 0,
  min = 0,
  max = 0,
  avg = 0,
}: CardProps) {
  return (
    <div className="flex-1 bg-white shadow rounded-2xl p-6 min-w-[200px] h-fit">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-base font-normal text-[#333333]">{title}</h2>
        <span
          className={`${
            change > 0 ? "text-[#237C24]" : "text-[#FF5F57]"
          } text-sm font-semibold`}
        >
          {change > 0 ? `+${change}` : change}
        </span>
      </div>

      <hr className="border-t border-gray-300 mb-1" />

      <p className="text-[22px] font-semibold text-[#237C24]">
        {value} {unit}
      </p>

      <div className="flex justify-between mt-6 text-xs text-gray-500">
        <span className="flex-1 px-2 text-left">
          <p className="font-medium text-base text-[#333333]">{min}</p>
          <p className="text-sm text-[#777777] font-normal">Minimum</p>
        </span>

        <div className="w-px h-8 bg-gray-300 mx-2"></div>

        <span className="flex-1 px-2 text-left">
          <p className="font-medium text-base text-[#333333]">{max}</p>
          <p className="text-sm text-[#777777] font-normal">Maximum</p>
        </span>

        <div className="w-px h-8 bg-gray-300 mx-2"></div>

        <span className="flex-1 px-2 text-left">
          <p className="font-medium text-base text-[#333333]">{avg}</p>
          <p className="text-sm text-[#777777] font-normal">Average</p>
        </span>
      </div>
    </div>
  );
}
