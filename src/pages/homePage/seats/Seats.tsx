import React from "react";
import { useStore } from "effector-react";

import { ISessionObject } from "utils/types";
import { cinemaSessionsModel } from "entities/cinemaSession";

const Seats = () => {
  const purchaseData: ISessionObject | undefined = useStore(cinemaSessionsModel.$purchaseData);

  //create redirect
  return (
    <>
      {purchaseData && (
        <div>
          {purchaseData.cinema}:{purchaseData.time}
        </div>
      )}
    </>
  );
};

export default Seats;
