type Props = {
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  classNameDiv?: string;
  className?: string;
  style?: React.CSSProperties | undefined;
  outlined?: boolean;
  onClick?: () => void;
};

const Icon: React.FC<Props> = ({
  IconComponent,
  classNameDiv,
  className,
  style,
  outlined,
  onClick,
}) => {
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
};

export default Icon;
