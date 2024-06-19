import { createPortal } from "react-dom";

type TProps = {
  children: React.ReactNode;
};

export default function MainHeader(props: TProps) {
  return createPortal(
    <div className="w-full h-16 flex justify-start md:items-center md:justify-between fixed top-0 left-0 bg-color1 shadow py-4 z-[5]">
      {props.children}
    </div>,
    document.getElementById("header")!
  );
}
