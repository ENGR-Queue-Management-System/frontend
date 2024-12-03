import React from "react";

type Props = {
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?: string;
  style?: React.CSSProperties | undefined;
  outlined?: boolean;
  onClick?: () => void;
};
class Icon extends React.Component<Props, any> {
  static defaultProps = {
    outlined: false,
  };
  constructor(props: any) {
    super(props);
  }

  render() {
    const { IconComponent, className, style, outlined, onClick } = this.props;
    return (
      <div
        className="flex justify-center items-center h-full"
        onClick={onClick}
      >
        <IconComponent
          className={`${className} ${outlined && "outline"}`}
          style={style}
        />
      </div>
    );
  }
}
export default Icon;
