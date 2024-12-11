type Props = {
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
  style?: React.CSSProperties | undefined;
  outlined?: boolean;
  onClick?: () => void;
};

const Icon: React.FC<Props> = ({
  IconComponent,
  className,
  style,
  outlined,
  onClick,
}) => {
  return (
    <div className="flex justify-center items-center h-fit" onClick={onClick}>
      <IconComponent
        className={`${className} ${outlined && "outline"}`}
        style={style}
      />
    </div>
  );
};

export default Icon;
