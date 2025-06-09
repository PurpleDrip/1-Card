import { Clipboard } from "lucide-react"

const Header = ({address}:{address:string}) => {
  return (
    <section className="flex items-center justify-between w-full border-[0.2px] border-emerald-600 bg-emerald-900 px-4 py-2 rounded-lg">
        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/null-10487392-8448971.png" alt="" className="h-[60px]"/>
        <div className="flex flex-col items-end gap-1">
            <h1 className="text-white raleway-xs text-[17px]">Linked Wallet</h1>
            <div className="flex gap-2 items-center border px-2 py-1 rounded-xl border-emerald-600">
            <h1 className="text-emerald-400">{address || "Not Registered"}</h1>
            <Clipboard className="text-emerald-200 cursor-pointer hover:text-white" size={15}/>
            </div>
        </div>
    </section>
  )
}

export default Header