import API from './api.ts';
import { ICategories, IQuestions } from './types.ts';
import { getErrorMessageByResponseCode } from './utils.ts';

export const getCategories = async <T extends string = string>(): Promise<
  ICategories<T>
> => {
  try {
    const { data } = await API.get('api_category.php');
    if ('trivia_categories' in data) {
      return data as ICategories<T>;
    } else {
      throw new Error("API response doesn't contain trivia_categories");
    }
  } catch (error) {
    throw error;
  }
};

export const getQuestions = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<IQuestions> => {
  try {
    const { data }: { data: IQuestions } = await API.get(
      `api.php?amount=10&category=${categoryId}`,
    );
    if (data.response_code) {
      throw new Error(getErrorMessageByResponseCode(data.response_code));
    }
    if ('results' in data) {
      return data;
    } else {
      throw new Error("API response doesn't contain results");
    }
  } catch (error) {
    throw error;
  }
};
