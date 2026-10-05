import AppRoutes from "./routes/AppRoutes"
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="min-h-screen">
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  )
}

export default App