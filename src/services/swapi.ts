import { Person, ResponseApi, TransformPerson } from '../components/types';

export default class Swapi {
  private baseApi: string = 'https://swapi.dev/api';
  private baseImageUrl: string =
    'https://starwars-visualguide.com/assets/img/characters/';

  private getId(url: string): string {
    const idRegExp: RegExp = /\/([0-9]*)\/$/;
    const matches: RegExpMatchArray | null = url.match(idRegExp);
    const id: string = matches ? matches[1] : '';
    return id;
  }

  private transform(person: Person): TransformPerson {
    const { name, birth_year, gender, eye_color, url } = person;
    const id: string = this.getId(url);
    return {
      id: id,
      name: name,
      birthYear: birth_year,
      gender: gender,
      eyeColor: eye_color,
      img: `${this.baseImageUrl}${id}.jpg`,
    };
  }

  private async getData(url: string): Promise<ResponseApi> {
    const response: Response = await fetch(`${this.baseApi}${url}`);

    if (!response.ok) {
      throw new Error(
        `Could not get data on request ${url}` + `, status ${response.status}`
      );
    }
    return response.json();
  }

  public search = async (term: string): Promise<TransformPerson[]> => {
    const response: ResponseApi = await this.getData(
      `/people/?search=${term}&page=1`
    );
    return response.results.map(
      (person: Person): TransformPerson => this.transform(person)
    );
  };
}
