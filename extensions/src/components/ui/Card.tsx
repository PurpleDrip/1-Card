import { useState } from "react";
import { Clipboard } from "lucide-react";

const Card = ({ NCid }: { NCid: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(NCid)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
        console.log("NCid copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy NCid:", err);
      });
  };

  const formattedNCid = NCid
    ? `${NCid.slice(0, 14)}...${NCid.slice(-14)}`
    : "Not registered";

  return (
    <div className="w-full p-4 border-rose-600">
      <h1 className="text-[22px] raleway-md text-white">Your Unique Null Card ID</h1>
      <div className="flex items-center max-w-max mx-auto px-4 py-2 rounded-xl mt-2 border-emerald-900 gap-3 text-center border">
        <h2 className="text-center text-sm text-emerald-600">{formattedNCid}</h2>
        {NCid && (
          <span title={copied ? "Copied!" : "Copy to Clipboard"}>
            <Clipboard
              className={`text-emerald-400 cursor-pointer hover:text-white ${copied ? "text-emerald-300" : ""}`}
              size={18}
              onClick={handleCopy}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
