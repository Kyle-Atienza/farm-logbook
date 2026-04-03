// server/generate-openapi.ts
import { writeFileSync } from "fs";
import { specs } from "./swagger";

writeFileSync("./openapi.json", JSON.stringify(specs, null, 2));