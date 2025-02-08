import { PropsWithChildren } from "react";

function ErrorFormMessage({ children }: PropsWithChildren) {
   return <p className="text-[var(--red-11)] text-sm -mt-2">{children}</p>;
}

export default ErrorFormMessage;
