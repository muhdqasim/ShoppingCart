// styles/styles.js
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin-right: 6%;
`;

export const CartStyle = styled.div`
  position: fixed;
  right: 1%;
  top: 0;
  width: 30%;
  height: 70%;
  border-left: 1px solid #ddd;
  padding: 10px;
  overflow: auto;
  margin-top: 11%;
  background-color: ghostwhite;
  box-shadow: 0 10px 35px 0 rgba(0, 0, 0, 0.2),0 10px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 25px;
`;

export const ItemList = styled.div`
  width: 70%; 
  padding: 20px;
`;

export const StyledTextField = styled(TextField)`
    color: black;
    border-radius: 25px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 10px 20px;
    max-width: 65%;
`;

export const ClearCartButton = styled(Button)`
  background-color: #f44336; /* red */
  border-radius: 25px;
  color: white;
  &:hover {
    background-color: #d32f2f; /* dark red */
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 40px;
  padding-right: 40px;
  background: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.7)), url(${props => props.backgroundImage});
  background-size: cover;
  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${props => props.backgroundImage});
  }
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  align-self: left;
  color: white;
  letter-spacing: 2px;
  font-size: 28px;
  font-weight: bold;
`;

export const Description = styled.p`
  margin: 0;
  align-self: left;
  color: white;
  font-size: 18px;
  letter-spacing: 2px;
`;

export const ButtonStyled = styled.button`
  padding: 10px 20px;
  margin-right: 20px;
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: bold;

  border-radius: 25px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  &:hover {
    background-color: #1877F2; /* light blue */
  }
`;

export const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;