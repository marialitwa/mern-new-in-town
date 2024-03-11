// Code block needed for deployment => In case of development mode 
// my computer is serving as the server with localhost:5000.
// In case of deployment my server is outsourced on Vercel as server project.

const baseUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : (import.meta.env.VITE_SERVERBASE as string);
export default baseUrl;

