import z from 'zod';

export const publicKeySchema=z.string().regex(/^04[a-f0-9]{128}$/,"Invalid public key format");

export const registerInputSchema=z.object({
    walletPublicAddress: z.string().trim().toLowerCase().regex(/^0x[a-f0-9]{40}$/, 'Invalid wallet address format'),
    password:z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must not exceed 64 characters")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one digit")
    .regex(/[@$!%*?&]/, "Password must include at least one special character (@$!%*?&)"),
    publicKey:publicKeySchema
})

export const userSchema=z.object({
        NCid: z.string().regex(/^0x[a-f0-9]{32}$/, 'Invalid NCid format'),
}).merge(registerInputSchema);
