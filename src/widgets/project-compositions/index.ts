import type { ComponentType } from "react";
import type { ResolvedProject } from "@/shared/config";
import { CryptoMarketplace } from "./crypto-marketplace/CryptoMarketplace";
import { Wizmart } from "./wizmart/Wizmart";
import { EdTechPlatform } from "./ed-tech-platform/EdTechPlatform";
import { Ziphycare } from "./ziphycare/Ziphycare";
import { MInvest } from "./m-invest/MInvest";
import { CurrencyExchange } from "./currency-exchange/CurrencyExchange";

export const PROJECT_COMPOSITIONS: Record<
  string,
  ComponentType<{ project: ResolvedProject }>
> = {
  "crypto-marketplace": CryptoMarketplace,
  wizmart: Wizmart,
  "ed-tech-platform": EdTechPlatform,
  ziphycare: Ziphycare,
  "m-invest": MInvest,
  "currency-exchange": CurrencyExchange,
};
