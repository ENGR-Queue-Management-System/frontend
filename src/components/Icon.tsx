type Props = {
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  classNameDiv?: string;
  className?: string;
  style?: React.CSSProperties | undefined;
  outlined?: boolean;
  onClick?: () => void;
};

export default function Icon({
  IconComponent,
  classNameDiv = "",
  className = "",
  style,
  outlined,
  onClick,
}: Props) {
  return (
    <div
      className={`flex justify-center items-center h-fit ${classNameDiv}`}
      onClick={onClick}
    >
      <IconComponent
        className={`${className} ${outlined && "outline"}`}
        style={style}
      />
    </div>
  );
}
