import TableCell from '@mui/material/TableCell';

import { useWallet } from '@hooks';
import { Typography } from '@components/atomic';
import { Button } from '@components/atomic';
import isNull from 'lodash/isNull';
export type NotionalProps = {
    notional?: string;
    displayEditButton?: boolean;
    token: string;
    onSelect: () => void;
  };


const Notional: React.FunctionComponent<NotionalProps> = ({ notional, displayEditButton, token, onSelect}) => {

      const renderNotionalAmount = () => {
    
        return notional;
      };
    
      // const wallet = useWallet();
    
      // const handleClick = () => {
      //   if (isNull(wallet.account)) {
      //     wallet.setRequired(true);
      //   } else {
      //     // todo: fix
      //     onSelect();
      //   }
      // };

      return (
        <TableCell>
          <Typography variant="body2" label="Notional" sx={{ fontSize: 18 }}>
            {renderNotionalAmount()}
          </Typography>
    
            <Button sx={{
              display: "flex",
              paddingTop: (theme) => theme.spacing(0),
              paddingBottom: (theme) => theme.spacing(0),
              paddingLeft: (theme) => theme.spacing(0),
              paddingRight: (theme) => theme.spacing(0),
              borderStyle: "solid",
              borderColor: "#5C0026",
              borderRadius: 1,
              flex: "none",
              width: "100%",
              background: "transparent",
              color: "#FF4AA9",
              '&:hover': {
                borderColor: '#FF4AA9',
                background: "transparent",
              },
            }} onClick={onSelect}> 
                Edit (Liquidity)
            </Button>
    
    
        </TableCell>
      );
};
    
    export default Notional;
