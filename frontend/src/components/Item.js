import { ItemContainer, ButtonStyled, InfoContainer, Title, Description, Image } from '../helpers/styles';

/**
 * Item component
 * @param {*} param0 
 * @returns 
 */
const Item = ({ item, onAddToCart }) => (
    <ItemContainer backgroundImage={require('../helpers/grocery-list.jpg')}>
      <InfoContainer>
        <Title>{item.name}</Title>
        <Description>{item.description}</Description>
      </InfoContainer>
      <ButtonStyled onClick={() => onAddToCart(item)}>Add to Cart</ButtonStyled>

    </ItemContainer>
  );
  
  export default Item;