type TProps = {
  src: string;
  alt: string;
};

export default function Avatar(props: TProps) {
  return (
    <div className="overflow-hidden">
      <img src={props.src} alt={props.alt} className="rounded-full w-24 h-24 object-cover" />
    </div>
  );
}
