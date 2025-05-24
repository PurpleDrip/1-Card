import mongoose, {Schema} from "mongoose";


export interface IUser{
    walletPublicAddress: string;
    NCid: string;
    password: string;
}

const user=new Schema<IUser>({
    walletPublicAddress:{type:String,required:true,unique:true},
    NCid:{type:String,required:true,unique:true},
    password:{type:String,required:true},
});

export default mongoose.model("User",user);