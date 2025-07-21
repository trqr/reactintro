import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
      <>
          <ToastContainer
              position="bottom-left"
              draggable={true}
              theme="colored"
              closeOnClick={false}
          />
          <RouterProvider router={router}/>
      </>
  )
}

export default App
