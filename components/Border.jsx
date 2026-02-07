import React from 'react';
import { Box, Text } from 'ink';
import { borderColourSchemes } from '../colourScheme';

const Border = ({ 
    children,
    dimensions,
    isTerminalTooSmall,
    minWidth,
    minHeight,
    logoColourIndex,
    showInnerBorder
}) => {
    return (
        isTerminalTooSmall ? (
            <Box
                borderStyle="round"
                borderColor="red"
                width={dimensions.width}
                height={dimensions.height}	
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap="1"
            >
                {dimensions.width <= minWidth ? (
                    <Text >The width is {dimensions.width}, increase by {minWidth - dimensions.width} to begin</Text>
                ) : (
                    <Text >The width is enough</Text>
                )}
                {dimensions.height <= minHeight ? (
                    <Text >The height is {dimensions.height}, increase by {minHeight - dimensions.height} to begin</Text>
                ) : (
                    <Text >The height is enough</Text>
                )}
                
            </Box>
        ) : (
            <Box
                borderStyle="round"
                borderColor={borderColourSchemes[logoColourIndex][0]}
                width={dimensions.width}
                height={dimensions.height}
            >
                <Box 
                    borderStyle="round"
                    borderColor={borderColourSchemes[logoColourIndex][1]}
                    width="100%"
                    height="100%"
                > 	
                    <Box 
                        borderStyle="round"
                        borderColor={borderColourSchemes[logoColourIndex][2]}
                        width="100%"
                        height="100%"
                    > 	
                        <Box 
                            borderStyle="round"
                            borderColor={borderColourSchemes[logoColourIndex][3]}
                            width="100%"
                            height="100%"
                            alignItems='center'
                            justifyContent='space-between'
                            flexDirection="column"
                        > 	
                            <Box
                                flexDirection="column" 
                                gap={1}
                                alignItems='center' 
                                justifyContent='center'
                                height="100%"
                            >
                                <Box 
                                    borderStyle={showInnerBorder? "classic" : undefined}
                                    borderColor={showInnerBorder? "red" : undefined}
                                    flexDirection="column" 
                                    width={minWidth - 10} 
                                    height={minHeight - 13} 
                                    alignItems='center' 
                                    justifyContent='center'
                                >
                                    {children}
                                </Box>
                            </Box>
                            <Text color="gray" alignSelf="center" >Press ctrl + 'q' or ESC to quit</Text>	
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    )
}

export default Border;