import Wrapper from "@/Layout/Wrapper/wrapper";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";



const queryClient=new QueryClient()
export default function App({ Component, pageProps }: AppProps) {

  
  return(
    <QueryClientProvider client={queryClient}>
   <Wrapper>
   <Component {...pageProps} />
   </Wrapper>
   </QueryClientProvider>
  )
}