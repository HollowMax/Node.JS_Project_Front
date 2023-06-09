import { Container } from 'components/Container/Container';
import { Title } from 'components/Title/Title';
import { PaginationComp } from 'components/PaginationComp/Pagination';
import { SearchCont } from './SearchPage.styled';
import { SearchNoFound } from 'components/Search/SearchNoFound/SearchNoFound';
import { CardMeal } from 'components/CardMeal/CardMeal';
import { SearchBar } from 'components/Search/SearchBar/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipesByQuery } from 'redux/outerRecipes/outerRecipesOperations';
import { getRecipesByIngredient } from 'redux/ingredients/ingredientsOperations';
import {
  getIsError,
  getRecipesBySearchQuery,
} from 'redux/outerRecipes/outerRecipesSelectors';
import { useMediaRules } from 'hooks/MediaRules';
import { scrollToTop } from 'utils/scrollUp';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams.get('query') ?? '';
  const type = searchParams.get('type') ?? '';
  const [request, setRequest] = useState(false);
  const [page, setPage] = useState(1);
  const { isTablet, isDesktop } = useMediaRules();
  const recipesBySearchQuery = useSelector(getRecipesBySearchQuery);
  const errorSearch = useSelector(getIsError);
  const totalQuery = recipesBySearchQuery.totalHits;
  const isPending = useSelector(state => state.outerRecipes.isCategoryFetching);

  let perPage;
  if (isDesktop) {
    perPage = 12;
  } else if (isTablet) {
    perPage = 6;
  } else {
    perPage = 6;
  }

  const handleOnSubmit = (query1, type1) => {
    if (query1 === '') {
      toast.error(`You didn't enter anything to search`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setSearchParams(
      new URLSearchParams({
        query: query1,
        type: type1,
      })
    );
    setPage(1);
  };

  const handleChange = (event, value) => {
    setPage(value);
    scrollToTop();
  };

  useEffect(() => {
    if (query === '' || type === '') return;

    if (type === 'title') {
      dispatch(getRecipesByQuery({ query, page, per_page: perPage }));
      setRequest(true);
    } else {
      dispatch(
        getRecipesByIngredient({ ingredient: query, page, per_page: perPage })
      );
      setRequest(true);
    }
  }, [dispatch, type, query, page, perPage]);

  return (
    <SearchCont>
      <Container>
        <Title>Search</Title>
        <SearchBar
          handleOnSubmit={handleOnSubmit}
          startType={type}
          startQuery={query}
        />
        {isPending ? (
          <Loader />
        ) : (
          <ul>
            {recipesBySearchQuery?.meals?.map(el => (
              <CardMeal meal={el} key={el.idMeal} />
            ))}
          </ul>
        )}
        {totalQuery > 0 && (
          <PaginationComp
            count={Math.ceil(totalQuery / perPage)}
            page={page}
            handleChange={handleChange}
          />
        )}
        {!request && (
          <SearchNoFound text={`You haven't searched anything yet`} />
        )}
        {errorSearch && (
          <SearchNoFound text={'Try looking for something else...'} />
        )}
      </Container>
    </SearchCont>
  );
};

export default SearchPage;
