import React, { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./Backdrop";

type TModalOverlayProps = {
  header: string;
  children: React.ReactNode;
  onSubmit?(): void;
  className?: string;
  style?: CSSProperties;
  footer?: React.JSX.Element;
};

type TModalProps = TModalOverlayProps & {
  onCancel(): void;
  show: boolean;
};

function ModalOverflay(props: TModalOverlayProps) {
  const customVariantAnimate = {
    hidden: {
      transform: "translateY(-100%) translateX(-50%)",
      opacity: 0,
    },
    visible: {
      transform: "translateY(-50%) translateX(-50%)",
      opacity: 1,
    },
  };

  return createPortal(
    <motion.div
      variants={customVariantAnimate}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      transition={{ duration: 0.3 }}
      className={`${
        props.className ? props.className : ""
      } z-[2] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 h-max rounded-lg shadow overflow-hidden bg-white`}
    >
      <header className="bg-sky-700 p-3">
        <h2 className="text-center text-xl text-white">{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()} className="w-full text-center">
        <div>{props.children}</div>
        <footer className="my-3">{props.footer}</footer>
      </form>
    </motion.div>,
    document.getElementById("modal")!
  );
}

export default function Modal(props: TModalProps) {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <AnimatePresence>{props.show && <ModalOverflay {...props} />}</AnimatePresence>
    </>
  );
}
