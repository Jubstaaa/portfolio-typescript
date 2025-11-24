import Image from "./components/ui/Image";
import React from "react";
import Button from "./components/ui/Button";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5">
      <Image
        className="w-[500px]"
        src={
          "https://nmpz8srvxyslvrdu.public.blob.vercel-storage.com/UhVyVv9svJPaZp2D9rWaVg3sEw-vQU4qbiexsKJ7c3htw1CJbmT7MVHvf.svg"
        }
        width={1000}
        height={1000}
        alt="404 Image"
      />
      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-primary text-3xl lg:text-6xl font-semibold leading-9 lg:leading-20 text-center tracking-tighter">
          404 UFO Encounter
        </h1>
        <p className="w-2/3 text-secondary text-base font-medium tracking-normal">
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
