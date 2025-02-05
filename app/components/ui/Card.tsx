import clsx from "clsx";
import React from "react";
import { ElementType } from "react";

type AsProps<C extends ElementType> = {
  as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProps<C> & P);

type PolymorphicComponentProp<
  C extends ElementType,
  Props = Record<string, unknown>
> = React.PropsWithChildren<Props & AsProps<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

interface CardProps {
  classNames?: {
    body?: string;
  };
}

function Card<C extends ElementType = "div">({
  as,
  children,
  classNames = {},
  ...rest
}: PolymorphicComponentProp<C, CardProps>) {
  const Component = as || "div";

  const classes = clsx(
    "flex flex-col items-start justify-between flex-1 p-[30px] relative overflow-hidden rounded-large bg-white border border-[#e2e8f0]",
    classNames.body
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

export default Card;
