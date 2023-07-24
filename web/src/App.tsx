import { Header } from "./components/Header";
import { Orders } from "./components/Orders";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

export function App() {
  return (
    <>
      <ToastContainer position="bottom-center" />
      <GlobalStyles />
      <Header />
      <Orders />
    </>
  )
}

