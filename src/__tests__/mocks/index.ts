import { AppContext, Character, ResponseApi } from '../../components/types';

export const characterTransform: Character = {
  _id: '5cd99d4bde30eff6ebccfea0',
  birth: 'Before the the Shaping of Arda',
  death: 'January 253019 ,Battle of the Peak immortal',
  gender: 'Male',
  hair: 'Grey, later white',
  height: 'no info',
  name: 'Gandalf',
  race: 'Maiar',
  realm: 'no info',
  spouse: 'no info',
  wikiUrl: 'http://lotr.wikia.com//wiki/Gandalf',
};

export const data: ResponseApi = {
  docs: [
    {
      _id: '5cd99d4bde30eff6ebccfea0',
      height: '',
      race: 'Maiar',
      gender: 'Male',
      birth: 'Before the the Shaping of Arda',
      spouse: '',
      death: 'January 253019 ,Battle of the Peak immortal',
      realm: '',
      hair: 'Grey, later white',
      name: 'Gandalf',
      wikiUrl: 'http://lotr.wikia.com//wiki/Gandalf',
    },
    {
      _id: '5cd99d4bde30eff6ebccfd8a',
      height: '',
      race: 'Human',
      gender: 'Male',
      birth: 'Late ,First Age',
      spouse: '',
      death: 'Late First Age',
      realm: '',
      hair: '',
      name: 'Lorgan',
      wikiUrl: 'http://lotr.wikia.com//wiki/Lorgan',
    },
    {
      _id: '5cdbdecb6dc0baeae48cfa49',
      death: 'Fate officially unknown',
      birth: 'NaN',
      hair: 'NaN',
      realm: 'NaN',
      height: 'Short',
      spouse: 'NaN',
      gender: 'Male',
      name: 'Salgant',
      race: 'Elves',
      wikiUrl: '',
    },
  ],
  total: 3,
  limit: 10,
  page: 1,
  pages: 1,
};

export const dataWithTwoCharacter: ResponseApi = {
  docs: [
    {
      _id: '5cd99d4bde30eff6ebccfea0',
      height: '',
      race: 'Maiar',
      gender: 'Male',
      birth: 'Before the the Shaping of Arda',
      spouse: '',
      death: 'January 253019 ,Battle of the Peak immortal',
      realm: '',
      hair: 'Grey, later white',
      name: 'Gandalf',
      wikiUrl: 'http://lotr.wikia.com//wiki/Gandalf',
    },
    {
      _id: '5cd99d4bde30eff6ebccfd8a',
      height: '',
      race: 'Human',
      gender: 'Male',
      birth: 'Late ,First Age',
      spouse: '',
      death: 'Late First Age',
      realm: '',
      hair: '',
      name: 'Lorgan',
      wikiUrl: 'http://lotr.wikia.com//wiki/Lorgan',
    },
  ],
  total: 3,
  limit: 2,
  page: 1,
  pages: 2,
};

export const dataEmpty: ResponseApi = {
  docs: [],
  total: 0,
  limit: 10,
  page: 1,
  pages: 1,
};

export const dataFirstPage: ResponseApi = {
  docs: [
    {
      _id: '5cd99d4bde30eff6ebccfea0',
      height: '',
      race: 'Maiar',
      gender: 'Male',
      birth: 'Before the the Shaping of Arda',
      spouse: '',
      death: 'January 253019 ,Battle of the Peak immortal',
      realm: '',
      hair: 'Grey, later white',
      name: 'Gandalf',
      wikiUrl: 'http://lotr.wikia.com//wiki/Gandalf',
    },
  ],
  total: 3,
  limit: 1,
  page: 1,
  pages: 3,
};

export const dataByID: ResponseApi = {
  docs: [
    {
      _id: '5cd99d4bde30eff6ebccfd8a',
      height: '',
      race: 'Human',
      gender: 'Male',
      birth: 'Late ,First Age',
      spouse: '',
      death: 'Late First Age',
      realm: '',
      hair: '',
      name: 'Lorgan',
      wikiUrl: 'http://lotr.wikia.com//wiki/Lorgan',
    },
  ],
  total: 1,
  limit: 10,
  page: 1,
  pages: 1,
};

export const dataTransform: ResponseApi = {
  docs: [
    characterTransform,
    {
      _id: '5cd99d4bde30eff6ebccfd8a',
      birth: 'Late ,First Age',
      death: 'Late First Age',
      gender: 'Male',
      hair: 'no info',
      height: 'no info',
      name: 'Lorgan',
      race: 'Human',
      realm: 'no info',
      spouse: 'no info',
      wikiUrl: 'http://lotr.wikia.com//wiki/Lorgan',
    },
    {
      _id: '5cdbdecb6dc0baeae48cfa49',
      birth: 'no info',
      death: 'Fate officially unknown',
      gender: 'Male',
      hair: 'no info',
      height: 'Short',
      name: 'Salgant',
      race: 'Elves',
      realm: 'no info',
      spouse: 'no info',
      wikiUrl: 'no info',
    },
  ],
  total: 3,
  limit: 10,
  page: 1,
  pages: 1,
};

export const context: AppContext = {
  term: '',
  data: data.docs,
  itemData: [characterTransform],
  id: '',
  limit: '',
  page: '',
  lastPage: '',
  loading: false,
  loadingItem: false,
  messageError: '',
  setTerm: (): void => {},
  setLimit: (): void => {},
  setPage: (): void => {},
  setId: (): void => {},
  searchData: (): void => {},
};

export const contextEmptyData: AppContext = {
  ...context,
  data: [],
  itemData: [],
};
