import { ApiKeys, ErrorFetch, Errors, ResponseApi } from '../components/types';

export default class Api {
  private baseApi: string = 'https://the-one-api.dev/v2';

  private headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${ApiKeys.second}`,
  };

  private errorHandler(text: string, status: string): ErrorFetch {
    const message = status === '429' ? Errors.many : text;
    const error = {
      message: message,
      code: status,
    };
    return error;
  }

  private async getData(url: string): Promise<ResponseApi | ErrorFetch> {
    try {
      const response: Response = await fetch(`${this.baseApi}${url}`, {
        headers: this.headers,
      });
      if (response.status !== 200 && 'statusText' && 'status' in response) {
        return this.errorHandler(response.statusText, `${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error)
        return this.errorHandler(error.message, Errors.err);
      throw new Error('Something bad happened!');
    }
  }

  public search = async (
    term: string,
    limit: string,
    page: string
  ): Promise<ResponseApi | ErrorFetch> => {
    const response: ResponseApi | ErrorFetch = await this.getData(
      `/character?name=/${term}/i&page=${page || '1'}&limit=${limit || '10'}`
    );

    if ('code' in response) {
      return response;
    }

    return this.transformData(response);
  };

  public getItemByID = async (
    id: string
  ): Promise<ResponseApi | ErrorFetch> => {
    const response: ResponseApi | ErrorFetch = await this.getData(
      `/character/${id}`
    );

    if ('code' in response) {
      return response;
    }

    return this.transformData(response);
  };

  private setInfoForField(field: string) {
    return !field || field === 'NaN' ? `no info` : field;
  }

  private transformData(data: ResponseApi): ResponseApi {
    return {
      ...data,
      docs: data.docs.map(
        ({
          _id,
          birth,
          death,
          gender,
          hair,
          height,
          name,
          race,
          realm,
          spouse,
          wikiUrl,
        }) => {
          return {
            _id: _id,
            birth: this.setInfoForField(birth),
            death: this.setInfoForField(death),
            gender: this.setInfoForField(gender),
            hair: this.setInfoForField(hair),
            height: this.setInfoForField(height),
            name: this.setInfoForField(name),
            race: this.setInfoForField(race),
            realm: this.setInfoForField(realm),
            spouse: this.setInfoForField(spouse),
            wikiUrl: this.setInfoForField(wikiUrl),
          };
        }
      ),
    };
  }
}
