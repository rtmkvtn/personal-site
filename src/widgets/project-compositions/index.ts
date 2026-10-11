import type { ComponentType } from "react";
import type { ResolvedProject } from "@/shared/config";
import { CryptoMarketplace } from "./crypto-marketplace/CryptoMarketplace";
import { Wizmart } from "./wizmart/Wizmart";
import { EdTechPlatform } from "./ed-tech-platform/EdTechPlatform";

export const PROJECT_COMPOSITIONS: Record<
  string,
  ComponentType<{ project: ResolvedProject }>
> = {
  "crypto-marketplace": CryptoMarketplace,
  wizmart: Wizmart,
  "ed-tech-platform": EdTechPlatform,
};
