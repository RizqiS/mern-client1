type TProps = {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  className?: string;
};

export default function Card(props: TProps) {
  return (
    <div className={`shadow rounded-lg p-4 overflow-hidden ${props?.className}`} style={props.styles}>
      {props.children}
    </div>
  );
}
