import { Container, Divider, Stack } from "@mui/material";
import TechForm from "./components/forms/TechForm";
import PromotionForm from "./components/forms/PromotionForm";
import LoginForm from "./components/forms/LoginForm";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import TechList from "./components/lists/TechList";

export function App() {
  const client = new QueryClient();
  return (
    <>
      <Toaster />
      <QueryClientProvider client={client}>
        <Container>
          <Stack spacing={5}>
            <TechForm />
            <Divider />
            <PromotionForm />
            <Divider />
            <LoginForm />
            <TechList></TechList>
          </Stack>
        </Container>
      </QueryClientProvider>
    </>
  );
}
