import React from "react";
import { shallowEqual, useSelector } from "react-redux";
/*const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8)
  }
}));*/

interface IPurchaseData {
  purchaseData?: {
    session?: {
      cinema: string;
      time: string;
    };
  };
}

const Seats = () => {
  //const classes = useStyles();

  const selectPurchaseData = (state: IPurchaseData) => {
    return state.purchaseData && state.purchaseData.session;
  };

  const purchaseData = useSelector(selectPurchaseData, shallowEqual);

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
