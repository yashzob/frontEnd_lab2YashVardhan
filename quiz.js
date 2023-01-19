function Question(questionText, questionNo){

    this.questionText = questionText;
    this.questionNo = questionNo;
  }
  
  //Declaring All Questions
  const quest1 = new Question("JavaScript supports", 1);
  const quest2 = new Question("Which language is used for styling web pages?", 2);
  const quest3 = new Question("Which is not a JavaScript Framework?", 3);
  const quest4 = new Question("Which is used for Connect To Database?", 4);
  const quest5 = new Question("JavaScript is a", 5);
  
  //To get the answer
  function Answer(ansTxt){
  
    this.ansTxt = ansTxt;
  }
  
  // Creating Question 1
  const answer1Q1 = new Answer("Functions");
  const answer2Q1 = new Answer("XHTML");
  const answer3Q1 = new Answer("CSS");
  const answer4Q1 = new Answer("HTML");
  
  //Creating Question 2
  const answer1Q2 = new Answer("HTML");
  const answer2Q2 = new Answer("JQuery");
  const answer3Q2 = new Answer("CSS");
  const answer4Q2 = new Answer("XML");
  
  //Creating Question 3
  const answer1Q3 = new Answer("Python Script");
  const answer2Q3 = new Answer("JQuery");
  const answer3Q3 = new Answer("Django");
  const answer4Q3 = new Answer("NodeJS");
  
  // Creating Question 4
  const answer1Q4 = new Answer("PHP");
  const answer2Q4 = new Answer("HTML");
  const answer3Q4 = new Answer("JS");
  const answer4Q4 = new Answer("All");
  
  // Creating Question 5
  const answer1Q5 = new Answer("Language");
  const answer2Q5 = new Answer("Programming Language");
  const answer3Q5 = new Answer("Development");
  const answer4Q5 = new Answer("All");
  
  //this function will check wheather selected answer as per given or not
  function QuestionAnswer(questionObj, answerChoicesObj, correctAnsObj){
  
    this.questionObj = questionObj;
    this.answerChoicesObj = answerChoicesObj;
    this.correctAnsObj = correctAnsObj;
  
  
    this.isItACorrectAnswer = function(userSelectedAnswer){
  
      
      if (userSelectedAnswer === correctAnsObj.ansTxt){
        
        return true;
      }else{
        
        return false;
      }
    }
  }
  //this will call line number 51 funtion
  //and save question ans pair in given contant variable
  const q1 = new QuestionAnswer(quest1, [answer1Q1, answer2Q1, answer3Q1, answer4Q1], answer1Q1); 
  const q2 = new QuestionAnswer(quest2, [answer1Q2, answer2Q2, answer3Q2, answer4Q2], answer3Q2);   
  const q3 = new QuestionAnswer(quest3, [answer1Q3, answer2Q3, answer3Q3, answer4Q3], answer3Q3); 
  const q4 = new QuestionAnswer(quest4, [answer1Q4, answer2Q4, answer3Q4, answer4Q4], answer1Q4);  
  const q5 = new QuestionAnswer(quest5, [answer1Q5, answer2Q5, answer3Q5, answer4Q5], answer2Q5);
    
    //qaArray is an array which has following constant as qa1,qa2,qa3,qa4,qa5
  function QuizApplication(qaArray)
  {
    this.qaArray = qaArray;
    this.pageIndex = 0;
    this.score = 0;

    
  
    this.initAndDisplayPage = function()
    {// pageIndex keep the teack of on which page number user is on(very important)
      this.pageIndex = 0;
      this.btnListner();
      this.displayQuizPage();
    }
  //creating and displaying next page is called
    this.initAndDisplayNextPage = function()
    {
      this.pageIndex ++;
      this.btnListner();
      this.displayQuizPage();
    }
  // this will listen for .onClick event(defined in line 121)
    this.btnListner = function()
    {
      const questionAnswerObj = qaArray[this.pageIndex];
      const currentQuizApplicationObj = this;
      for (let index = 0; index < questionAnswerObj.answerChoicesObj.length; index ++)
      {
        let buttonId = "btn" + index; 
        const answerChoiceHtmlButtonElement =  document.getElementById(buttonId);
        answerChoiceHtmlButtonElement.onclick = function(event)
        {
          const currentTarget = event.currentTarget;
          // Correct Answer Check
          // Track / Increment Score [Calcualte Percentage]
          const userSelectedAnswer = currentTarget.children[0].innerHTML;;
          const result = questionAnswerObj.isItACorrectAnswer(userSelectedAnswer);
          if (result)
          {
            //this.score ++;
            currentQuizApplicationObj.incrementScore()
          } 
          // Forward to Next
          currentQuizApplicationObj.nextPage();
        }
      }
    }
  
    this.incrementScore = function()
    {
      this.score ++;
    }
  //if it is last question then diplay the result page else display next page
    this.nextPage = function(){
      if (this.isThisTheLastQuestion()){
        this.displayQuizResult();
      }else{
       this.initAndDisplayNextPage(); 
      }
    }
  
    this.isThisTheLastQuestion = function()
    {
      if (this.pageIndex === this.qaArray.length - 1)
      {
        return true;
      }else{
        return false;
      }
    }
  
    this.displayQuizPage = function()
    {
      this.displayQASection();
      this.displayQuetNum();
    }
  
    this.displayQASection = function()
    {  
      const questionAnswerObj = qaArray[this.pageIndex];
  
      // Setting the question text
      const questionText = questionAnswerObj.questionObj.questionText;
      const questionHtmlElement = document.getElementById("question");
      questionHtmlElement.innerHTML = questionText;
  
      // Setting the answer(s) text
  
      const answerChoicesObj = questionAnswerObj.answerChoicesObj;
      for (let index = 0; index < answerChoicesObj.length; index ++)
      {
        let ansChoiceHtml = "choice" + index;
        const answerObj = answerChoicesObj[index];  
        const answerChoiceHtmlElement = document.getElementById(ansChoiceHtml);
        answerChoiceHtmlElement.innerHTML = answerObj.ansTxt;
      }
    }
  
    this.displayQuetNum = function()
    {
      const questionAnswerObj = qaArray[this.pageIndex];

      const questionNo = this.pageIndex +1;
      const totalNoOfQuestions = qaArray.length;
      let progressText = `Question ${questionNo} of ${totalNoOfQuestions}`;
      const progressHtmlElement = document.getElementById("progress");
      progressHtmlElement.innerHTML = progressText;
    }
  
    this.displayQuizResult = function()
    {
      
      const resultPage = `
        <h1>Quiz Result</h1>
        <h3 id='score'> 
        Your scores ${this.score}. Mark Percentage ${((this.score / this.qaArray.length) * 100)}
        </h3>
        `
      const quizHtmlElement = document.getElementById("quiz");
      quizHtmlElement.innerHTML = resultPage;
    }
  }
  //all question are declare here as an array
  const quizApplication = new QuizApplication(
    [q1, q2, q3, q4, q5]
    
  );
  quizApplication.initAndDisplayPage();
