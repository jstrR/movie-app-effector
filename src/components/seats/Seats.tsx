import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { ISessionObject } from "../../utils/types";
import { selectPurchaseData } from "../../redux/selectors/purchaseData";
/*const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8)
  }
}));*/

const Seats = () => {
  //const classes = useStyles();

  const purchaseData: ISessionObject | undefined = useSelector(
    selectPurchaseData,
    shallowEqual
  );

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
