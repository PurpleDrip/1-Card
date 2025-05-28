import axiosInstance from "../axios";

export const registerUser = async(
    password: string,
    publicKey: string,
    walletPublicAddress: string
): Promise<any> => {
    return axiosInstance.post("/api/v1/auth/register", {
        walletPublicAddress,
        password,
        publicKey
    });
};
