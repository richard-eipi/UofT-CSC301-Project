import axios from 'axios';

const endpoint = "https://api-dev.corp.getcentro.com/graphql";

export enum QuestionType {
  SINGLE_SELECTION = 'SINGLE_SELECTION',
  MULTIPLE_SELECTION = 'MULTIPLE_SELECTION',
  SHORT_ANSWER = 'SHORT_ANSWER',
  LONG_ANSWER = 'LONG_ANSWER',
}

export type Question = {
  questionType: QuestionType;
  questionTitle: string;
  selections: Array<string>;
  isRequired: boolean;
};

export async function getSurvey(userId: string): Promise<{surveyId: string | null, questions: Array<Question> | null}> {
  const query = `
    {
      getSurvey(params: {userId: "${userId}"}) {
        surveyId
        questions {
          questionType
          questionTitle
          selections
          isRequired
        }
      }
    }
  `;
  const variables = {};
  const response = await axios.post(
    endpoint,
    { query, variables }
  );
  const surveyId: string = response.data.data.getSurvey.surveyId;
  const questions: Array<Question> = response.data.data.getSurvey.questions;
  return { surveyId: surveyId, questions: questions} ;
}

export async function saveResponse(surveyId: string, userId: string, answers: Array<string>): Promise<string> {
  const query = `
    mutation {
      saveSurveyResponse(params: {surveyId: "${surveyId}", userId: "${userId}", answers: ${JSON.stringify(answers)}}) {
        message
      }
    }
  `;
  const variables = {};
  const response = await axios.post(
    endpoint,
    { query, variables }
  );
  const message: string = response.data.data.saveSurveyResponse.message;
  return message;
}
