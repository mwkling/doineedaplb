/**
 * Created by mkling on 9/29/2015.
 */

// This makes it work in IE8
// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(callback /*, initialValue*/) {
        'use strict';
        if (this == null) {
            throw new TypeError('Array.prototype.reduce called on null or undefined');
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        var t = Object(this), len = t.length >>> 0, k = 0, value;
        if (arguments.length == 2) {
            value = arguments[1];
        } else {
            while (k < len && !(k in t)) {
                k++;
            }
            if (k >= len) {
                throw new TypeError('Reduce of empty array with no initial value');
            }
            value = t[k++];
        }
        for (; k < len; k++) {
            if (k in t) {
                value = callback(value, t[k], k, t);
            }
        }
        return value;
    };
}

$(document).ready(function(){
    var questionContainer = $(".questionContainer");
    var notice = $("#notice");


    // Divided up in order of question choices
    var scoring = {
        acr1:[10,10,5,5,10,10, 20,20,  10,10,10, 0,5,10,   10,10,10,  10,5,0,    0,5,10,   0,10,10],
        acr2:[10,10,5,5,10,10, 20,20,  10,10,10, 0,5,10,   7,7,10,    10,5,0,    10,10,10, 0,10,10],
        fast:[10,10,5,5,10,10, 20,20,  10,10,10, 0,5,10,   0,5,10,    10,10,5,   7,10,10,  0,10,10],
        spot:[0,5,10,10,5,0,  -20,20,  10,0,-10, 5,5,10,   10,10,10,  10,10,10,  5,5,10,   0,10,10],
        del1:[5,10,10,10,5,0,  20,20,  10,0,-10, 10,10,10, 0,5,10,    10,5,0,    5,5,10,   0,10,10],
        del2:[5,10,10,10,5,0,  20,20,  10,0,-10, 10,10,10, 0,5,10,    10,5,-5,   5,5,10,   10,10,10]
    };

    // These are used to provide detailed results to the user
    // 0 - match. 1 - no match. else: - neither.
    var matchMessages = {
        acr1:[{}, {}, {},
            {m:"May be unnecessary if you will always be in cell reception", s:1},
            {m:"", s:2},
            {m:"Great for extended trips with 5 year battery life",s:0},

            {m:"Complete worldwide coverage includes where you are traveling", s:0},
            {m:"", s:2},

            {m:"", s:2},
            {m:"", s:2},
            {m:"No monthly data fee.", s:0},

            {m:"Does not feature two way messaging", s:1},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Extremely lightweight", s:0},
            {m:"", s:2},
            {m:"", s:2},

            {m:"", s:2},
            {m:"", s:2},
            {m:"Cost is over $200", s:1},

            {m:"Does not float: consider ACR ResQLink+", s:1},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Does not feature navigation or tracking features", s:1},
            {m:"", s:2},
            {m:"", s:2}
        ],

        acr2:[{}, {}, {},
            {m:"May be unnecessary if you will always be in cell reception", s:1},
            {m:"", s:2},
            {m:"Great for extended trips with 5 year battery life",s:0},

            {m:"Complete worldwide coverage includes where you are traveling", s:0},
            {m:"", s:2},

            {m:"", s:2},
            {m:"", s:2},
            {m:"No monthly data fee", s:0},

            {m:"Does not feature two way messaging", s:1},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Lightweight (but slightly heavier than ACR ResQLink)", s:0},
            {m:"", s:2},
            {m:"", s:2},

            {m:"", s:2},
            {m:"", s:2},
            {m:"Cost is over $200", s:1},

            {m:"Device is wrapped in a floating case", s:0},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Does not feature navigation or tracking features", s:1},
            {m:"", s:2},
            {m:"", s:2}
        ],

        fast:[{}, {}, {},
            {m:"May be unnecessary if you will always be in cell reception", s:1},
            {m:"", s:2},
            {m:"Great for extended trips with 6 year battery life",s:0},

            {m:"Complete worldwide coverage includes where you are traveling", s:0},
            {m:"", s:2},

            {m:"", s:2},
            {m:"", s:2},
            {m:"No monthly data fee", s:0},

            {m:"Does not feature two way messaging", s:1},
            {m:"", s:2},
            {m:"", s:2},

            {m:"At 8oz this is about twice as heavy as ACR ResQLink", s:1},
            {m:"", s:2},
            {m:"", s:2},

            {m:"", s:2},
            {m:"", s:2},
            {m:"Cost is less than $200", s:0},

            {m:"", s:2},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Does not feature navigation or tracking features", s:1},
            {m:"", s:2},
            {m:"", s:2}
        ],

        spot:[{}, {}, {},
            {m:"", s:2},
            {m:"", s:2},
            {m:"Long but limited battery life (150 hours) is not ideal for extended trips",s:1},

            // TODO: link to map?
            {m:"May not have service where you are traveling!", s:1},
            {m:"", s:2},

            {m:"Requires a monthly data fee", s:0},
            {m:"", s:2},
            {m:"Requires a monthly data fee", s:1},

            {m:"Only able to send messages one way", s:1},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Extremely lightweight", s:0},
            {m:"", s:2},
            {m:"", s:2},

            {m:"", s:2},
            {m:"", s:2},
            {m:"Cost is less than $200 (does not include subscription cost)", s:0},

            {m:"", s:2},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Does not feature navigation or tracking features", s:1},
            {m:"", s:2},
            {m:"", s:2}
        ],

        del1:[{}, {}, {},
            {m:"", s:2},
            {m:"", s:2},
            {m:"Long but limited battery life (100 hours) is not ideal for extended trips",s:1},

            {m:"Complete worldwide coverage includes where you are traveling.", s:0},
            {m:"", s:2},

            {m:"Requires a monthly data fee", s:0},
            {m:"", s:2},
            {m:"Requires a monthly data fee", s:1},

            {m:"Full two-way messaging ability", s:0},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Heavier option at 7oz", s:1},
            {m:"", s:2},
            {m:"", s:2},

            {m:"", s:2},
            {m:"", s:2},
            {m:"Cost is close to $300 (not including subscription)", s:1},

            {m:"", s:2},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Does not feature navigation or tracking features", s:1},
            {m:"", s:2},
            {m:"", s:2}
        ],

        del2:[{}, {}, {},
            {m:"", s:2},
            {m:"", s:2},
            {m:"Long but limited battery life (100 hours) not ideal for extended trips",s:1},

            {m:"Complete worldwide coverage includes where you are traveling", s:0},
            {m:"", s:2},

            {m:"Requires a monthly data fee", s:0},
            {m:"", s:2},
            {m:"Requires a monthly data fee", s:1},

            {m:"Full two-way messaging ability", s:0},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Heavier option at 7oz", s:1},
            {m:"", s:2},
            {m:"", s:2},

            {m:"", s:2},
            {m:"", s:2},
            {m:"Most expensive choice, over $350 (not including subscription)", s:1},

            {m:"", s:2},
            {m:"", s:2},
            {m:"", s:2},

            {m:"Features advanced navigation and GPS tracking", s:0},
            {m:"", s:2},
            {m:"", s:2}
        ],

    };


    var makeFadeTransition = function(first, second){
        // Fade out first class, hide it, show second, fade it in (a little later)
        first.removeClass("in");
        first.addClass("hidden");
        second.removeClass("hidden");
        setTimeout(function (){
            second.addClass("in");
        }, 150);
    };

    $("#score-explain").on('click', function(){
        ga('pageViewTracker.send', 'pageview', '/scoredetails');
    });
    // Start quiz with the start button
    $("#start").on('click', function(){
        ga('pageViewTracker.send', 'pageview', '/quizstart');
        makeFadeTransition($(this).parents(".jumbotron"), $("#quiz"));
    });
    // Or, restart it from results
    $(".result").on('click', '.again', function(){
        ga('pageViewTracker.send', 'pageview', '/quizagain');
        makeFadeTransition($(this).parents(".result"), $("#firstQuestion"));
    });
    questionContainer.on('click', '.previous', function (){
        var question = $(this).parents(".questionContainer");
        makeFadeTransition(question, question.prev());
    });

    // When we click next: validate they've made choice
    // Possibly jump to ELT/EPIRB end for first question
    // Transition to next question
    questionContainer.on('click', '.next', function(){
        var question = $(this).parents(".questionContainer");

        // Show alert if they didn't pick something
        var checked = question.find("input[type=radio]:checked");
        if(checked == undefined || checked.length == 0){
            // TODO: make slide down?
            notice.removeClass("hidden");

            return false;
        }
        notice.addClass("hidden");

        //Send to google analytics - they got past a question!  hooray
        //so the name recorded will mean they got to the *next* question
        ga('pageViewTracker.send', 'pageview', '/' + question.data('name'));

        // Special quiz short circuiting for the first question: ELT or EPIRB
        if(question.prop("id") == "firstQuestion"){
            var q1Answer = checked.val();
            if(q1Answer == "choice2") {
                makeFadeTransition(question, $("#result-epirb"));
                return false;
            } else if(q1Answer == "choice3") {
                makeFadeTransition(question, $("#result-elt"));
                return false;
            }
        }
        makeFadeTransition(question, question.next());
    });

    questionContainer.on('click', '.finish', function (){
        // hooray - they finished the quiz.  tell google analytics
        ga('pageViewTracker.send', 'pageview', '/quizend');

        // scores reset to zero when click finish
        var scores = {
            acr1:{s: 0, matched:[], unmatched:[]},
            acr2:{s: 0, matched:[], unmatched:[]},
            fast:{s: 0, matched:[], unmatched:[]},
            spot:{s: 0, matched:[], unmatched:[]},
            del1:{s: 0, matched:[], unmatched:[]},
            del2:{s: 0, matched:[], unmatched:[]}
        };

        var q2 =  +$("input[name=q2]:checked").val();
        var q3 =  +$("input[name=q3]:checked").val();
        var q4 =  +$("input[name=q4]:checked").val();
        var q5a = +$("input[name=q5a]:checked").val();
        var q5b = +$("input[name=q5b]:checked").val();
        var q5c = +$("input[name=q5c]:checked").val();
        var q5d = +$("input[name=q5d]:checked").val();
        var q5e = +$("input[name=q5e]:checked").val();
        var q5f = +$("input[name=q5f]:checked").val();

        $.ajax({
          type: "POST",
          url: "/submissions",
          data: { csv_response: q2  + "," + q3  + "," + q4 + "," + 
                                q5a + "," + q5b + "," + q5c + "," + 
                                q5d + "," + q5e + "," + q5f }
        });


        // First, determine how strongly we think the user should get a PLB, based on first two questions.
        var recommendationHeadline = "Based on your answers, I would strongly recommend a PLB.  View your best 3 matches below:";
        if(q2 == "2" && (q3 == "4" || q3 == "5")) {
            // large group, but remote
            recommendationHeadline = "Based on your answers, I would consider a PLB.  View your best 3 matches below:"
        } else if((q2 == "0" || q2 == "1") && q3 == "3") {
            // small group, but not remote
            recommendationHeadline = "Based on your answers, I would consider a PLB.  View your best 3 matches below:"
        } else if(q2 == "2" && q3 == "3") {
            recommendationHeadline = "Based on your answers, a PLB is <em>probably not</em> worth the expense.  You can still view your best 3 matches below:"
        }
        $("#recommendationHeadline").html(recommendationHeadline);
        // Next, the complicated bit.  Score the different product choices based on other answers.
        // Loop through devices, lookup corresponding score in score array based on question data
        // Add lookup value to scores so at the end, we have the final scores in scores
        // Sort the recommendedBox elements based on their data-name attributes, detach/reattach
        // Maybe: hide the worst ones?
        // Maybe: cap scores above/below 0/100
        for (var product in scores){
            // Add to scores
            scores[product].s = scores[product].s + scoring[product][q2];
            scores[product].s = scores[product].s + scoring[product][q3];
            scores[product].s = scores[product].s + scoring[product][q4];
            scores[product].s = scores[product].s + scoring[product][q5a];
            scores[product].s = scores[product].s + scoring[product][q5b];
            scores[product].s = scores[product].s + scoring[product][q5c];
            scores[product].s = scores[product].s + scoring[product][q5d];
            scores[product].s = scores[product].s + scoring[product][q5e];
            scores[product].s = scores[product].s + scoring[product][q5f];

            var addMessage = function(answer) {
                var msg = matchMessages[product][answer];
                if(msg.s == 0){
                    scores[product].matched.push(msg.m)
                } else if (msg.s == 1){
                    scores[product].unmatched.push(msg.m)
                }
            };
            addMessage(q3);
            addMessage(q4);
            addMessage(q5a);
            addMessage(q5b);
            addMessage(q5c);
            addMessage(q5d);
            addMessage(q5e);
            addMessage(q5f);
        };

        var makeLIHTML = function(msgs){
          return msgs.reduce(function(msg, entry){
              return msg + "<li>" + entry + "</li>";
          }, "");
        };
        // Inserting the resulting scores into the spans
        var results = $("#result-plb").children(".recommendedBox");
        results.each(function(i){
            var name = $(this).data("name");
            // Don't display above/below 100, but still sort results by them
            var insertScore = Math.max(Math.min(scores[name].s, 100), 0);
            $(this).find(".match").html(insertScore);
            $(this).find(".deviceMatchList").html(makeLIHTML(scores[name].matched));
            $(this).find(".deviceUnmatchList").html(makeLIHTML(scores[name].unmatched));
        });

        // Sorting the resulting output descending based on score
        results.sort(function(a, b){
            var name1 = $(a).data("name");
            var name2 = $(b).data("name");
            if(scores[name1].s < scores[name2].s){
                return 1;
            }
            if(scores[name1].s > scores[name2].s){
                return -1;
            }
            return 0;
        });
        results.detach().appendTo($("#result-plb"));

        // Only display top 3 matches
        results.each(function (i){
           if(i>2){
               $(this).addClass("hidden");
           } else {
               $(this).removeClass("hidden");
           }
        });

        $("#affiliate").detach().appendTo($("#result-plb"));
        $("#affiliate").removeClass("hidden");

        makeFadeTransition($(this).parents(".questionContainer"), $("#result-plb"));
    });
});
