import { cn } from "@/app/utils/cn";
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
  loading?: boolean;
  classNames?: {
    body?: string;
  };
}

function Card<C extends ElementType = "div">({
  as,
  children,
  classNames = {},
  loading = false,
  ...rest
}: PolymorphicComponentProp<C, CardProps>) {
  const Component = as || "div";

  const classes = cn(
    "flex flex-col items-start justify-between p-[30px] relative overflow-hidden rounded-large bg-white border border-[#e2e8f0] h-[180px] max-h-[180px]",
    {
      "!max-h-[500px] h-fit": !loading,
      "animate-pulse": loading,
    },
    classNames.body
  );

  return (
    <Component className={classes} {...rest}>
      {!loading && children}
    </Component>
  );
}

export default Card;
