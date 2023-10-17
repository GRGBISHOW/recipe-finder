import { Box } from "@mui/material";

const Image = ({ image, width = "60px", height= "60px", title='' }) => {
  const pic =`http://localhost:3001/backend/assets/${image}`;

  const titleStyle = {
    marginTop:'10px',
    color: 'var(--Dark-green, #105B27)',
    textAlign: 'center',
    fontFamily: 'Quicksand',
    fontSize: '26px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '28.069px; /* 77.968% *',
    letterSpacing: '1.053px',
  };

  return (
    <Box width={width} height={height} display='flex' alignItems="center" flexDirection='column' padding= '0 0 4% 0'>
      <img
        style={{ borderRadius: "5%",}}
        width={width}
        height={height}
        alt="user"
        src={pic}
      />
      {(title == '') ? (
        console.log('no title')
      ): (
        <Box style={titleStyle}>{title}</Box>
      )}
    </Box>
  );
};

export default Image;
