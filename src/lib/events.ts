export const CONTACT_DRAWER_EVENT = "open-contact-drawer";
export const MARKET_REPORT_EVENT = "open-market-report";

export const openContactDrawer = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONTACT_DRAWER_EVENT));
};

export const openMarketReport = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(MARKET_REPORT_EVENT));
};
