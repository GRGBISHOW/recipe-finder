import { Box } from "@mui/material";

const ActualLowerBar = () => {

    return(
        <Box sx={{
            display:'flex',
            width: '100%',
            height:'200px',
            alignItems:'center',
            justifyContent:'space-between',
            position:'relative',
        }}>
            <Box display='flex' flexDirection='column' left='5%' position='relative'>
                <Box marginBottom='15px'>
                    <img width='180px' src='http://localhost:3000/assets/Group 26.png' />
                </Box>
                <Box>
                    <img width='180px' src='http://localhost:3000/assets/2020.png' />
                </Box>
            </Box>
            <Box bottom='90px' position='relative' 
                sx={{
                    zIndex:'1000',
                    '&:hover':{
                        'cursor': 'pointer'
                    },
                }}
            onClick={() => { 
                const scrollToTopButton = document.getElementById('LowerBar');
                    scrollToTopButton.scrollIntoView({ behavior: 'smooth' })
                 }}
                >
                <img width='70px' src='http://localhost:3000/assets/Group 130.png' />
            </Box>
            <Box right='5%' position='relative'>
                <img width='180px' src='http://localhost:3000/assets/Group 61.png' />
            </Box>
        </Box>
    )

}

export default ActualLowerBar;