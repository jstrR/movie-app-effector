import React from "react";
import { useStore } from "effector-react";

import { ISessionObject } from "../../utils/types";
import { $purchaseData } from "../../effector/purchaseData";
/*const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8)
  }
}));*/

const Seats = () => {
  //const classes = useStyles();

  const purchaseData: ISessionObject | undefined = useStore($purchaseData);

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
