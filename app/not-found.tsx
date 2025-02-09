import Image from "next/image";
import React from "react";
import Button from "./components/ui/Button";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      <Image
        className="w-[500px]"
        src={
          "https://nmpz8srvxyslvrdu.public.blob.vercel-storage.com/images/image%20(3)%20(1)-gOZp2CMcmr5Uj1VyjDLZ420rAePL6w.png"
        }
        width={1000}
        height={1000}
        alt="404 Image"
      />
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-primary text-6xl font-semibold leading-20 text-center tracking-tighter">
          404 UFO Encounter
        </h1>
        <p className="w-2/3 text-[#647586] text-base font-medium tracking-normal">
          Oops! Looks like you&apos;ve been abducted by the digital realm.
          Don&apos;t worry, we&apos;ll beam you back to safety in no time. Stay
          calm and hold tight! 🛸👽
        </p>
        <Button color="dark" href="/" icon="f7:chevron-right">
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
