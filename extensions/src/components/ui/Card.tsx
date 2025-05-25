import { Clipboard } from "lucide-react"

const Card = () => {
  return (
    <div className="w-full p-4 border-rose-600">
        <h1 className="text-[25px] raleway-md text-white">Your Unique Null Card ID</h1>
        <div className="flex items-center max-w-max mx-auto px-4 py-2 rounded-xl mt-2 border-emerald-900 gap-3 text-center border">
            <h2 className="text-center text-xl text-emerald-600">nc-5xfr-7gt5-ert4-dsx1-wee3...f09z</h2>
            <Clipboard className="text-emerald-400" size={18}/>
        </div>
    </div>
  )
}

export default Card