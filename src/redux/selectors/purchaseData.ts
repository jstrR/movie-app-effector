import { ISessionObject } from "../../utils/types";

interface IPurchaseDataSelector {
  purchaseData?: {
    session?: ISessionObject;
  };
}

export const selectPurchaseData = (
  state: IPurchaseDataSelector
): ISessionObject | undefined => {
  return state.purchaseData && state.purchaseData.session;
};
