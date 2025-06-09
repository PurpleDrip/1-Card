import { ShieldUser, IdCard, BookUser, Contact, CreditCard, CarFront, type LucideIcon } from "lucide-react";

  type DocType = "AADHAR" | "PASSPORT" | "VOTER" | "PANCARD" | "RATION" | "DRIVING_LICENSE";
  interface UserData{
      nullCardData:{
        docType: DocType,
        verifiedBy:string,
        verifiedAt:string
      }[];
      activityLogs: {
        activityName:string,
        activityTime:string
      }[];
      usageLogs: {
        verifier:string,
        verificationTime:string
      }[];
  }

export const VerifiedDoc = ({data}:{data?:UserData}) => {
    const docTypeMapping: Record<DocType, { label: string; icon: LucideIcon }> = {
      AADHAR: { label: "Aadhar", icon: IdCard },
      PASSPORT: { label: "Passport", icon: BookUser  },
      VOTER: { label: "Voter ID", icon: Contact  },
      PANCARD: { label: "PAN Card", icon: CreditCard  },
      RATION: { label: "Ration", icon: ShieldUser  },
      DRIVING_LICENSE: { label: "Driving License", icon: CarFront}
    };

  return (
    <>
      <h1 className="text-white text-[20px] underline underline-offset-8 raleway-md">Verified Docs</h1>
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-4 my-2">
        {data?.nullCardData?.map((doc, index) => {
          const { label, icon: Icon } = docTypeMapping[doc.docType];
          return (
            <div key={index} className="flex flex-col items-center justify-center gap-1 w-[95px]">
              <div className="p-2 rounded text-white border border-emerald-500 bg-emerald-700">
                <Icon size={24} />
              </div>
              <h1 className="text-zinc-300 text-[12px] raleway-md">{label}</h1>
            </div>
          );
        })}
      </div>
    </>
  )
}
