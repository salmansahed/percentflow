import { defaultCache } from "@serwist/next/worker";
import { installSerwist } from "serwist";

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});
