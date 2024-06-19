import { createPortal } from "react-dom";

type TProps = {
  onClick(): void;
};

export default function Backdrop(props: TProps) {
  return createPortal(
    <div className={`bg-black/40 fixed z-[1] top-0 left-0 w-full h-full`} onClick={props.onClick} />,
    document.getElementById("backdrop")!
  );
}
