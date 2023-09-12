import { Box } from "@mui/material";

const Image = ({ image, width = "60px", height= "60px", title='' }) => {
  const pic =`http://localhost:3001/assets/${image}`;

  const titleStyle = {
    fontFamily: 'sans-serif',
    padding:'4%',
    fontSize: '150%'
  };

  return (
    <Box width={width} height={height} display='flex' alignItems="center" flexDirection='column' padding= '4% 0 4% 0'>
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
