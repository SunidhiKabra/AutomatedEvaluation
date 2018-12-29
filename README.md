# AutomatedEvaluation
Every  semester  the  College  of  Computing  and  Informatics  hosts  an  exhibit  of  the Innovative Computing Projects (ICP). These projects are student projects that they have worked  on  during  a  given  semester,  where  the  students  present  posters  and  the evaluators  from  the  industry  and  the  public  evaluate  these  posters.  The  team  that scores  the  highest  average  evaluation  score  gets  a  gift.     This  project  focuses  on creating a mobile app and web portal to enable the evaluation and management of the score and users.  

On the evaluation day, each team will be provided with a QR Code to be placed on their poster, which should be used by the mobile app to identify their team. In addition, when the evaluators register for the event, they are provided with a name badge, and behind the  name  badge  there  will  be  a  QR  Code  that  should  be  used  to  authenticate  the evaluator to the mobile app. 

#Main Roles: The main roles include Admin and Evaluator. Below is a description of the main operations performed by each role: 

-Admin:  this  is  the  administrator  and  should  be  able  to  manage  the  system, perform  CRUD  operations  on  the  evaluation  survey  questions,  perform  CRUD operations  on  the  teams  and  evaluators.  Review  the  submitted  evaluations  and score board. 
-Evaluator: this is the public evaluator that uses the mobile app to login, select a team, submit evaluations, view score board, and view submitted evaluations. 

#Web App: the web app is a portal that is used by the admin to design the evaluation survey questions, manage evaluators, manage teams, and review the submitted evaluations. Below are the descriptions of the features that should be included in the web app: 
Hosting:  The  web  portal  could  be  implemented  in  any  language  chosen  by  the team, however it should be hosted on AWS. 
  All DB accesses should be done through an ORM. 
  The admin portal should only be accessible to admin users. 
  
Roles:  Admin  and  Evaluator.  
  Each  role  should  have  the  access  to  only  the features that enable them to perform their role. 
  
-Evaluation  Survey  Delivery  and  Storage:  The  web  app  provides  all  the information required by the app to conduct the survey, the web app also provides storage  and  data  export  features  required  by  the  admin  to  access  the  survey results.  
-Survey  Design:  The  web  app  should  enable  the  admin  to  add  manage  the survey  and  design  the  survey.  Mainly  focused  on  CRUD  operations  on  survey questions. Each  survey  question  is  simply  composed  of  a  question  text,  and  5  Likert scale  choices  ("Poor",  "Fair",  "Good",  "Very  Good",  “Superior”),  where  Poor has a score of 0 and Superior is 4. 
Should be able to control the order of the questions in the survey. Should be able to update and delete specific questions. Deliver the survey and store evaluator responses. Display and export the survey responses. The  survey  score  for  each  submission  is  simply  the  addition  of  the  answers submitted for each question.  -Evaluation  Survey  Delivery  and  Storage:  The  web  app  provides  all  the information required by the app to conduct the survey, the web app also provides storage  and  data  export  features  required  by  the  admin  to  access  the  survey results. -Other  Requirements:  The  portal  should  also  provide  listing  of  different  users, evaluation survey questions, submitted evaluations, results: You should use DataTables to display and manage all displayed lists of data. Should  be  able  to  review  the  submitted  reviews,  and  create  a  printable version of the summary of surveys submitted for each team. Should be able to create, update, display and delete  evaluators, new teams. The web app will provide the required apis for the mobile app and should use JWT tokens to provide authentication when needed.  of 23

#The mobile App: The mobile app is the component that is going to be used by the evaluator. 
-Framework: The app should be built for both iOS and Android frameworks. 
-Authentication:  The  evaluator  should  be  able  to  authenticate  into  the  app  by scanning the QR Code placed behind their name badge. The password should not be stored in the QR Code, instead consider storing the JWT token in the QR Code. The app should be able to consult with server to verify the scanned QR Code and to make sure that this is a valid authentication token. 
-Team Selection: The evaluator should be able to select the team they would like to  evaluate  from  a  list  of  teams  or  by  scanning  the  QR  Code  placed  on  the team’s poster. The submitted QR Code should be verified. 
-Evaluation Survey Delivery: The evaluator should be able to answer the survey and submit it for the selected team. In  case  the  evaluator  submits  a  survey  for  a  team  they  have  already evaluated,  the  new  submission  should  overwrite  their  previously  submitted submission for that team. 
-Evaluation  Review: The  evaluator  should  be  able  to  review  the  evaluation submitted so far, and read the details of their submission. -Score  Board:  Is  a  list  of  teams  sorted  in  descending  order  based  on  their average  score.  Using  the  score  board  the  evaluator  is  able  to  view  how  the teams are performing.
