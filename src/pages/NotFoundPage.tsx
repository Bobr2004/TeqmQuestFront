import { Button } from "@radix-ui/themes";
import { routes } from "../App";
import { Link } from "react-router";

function NotFoundPage() {
   return (
      <section className="container mx-auto p-4">
         <h2 className="text-center text-3xl font-bold">404</h2>
         <p className="flex items-center gap-2 justify-center mt-2">
            <span>Page not found</span>
            <Link to={routes.home}>
               <Button variant="soft" color="gray">Go to Home</Button>
            </Link>
         </p>
      </section>
   );
}

export default NotFoundPage;
