    $("#start").on('click',function(){
    $("#start").remove();
    game.loadQuestion();
    })
    $(document).on('click','.answer-button',function(e){
   game.clicked(e);
    })
    $(document).on("click","#reset",function(){
    game.reset();
    })
    var questions = [{
    question: "What was the first full length CGI movie?",
    answers:["A Bug's Life" , "Monsters Inc." , "Toy Story", "The Lion King"],
    correctAnswer: "Toy Story",
    }, {
    question: 'Finish this line from the Fresh Prince of Bel-Air theme song: "I Whistled  for a cab and when it came near, the license plate said.."',
    answers:["Dice", "Mirror", "Fresh", "Cab"],
    correctAnswer: "Fresh",
    }, {
    question: "Which NBA team won the most titles in the 90s?",
    answers:["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls"],
    correctAnswer: "Chicago Bulls",
    }, {
    question: 'Which group released the hit song, "Smells like Teen Spirit"',
    answers:["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
    correctAnswer: "Nirvana",
    }, {
    question: "What is my favorite soccer team?",
    answers:["Real Madirir", "Barcelona", "Man United", "AC Milan"],
    correctAnswer: "Barcelona",
    }, {
    question: "What is my favorite Football team?",
    answers:["Philadelphia Eagles", "Seattle Seahawks", "Los Angeles Rams", "new england patriots"],
    correctAnswer: "Seattle Seahawks",
    }, {
    question: "What was Dough's best friend's name",
    answers:["Skeeter", "Mark", "Zach", "Cody"],
    correctAnswer: "Skeeter",
    }, {
    question: "Which of these is NOT a name of one of the Spice Girls?",
    answers:["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
    correctAnswer: "Fred Spice",
    }];
 var game = {
     questions:questions,
     currentQuestion:0,
     counter:30,
     correct:0,
     incorrect:0,
     unanswered:0,
     countdown: function(){
     game.counter--;
     $("#counter").html(game.counter);
     if(game.counter<=0){
     console.log("TIME UP!");
     game.timeUp();
      }  
     },
     loadQuestion: function(){
     timer = setInterval(game.countdown,1000);
     $('#subwrapper').html("<h2>Time Remaining<span id='counter'> 30</span> Seconds</h2>");
     $('#subwrapper').append('<h2>'+ questions[game.currentQuestion].question+'</h2>');
     for(var i=0; i < questions[game.currentQuestion].answers.length; i++){ 
     $('#subwrapper').append('<button class="answer-button" id="button-'+i+' " data-name= "'+ questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>')
      }
     },
     nextQuestion: function(){
     game.counter= 30;
     $("#counter").html(game.counter);
     game.currentQuestion++;
     game.loadQuestion();
     },
     timeUp: function(){
     clearInterval(timer);
     game.unanswered++;
     $("#subwrapper").html("<h2>Time is Up!</h2>");
     $("#subwrapper").append("<h3>The correct answer was:"+questions[this.currentQuestion].correctAnswer+"</h3>");
     if(game.currentQuestion==questions.length-1){
     setTimeout(game.results,3*1000);
     } else {
     setTimeout(game.nextQuestion,3*1000);
     }
     },
     results: function(){
     clearInterval(timer);
     $("#subwrapper").html("<h2>All DONE!<h2>");
     $("#subwrapper").append("<h3>Correct: "+ game.correct+"</h3>");
     $("#subwrapper").append("<h3>Incorrect: "+ game.incorrect+"</h3>");
     $("#subwrapper").append("<h3>Unanswered: "+ game.unanswered+"</h3>");
     $("#subwrapper").append("<button id='reset'>RESET</button>");
     },
     clicked: function(e){
     clearInterval(timer);
     if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
      game.answeredCorrectly();
     } else {
      game.answeredIncorrectly();
            }
     },
     answeredCorrectly: function(){
     console.log("Correct!");
     clearInterval(timer);
     game.correct++;
     $("#subwrapper").html("<h2>Right!</h2>");
     if(game.currentQuestion==questions.length-1){
     setTimeout(game.results,3*1000);
     } else {
     setTimeout(game.nextQuestion,3*1000);
         }
     },
     answeredIncorrectly: function(){
     console.log("Wrong!");
     clearInterval(timer);
     game.incorrect++;
     $("#subwrapper").html("<h2>Wrong!</h2>");
     $("#subwrapper").attr("<h3>The correct answer was:"+questions[this.currentQuestion].correctAnswer+"</h3>");
     console.log(questions[this.currentQuestion].image);
     if(game.currentQuestion==questions.length-1){
     setTimeout(game.results,3*1000);
     } else {
     setTimeout(game.nextQuestion,3*1000);
         }
     },
     reset: function(){
     game.currentQuestion = 0;
     game.counter = 0;
     game.correct = 0;
     game.incorrect = 0;
     game.unanswered = 0;
     game.loadQuestion();
     }
 }