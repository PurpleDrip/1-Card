import { ShieldUser } from "lucide-react"

export const VerifiedDoc = () => {
  const verifiedDocs = [
  { id: "1", type: "Aadhar" },
  { id: "2", type: "Passport" },
  { id: "3", type: "PAN Card" },
  { id: "4", type: "Voter ID" },
  { id: "5", type: "Driving" },
  { id: "1", type: "Aadhar" },
  { id: "2", type: "Passport" },
  { id: "3", type: "PAN Card" },
  { id: "4", type: "Voter ID" },
  { id: "5", type: "Driving" },
];

  return (
    <>
      <h1 className="text-white text-[20px] underline underline-offset-8 raleway-md">Verified Docs</h1>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-8 my-2 px-8">
        {verifiedDocs.map((doc) => (
          <div key={doc.id} className="flex flex-col items-center justify-center gap-1 w-[95px]">
            <div className="p-2 rounded-full text-white border border-emerald-500 bg-emerald-700">
              <ShieldUser size={24} />
            </div>
            <h1 className="text-zinc-300 text-[16px] raleway-md">{doc.type}</h1>
          </div>
        ))}
      </div>

    </>
  )
}
