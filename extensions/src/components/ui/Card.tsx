import { Clipboard } from "lucide-react"

const Card = ({NCid}:{NCid:string}) => {
  return (
    <div className="w-full p-4 border-rose-600">
        <h1 className="text-[22px] raleway-md text-white">Your Unique Null Card ID</h1>
        <div className="flex items-center max-w-max mx-auto px-4 py-2 rounded-xl mt-2 border-emerald-900 gap-3 text-center border">
            <h2 className="text-center text-sm text-emerald-600">{NCid || "Not registered"}</h2>
            <Clipboard className="text-emerald-400" size={18}/>
        </div>
    </div>
  )
}

export default Card