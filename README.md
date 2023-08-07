# MicroSurvey Iframe Pass Through

- Demo video: https://youtu.be/w1XqjQ7l9vc
- Architecture: https://wolfbeacon.atlassian.net/wiki/spaces/CW/pages/2997944397/MicroSurvey+Architecture
- Backend-end work is done separately on this repo: https://github.com/cheapreats/ce

## Description
MicroSurvey Iframe Pass Through is an extension of an existing web application designed by our partner Ralph. The existing application, Centro, is a b-to-c software facing individuals and households who want to efficiently track their personal or household finances to make more informed life decisions and plans. It allows its users to report their financial activities and provides visualized analytics to help them make progress toward financial goals.

Our product is a web-based tool that provides services to developers who want to quickly create and deploy surveys to any website by embedding an iframe code without having to worry about writing duplicate code for different platforms. The user will be authenticated in the pop-up window and presented with the right survey. One user from each group will submit the survey on behalf of the whole group. By making the process of embedding surveys on websites less cumbersome, developers could collect users' data more efficiently.

## Key Features
There are two type of users: survey providers (developers) and survey takers (users of their application).

* Survey providers can provide surveys to survey takers. They will use our JSON RPC API to accomplish the following tasks by directly interacting with our survey database.
  1. Survey providers can create surveys that contain four different types of questions: single (dropdown) selection, multiple choice selection, short answer, and long answer.
  2. Survey providers can assign surveys to groups of existing users that are registered on their social budgeting application.
  3. Survey providers can view each user's answers after the user (or someone else from the user's group) submits a survey.

* Survey takers can take the survey on both the mobile app and the website version of the existing application.
  1. Survey takers will see a survey pop-up when they log in if their group has incomplete surveys.
  2. Survey takers can use the survey interface we provided to answer questions of the survey.
  3. Survey answers can submit a completed survey on behalf of their group, and the response will be saved to our database.

## User Instructions

### For developers (create a survey and assign survey to users):
1. Open up Postman, go to your workspace, open any collection or create a new collection, and create a new request.
2. Switch to POST and enter https://survey-api-dev.corp.getcentro.com/jsonrpc as the URL of the API server.
3. In the "Headers" tab, add the following key-value pair:
      - Content-Type: application/json
4. In the "Body" tab, select the "raw" option and make sure the request format is "JSON".
5. Enter the JSON-RPC request object in the request body and click the "Send" button to make the API request:
      - Here is an example for creating a survey:
          ```
          {
            "jsonrpc": "2.0",
            "method": "createSurveyHandler",
            "params": {"questions": [{
                          "questionType": "SHORT_ANSWER", 
                          "questionTitle": "Q1 short answer", 
                          "selections": [],
                          "required": true
                          }, {
                          "questionType": "SINGLE_SELECTION", 
                          "questionTitle": "Q2 single selection", 
                          "selections": ['A', 'B'],
                          "required": true
                          }
                  ]},
            "id": 1
          }
          ```
        The response will be something like this:
          ```
          {
              "jsonrpc": "2.0",
              "id": 1,
              "result": {
                  "surveyId": "survey_0ClrwpjUi5ZsD47-NaSFW"
              }
          }
          ```
      - Here is an example for assigning this survey to a 2 groups of users, a group of 2 and a group of 1:
          ```
          {
            "jsonrpc": "2.0",
            "method": "assignSurveyToUsersHandler",
            "params": {"surveyId": "survey_0ClrwpjUi5ZsD47", "users": [["user_1234", "user_5678"], ['user_abcd']]},
            "id": 1
          }
          ```
        The response will be something like this:
          ```
          {
          "jsonrpc": "2.0",
              "id": 1,
              "result": {
                  "message": "Success"
              }
          }
          ```

### For users (take a survey and submit a survey):

1. The user should click on the URL link to the iframe holder, which acts as our partner's existing application: https://zzqjames.github.io/survey-holder/
2. The user will be directed to a landing page with several user IDs, such as user 1, user 2, and user 3.
4. The user needs to click on the user ID that corresponds to him/her. 
5. He/she will be directed to the survey page, where the user can see a set of questions. There are different question types in the survey, the user can answer the questions based on his/her preferences by filling in the questions or selecting the appropriate options. 
6. The survey will start with the first question (Q1) and proceed to subsequent questions using the navigation bar. For example, the user can press the Next and the Previous buttons to move between the questions. As well, the user can use Q1 and Q2 navigation bars to jump directly to specific questions.
7. Once the user has completed his/her survey, he/she can press on submit button to submit their answer for professionals to review and analyze.

## Development requirements

### Survey app development
* Clone the MicroSurvey and and IframeHolder repositories. Make sure you place them in the same directory:
```
git clone https://github.com/zzqjames/csc301-frontend-shared-repo.git microSurvey
```
* Install Node.js/NPM here https://nodejs.org/en/
* Open MicroSurvey using text editor VScode and install the node modules:
```
cd microSurvey/surveyApp

npm install --save-dev @nrwl/workspace
```
* Run the react application:
```
npm start
```
* Go to iframeHolder and open <survey-website.html> in browser

### Webview developer's guide

- Import the necessary dependencies using the appropriate package managers.
- Copy the WebView component code into the destination project.
- Customize the button and trigger the opening of the WebView component by clicking.
- Set the user ID by replacing the hard-coded user ID in the 'sendMessage' function with the user ID of the current user.

### Back-end API development
* Clone the CheaprEats repository:
```
git clone https://github.com/cheapreats/ce ce
```
* Install Nx globally and install node modules:
```
cd ce

sudo npm install -g nx

npm install https://github.com/cheapreats/ce
```
* Set the URL of the MongoDB database that you are going to use in the .env file of the sba-survey-api package.
```
cd packages/sba-survey-api

vi .env
```
* Run the JSON-RPC API server:
```
nx serve sba-survey-api
```
For GraphQL development, follow the exact same flow but go to the sba-api package.
