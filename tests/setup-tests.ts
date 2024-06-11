import { getEnv } from "~/env.server";
import dotenv from "dotenv";
import { installGlobals } from "@remix-run/node";

installGlobals();

dotenv.config();

global.ENV = getEnv();

