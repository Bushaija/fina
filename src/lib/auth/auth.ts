import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {  
        enabled: true,
        minPasswordLength: 8,
        maxPasswordLength: 255,
    },
    account: {
        accountLinking: {
            enabled: true,
        },
    }
});