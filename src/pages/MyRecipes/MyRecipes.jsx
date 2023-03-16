import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  getCustomRecipes,
  getTotalCustomRecipes,
} from 'redux/ownRecipes/ownRecipesSelectors';
import { getOwnRecipes } from 'redux/ownRecipes/ownRecipesOperations';
import { Container } from 'components/Container/Container';
import { RecipeBlock } from 'components/RecipeBlock/RecipeBlock';
import { Title } from 'components/Title/Title';
import { ContentWrapper, Wrapper } from './MyRecipes.styled';

import img from '../../images/default.jpg';
import { PaginationComp } from 'components/PaginationComp/Pagination';
import { EmptyPagePlug } from 'components/EmptyPagePlug/EmptyPagePlug';

const MyRecipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(getCustomRecipes);
  const total = useSelector(getTotalCustomRecipes);
  const perPage = 4;
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getOwnRecipes({ page: page, per_page: perPage }));
  }, [dispatch, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  console.log(recipes);
  return (
    <Wrapper>
      <Container>
        <Title>My recipes</Title>
        {recipes && recipes.length > 0 ? (
          <ContentWrapper>
            {recipes.map(item => {
              return (
                <li key={item.id}>
                  <RecipeBlock
                    location="recipes"
                    id={item.idMeal}
                    img={item.strMealThumb ?? img}
                    title={item.strMeal ?? 'No name'}
                    text={
                      <span>{item.strInstructions ?? 'No description'}</span>
                    }
                    time={item.cookingTime ?? '__ min'}
                  />
                </li>
              );
            })}
          </ContentWrapper>
        ) : (
          <EmptyPagePlug text="You currently don't have any own recipes added. Let's add some!" />
        )}
        {recipes && recipes.length > 0 && (
          <PaginationComp
            count={Math.ceil(total / perPage)}
            page={page}
            handleChange={handleChange}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default MyRecipes;
