/// <reference types="vite/client" />

import type { EngineeringRegister } from "./lib/domain";

declare global {
  interface Window {
    pss?: {
      loadRegister: () => Promise<EngineeringRegister>;
      saveRegister: (data: EngineeringRegister) => Promise<boolean>;
      resetRegister: () => Promise<EngineeringRegister>;
    };
  }
}

export {};
