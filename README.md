# MicroSurvey Iframe Pass Through

Team 5: InvictusCoding

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

For user instructions and developer's guide, please visit the surveyApp package and the webview package.
