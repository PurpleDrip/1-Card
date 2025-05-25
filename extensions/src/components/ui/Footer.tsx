import { Copyright } from "lucide-react"

const Footer = () => {
  return (
    <div className="flex flex-col gap-1 text-[16px] items-center text-zinc-300 raleway-md">
      <div className="w-[450px] border-t-2 rounded-full mb-4 border-emerald-700"></div>
      <p className="flex gap-2 items-center"><Copyright size={16}/>2025 Null Card Inc. All Rights Reserved.</p>
      <h1>Built with ❤️ on Polygon PoS</h1>
    </div>
  )
}

export default Footer