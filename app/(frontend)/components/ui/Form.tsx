"use client";

import Button from "./Button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Input, { InputProps } from "./Input";
import { useActionState } from "@/hooks/use-action-state";
import { SendMailResponse } from "@/lib/actions";

interface FormProps {
  fields?: InputProps[];
  action: (formData: FormData) => Promise<SendMailResponse>;
}

function Form({ fields = [], action }: FormProps) {
  const { submit, pending, state } = useActionState(action);

  return (
    <form
      className={cn("max-w-xl w-full grid grid-cols-2 gap-4 relative z-10")}
      onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        submit(formData);
      }}
    >
      <AnimatePresence>
        <motion.div
          className="w-full col-span-full grid grid-cols-2 gap-4 overflow-hidden"
          initial={{ height: "auto" }}
          animate={{ height: state.ok ? 0 : "auto" }}
          transition={{ duration: 0.3 }}
        >
          {fields.map((field) => (
            <Input
              key={field.name}
              {...field}
              error={state?.errors?.[field.name]?.[0]}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className={"col-span-full relative"}
        initial={false}
        style={{
          bottom: pending ? 0 : state.ok ? "50%" : 0,
          left: state.ok ? "50%" : 0,
          width: state.ok ? "40px" : "100%",
          height: pending ? "100%" : state.ok ? "40px" : "auto",
          transform: state.ok ? "translate(-50%, 50%)" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <Button
          classNames={{
            body: cn({
              "!h-full": state.ok,
              "!p-0 !rounded-full": state.ok,
            }),
          }}
          disabled={state.ok}
          radius="sm"
          fullWidth
          type="submit"
          color="dark"
          icon={
            pending
              ? "eos-icons:loading"
              : state.ok
                ? "f7:checkmark-alt"
                : "f7:chevron-right"
          }
        >
          {!pending && !state.ok && "Submit"}
        </Button>
      </motion.div>
    </form>
  );
}

export default Form;
