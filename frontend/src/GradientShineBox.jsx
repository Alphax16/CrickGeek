import { Box } from "@chakra-ui/react";


const GradientShineBox = ({ children }) => (
    <Box
        position="relative"
        overflow="hidden"
        // _before={{
        //     content: '""',
        //     position: "absolute",
        //     top: 0,
        //     right: 0,
        //     bottom: 0,
        //     left: 0,
        //     pointerEvents: "none",
            // background:
            //     "linear-gradient(to top right, rgba(8, 36, 56, 1) 0%, rgba(8, 36, 56, 1) 100%)",
        // }}
    >
        {children}
    </Box>
);

export { GradientShineBox };
