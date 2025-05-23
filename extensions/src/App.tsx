import { Card } from "./components/ui/Card"
import { VerifiedDoc } from "./components/ui/VerifiedDoc"

const App = () => {
  return (
    <div className="max-h-min w-screen flex items-center justify-center bg-red-700 flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold">Document Archieve</h1>
      <Card/>
      <VerifiedDoc/>
    </div>
  )
}

export default App