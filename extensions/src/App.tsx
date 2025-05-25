import Card from "./components/ui/Card"
import { VerifiedDoc } from "./components/ui/VerifiedDoc"
import Header from "./components/ui/Header"
import Footer from "./components/ui/Footer"

const App = () => {
  return (
    <div className="max-h-min w-[350px] flex items-center justify-center bg-zinc-900 flex-col gap-4 p-4">
      <Header/>
      <Card/>
      <VerifiedDoc/>
      <Footer/>
    </div>
  )
}

export default App