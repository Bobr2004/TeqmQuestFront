import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()]
});


// eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImlkIjoxOCwidXNlcm5hbWUiOiJha2FnYW1pMjIyMiIsInN1YiI6ImFrYWdhbWkyMjIyIiwiaWF0IjoxNzM5MjMxMDUwLCJleHAiOjE3NjM0MjMwNTB9.UkfrD8yLS56o1SZu8NwX0Sa1q8wnmdpvRftOE6R5L1q-Bau2tXpylNjrElQ0DtQ6VZELEBNc2bik3zwR-_HX6w