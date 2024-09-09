import styled from 'styled-components'

const NavContainer = styled.nav`
 display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
//   background: linear-gradient(90deg, rgb(4, 4, 4), rgb(47, 45, 45));
background-color:black;
  color: #fff;
  min-height: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
//   border-radius: 10px;
  // animation: fadeIn 1s ease-in-out;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 50px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Logo = styled.img`
  width: 200px;
  height: 40px;
//   margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const NavItem = styled.div`
  margin: 10px 0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;

  @media (min-width: 768px) {
    margin: 0 20px;
  }
`;

const Button = styled.button`
  background: #4a00e0;
  border: none;
  border-radius: 20px;
  color: #fff;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: #8e2de2;
    transform: translateY(-2px);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export {
    NavContainer,
    NavItem,
    Button,
    UserInfo,Logo
}