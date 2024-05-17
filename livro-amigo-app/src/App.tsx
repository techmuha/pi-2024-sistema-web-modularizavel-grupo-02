import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SplashScreen } from "@/components/splash-screen";
import { Navigation } from "@/components/navigation";
import { Home, Search, New, Account, Book } from "@/pages";

export const queryClient = new QueryClient();

function NoMatch() {
  return <div>Nenhuma página encontrada.</div>;
}

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <main className="pb-40">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="/buscar" element={<Search />} />
          <Route path="/novo" element={<New />} />
          <Route path="/conta" element={<Account />} />
          <Route path="/livro/:id" element={<Book />} />
        </Routes>

        <Navigation />
      </QueryClientProvider>
    </main>
  );
}
