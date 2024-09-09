import React from 'react'
import {GlobalStyles} from "../Componants/GlobalStyles"
import ParticleBackground from '../Componants/ParticleBackground';
import { FaCode, FaBug, FaCheck, FaLightbulb, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button, FeatureCard, FeatureDescription, FeatureIcon, FeatureTitle, FeaturesContainer, FooterContainer, FooterText, GetStartedButton, HeaderContainer, Subtitle, Title } from '../Styled/welcomePageStyle';
import { MdOutlineMail } from "react-icons/md";


const WelcomePage = () => {
  return (
    <>
    <ParticleBackground/>

    <GlobalStyles/>
    <Link to='/signup'>
        <Button>Sign Up</Button>
      </Link>

      <HeaderContainer>
        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to AI Code Wizard
        </Title>
        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Transform Your Code with the Power of AI
        </Subtitle>
        <Link to='/login'>
          <GetStartedButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Get Started
          </GetStartedButton>
        </Link>
      </HeaderContainer>

      <FeaturesContainer>
        <FeatureCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FeatureIcon><FaCode /></FeatureIcon>
          <FeatureTitle>Code Conversion</FeatureTitle>
          <FeatureDescription>
            Seamlessly convert your code between multiple programming languages including JavaScript, C++, Java, Python, and more.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FeatureIcon><FaBug /></FeatureIcon>
          <FeatureTitle>Code Debugging</FeatureTitle>
          <FeatureDescription>
            Automatically detect and resolve issues in your code to improve functionality and performance.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FeatureIcon><FaCheck /></FeatureIcon>
          <FeatureTitle>Code Quality Check</FeatureTitle>
          <FeatureDescription>
            Ensure your code adheres to best practices and industry standards for maintainability and efficiency.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FeatureIcon><FaLightbulb /></FeatureIcon>
          <FeatureTitle>AI Code Suggestions</FeatureTitle>
          <FeatureDescription>
            Get intelligent code suggestions to improve your coding efficiency and creativity.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FeatureIcon><FaLightbulb /></FeatureIcon>
          <FeatureTitle>AI-Powered DSA Questions</FeatureTitle>
          <FeatureDescription>
            Practice data structures and algorithms with AI-generated questions tailored to your skill level and preferred topics.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesContainer>

      <FooterContainer>
        <FooterText>© 2024 AI Code Wizard.</FooterText>
        <FooterText><a href="https://forms.gle/8vVdXiPCVYNEdUoy7" target="_blank" rel="noopener noreferrer">Submit</a> your feedback here</FooterText>
        <FooterText><FaPhoneAlt /> 8299625919 | <MdOutlineMail /> yprashant174@gmail.com</FooterText>
      </FooterContainer>
    </>
  )
}

export default WelcomePage