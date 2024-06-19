import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

type TProps = {
  children: React.ReactNode;
  onClick: () => void;
};
export default function SideDrawer(props: TProps) {
  const variantCustomAnimate = {
    hidden: {
      translateX: -200,
      opacity: 0,
    },
    visible: {
      translateX: 0,
      opacity: 1,
    },
  };

  return createPortal(
    <motion.div
      onClick={props.onClick}
      variants={variantCustomAnimate}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      transition={{ ease: "easeIn", duration: 0.3 }}
      className="visible left-0 top-16 pt-6 z-[5] fixed flex flex-col bg-white w-3/4 md:w-1/2 h-full rounded-br-lg rounded-tr-lg overflow-hidden md:invisible"
    >
      {props.children}
    </motion.div>,
    document.getElementById("aside")!
  );
}
