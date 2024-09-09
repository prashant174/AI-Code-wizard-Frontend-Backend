import styled from 'styled-components';
import { motion } from 'framer-motion';

const Button = styled.a`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #58a6ff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1f6feb;
  }
`;

const HeaderContainer = styled.header`
  padding: 20px;
  text-align: center;
//   background-color: #161b22;
//   border-bottom: 1px solid #30363d;
`;

const Title = styled(motion.h1)`
  color: #58a6ff;
  font-size: 2.5rem;
`;

const Subtitle = styled(motion.p)`
  color: #8b949e;
  font-size: 1.2rem;
`;

const GetStartedButton = styled(motion.button)`
  margin-top: 20px;
  background-color: #1bd50a;
  color: #fff;
  padding: 12px 100px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #19b30b;
  }
`;

const FeaturesContainer = styled.section`
  margin:auto;
  padding: 40px 20px;
  // background-color: #0d1117;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  flex: 1;
  // border:1px solid red;
  width:80%;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(22, 27, 34, 0.7);
  border: 1px solid #30363d;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  text-align: center;
  color: #c9d1d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }


`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #58a6ff;
`;

const FeatureTitle = styled.h2`
  color: #58a6ff;
`;

const FeatureDescription = styled.p`
  color: #8b949e;
`;


const FooterContainer = styled.footer`
  padding: 20px;
  text-align: center;
width:80%;
  border-top: 1px solid #30363d;
  margin:auto;
  margin-top: 50px;

`;

const FooterText = styled.p`
  color: #8b949e;
`;

// *************************



export {
    Button, 
    HeaderContainer,
    Title,
    Subtitle,
    GetStartedButton,
    FeaturesContainer,
    FeatureCard,
    FeatureIcon,
    FeatureTitle,
    FeatureDescription,
    FooterContainer,
    FooterText
}