import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BlogHomePage from "./Blog";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BlogHomePage />
      </QueryClientProvider>
    </>
  );
}

export default App;
