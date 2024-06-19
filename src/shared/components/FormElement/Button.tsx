import React, { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
type TProps = {
  children: React.ReactNode;
  className?: string;
  to?: string;
  href?: string;
  btnAttribute?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export default function Button(props: TProps) {
  if (props.href) {
    return (
      <a href={props.href} className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded">
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`${
          props.className ? props.className : "bg-yellow-500 hover:bg-yellow-700"
        }  text-white font-bold py-2 px-4 rounded text-center`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      {...props.btnAttribute}
      className={`${
        props.className
          ? `${props.className} font-bold py-2 px-4 rounded`
          : "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      }`}
    >
      {props.children}
    </button>
  );
}
