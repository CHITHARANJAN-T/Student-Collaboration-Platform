import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'
import FAQ from '../Pdf/Frequently Asked Questions.pdf'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import privacyPolicyPdf from '../Pdf/Privacy Policy for TeamConnect.pdf'


export default function Footer(props) {
    

    return (
        <Paper component='footer' elevation={24} sx={{position:'fixed', height: '64px', width: '100%', bottom: 0,color:'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center',backgroundColor:'#2e7eee' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', ml: 6 }}>
                Contact us: <Link style={{ display: 'flex', alignItems: 'center' }} to='https://wa.me/9790428641' target='_blank'><WhatsAppIcon sx={{ color: 'greenyellow', '&:hover': { color: '#25D366' } }} /></Link>
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='body2' >Copyright © TeamConnect {new Date().getFullYear()}</Typography>
                <Link to={privacyPolicyPdf} target='_blank' style={{ fontSize: '12px',font:'icon' ,color: 'red',textDecoration:'none' }}>Privacy Policy</Link>
            </Box>
            <Box sx={{ textAlign: 'center',paddingRight:'10%' }}>
                <Typography variant='body2'>Frequently Asked Question</Typography>
                <Link to={FAQ} target='_blank' style={{ fontSize: '12px',font:'icon', color: 'red',textDecoration:'none' }}>FAQ</Link>
            </Box>
            {/* <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', mr: 6 }}>
                <Link to='https://www.instagram.com/_chithu.00_' target='_blank' ><InstagramIcon sx={{ color: 'grey', '&:hover': { color: '#C13584' } }} /></Link>
                <Link to='' target='_blank'><FacebookIcon sx={{ color: 'grey', '&:hover': { color: '#4267B2' } }} /></Link>
                <Link to='' target='_blank'><TwitterIcon sx={{ color: 'grey', '&:hover': { color: '#1DA1F2' } }} /></Link>
            </Box> */}
        </Paper>
    )
}