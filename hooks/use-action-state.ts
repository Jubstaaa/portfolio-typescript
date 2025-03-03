import { SendMailResponse } from "@/lib/actions";
import { useState } from "react";

export function useActionState(
  action: (formData: FormData) => Promise<SendMailResponse>
) {
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<SendMailResponse>({});

  const submit = async (formData: FormData) => {
    setPending(true);
    const res = await action(formData);
    setState(res);
    setPending(false);
  };
  return { submit, pending, state };
}
