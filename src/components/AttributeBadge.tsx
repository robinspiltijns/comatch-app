import { IconType } from "react-icons";

export interface AttributeBadgeProps {
  label: string;
  icon: IconType;
  color?: "white" | "black";
}

export default function AttributeBadge({
  color = "black",
  label,
  icon,
}: AttributeBadgeProps) {
  return (
    <div
      className="p-2 border-2 rounded-lg border-dotted flex flex-col space-y-2 items-center"
      style={{ color }}
    >
      {icon({ size: 24 })}
      <div>{label}</div>
    </div>
  );
}
