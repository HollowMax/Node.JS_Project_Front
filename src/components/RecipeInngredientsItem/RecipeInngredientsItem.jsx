import {
  RecipeItem,
  ImageWrapper,
  Label,
  RealCheckbox,
  CustomCheckbox,
  IngNumber,
  TextContainer,
  IngName,
  IngDescr,
} from './RecipeInngredientsItem.styled';
import sprite from '../../images/sprite.svg';

import { useState } from 'react';
import { addShoppingIngredient } from 'redux/ingredients/ingredientsOperations';
import { useDispatch } from 'react-redux';

const RecipeInngredientsItem = obj => {
  const [toShoppingList, setToShoppingList] = useState(false);
  const dispatcher = useDispatch();

  const addToShoppingList = () => {
    setToShoppingList(true);
    dispatcher(
      addShoppingIngredient({
        idIngredient: obj.idIngredient,
        image: obj.image,
        strIngredient: obj.strIngredient,
        weight: obj.weight,
      })
    );
    return;
  };

  return (
    <>
      <RecipeItem>
        <Label>
          <ImageWrapper>
            <img src={obj.image} alt={obj.strIngredient} />
          </ImageWrapper>
          <TextContainer>
            <IngName>{obj.strIngredient}</IngName>
            <IngDescr>{obj.strDescription}</IngDescr>
          </TextContainer>
          <IngNumber>{obj.weight}</IngNumber>
          <RealCheckbox
            type="checkbox"
            onChange={addToShoppingList}
            disabled={toShoppingList}
          />
          <CustomCheckbox>
            <svg>
              <use href={sprite + `#icon-pick`} />
            </svg>
          </CustomCheckbox>
        </Label>
      </RecipeItem>
    </>
  );
};

export default RecipeInngredientsItem;
