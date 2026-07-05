import { Inngest } from "inngest";
import env from "../env";

export const inngest = new Inngest({ id: env.APPLICATION_NAME });