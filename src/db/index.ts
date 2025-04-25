import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from "@/env.js"
import * as schema from "./schema";


const db = drizzle(env.DATABASE_URL!, { schema });

export { db };




