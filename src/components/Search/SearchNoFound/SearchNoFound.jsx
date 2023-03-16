import searchMob1 from '../../../images/bg/bgSearch/bg_search_mob@1x.png';
import searchMob2 from '../../../images/bg/bgSearch/bg_search_mob@2x.png';
import searchTablet1 from '../../../images/bg/bgSearch/bg_search_tablet@1x.png';
import searchTablet2 from '../../../images/bg/bgSearch/bg_search_tablet@2x.png';
import searchDesktop1 from '../../../images/bg/bgSearch/bg_search_desktop@1x.png';
import searchDesktop2 from '../../../images/bg/bgSearch/bg_search_desktop@2x.png';
import { SearchCont, TextSearch, ImgContSearch } from './SearchNoFound.styled';

export const SearchNoFound = ({text}) => {
  return (
    <SearchCont>
      <ImgContSearch>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`${searchDesktop1}, ${searchDesktop2} 2x`}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${searchTablet1}, ${searchTablet2} 2x`}
          />
          <img
            src={searchMob1}
            srcSet={`${searchMob1}, ${searchMob2} 2x`}
            alt="Ошибка"
          />
        </picture>
      </ImgContSearch>
      <TextSearch>{text}</TextSearch>
    </SearchCont>
  );
};
