import React from 'react';
import Container from './Container';
import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <div className='border-t'>
        <Container>
            <FooterTop />
            <FooterBottom />
        </Container>

        <Copyright />
    </div>
  )
}

export default Footer