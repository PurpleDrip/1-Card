import { ShieldUser } from "lucide-react"

  type DocType = "AADHAR" | "PASSPORT" | "VOTER" | "PANCARD" | "RATION" | "DRIVING_LICENSE";
  interface UserData{
      nullCardData:[{
        docType: DocType,
        verifiedBy:string,
        verifiedAt:string
      }],
      activityLogs: [{
        activityName:string,
        activityTime:string
      }],
      usageLogs: [{
        verifier:string,
        verificationTime:string
      }]
  }

export const VerifiedDoc = ({data}:{data?:UserData}) => {
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
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4 my-2">
        {verifiedDocs.map((doc) => (
          <div key={doc.id} className="flex flex-col items-center justify-center gap-1 w-[95px]">
            <div className="p-2 rounded text-white border border-emerald-500 bg-emerald-700">
              <ShieldUser size={24} />
            </div>
            <h1 className="text-zinc-300 text-[12px] raleway-md">{doc.type}</h1>
          </div>
        ))}
      </div>

    </>
  )
}
