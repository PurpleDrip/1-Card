import Card from "./components/ui/Card"
import { VerifiedDoc } from "./components/ui/VerifiedDoc"
import Header from "./components/ui/Header"
import Footer from "./components/ui/Footer"
import { useEffect, useState } from "react"

const App = () => {

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

  const [data, setData] = useState<UserData>();
  const [NCid, setNCid] = useState("")
  const [address, setAddress] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      chrome.storage.local.get(['address','NCid'], async (result) => {
        const storedAddress = result.address;
        const storedNCid=result.NCid;
        const response = await fetch("http://localhost:5000/api/v1/extension/get-user-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ NCid })
        });
        const res=await response.json();
        setData(res)
        setNCid(storedNCid);
        setAddress(storedAddress)
      });
    };
    fetchData();
  }, []);
  return (
    <div className="max-h-min w-[350px] flex items-center justify-center bg-zinc-900 flex-col gap-4 p-4">
      <Header address={address}/>
      <Card NCid={NCid} />
      <VerifiedDoc data={data} />
      <Footer/>
    </div>
  )
}

export default App