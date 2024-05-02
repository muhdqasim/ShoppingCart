import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Container } from "../helpers/styles";

/**
 * Error component
 * @param {*} param0 
 * @returns 
 */
const Error = ({ errorMessage, open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Container>
                <Box sx={{ 
                    position: 'fixed', 
                    right: '35%', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    width: '30%', 
                    maxWidth: '400px',
                    bgcolor: 'background.paper', 
                    boxShadow: 24, 
                    borderRadius: '10px',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                }}>                    
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Error
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Typography>
                    <Button 
                    onClick={handleClose}   
                    sx={{ 
                        bgcolor: 'error.main', 
                        color: 'white', 
                        borderRadius: '10px',
                        marginTop: '20px',
                        width: '100px',
                        alignSelf: 'center',
                        '&:hover': {
                            bgcolor: 'error.dark',
                        }
                    }}>
                        Close
                    </Button>
                </Box>
            </Container>
        </Modal>
    );
}

export default Error;