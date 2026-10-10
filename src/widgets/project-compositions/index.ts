import type { ComponentType } from "react";
import type { ResolvedProject } from "@/shared/config";
import { CryptoMarketplace } from "./crypto-marketplace/CryptoMarketplace";

export const PROJECT_COMPOSITIONS: Record<
  string,
  ComponentType<{ project: ResolvedProject }>
> = {
  "crypto-marketplace": CryptoMarketplace,
};
