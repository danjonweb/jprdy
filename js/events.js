$('#content').on('click','.question',function(){
	var qid = this.getAttribute('id');
	var q = getQuestionWithID(QUESTIONS,qid);
	var qElement = this;
    var questionValue = parseInt(q.value);
    
    $('#question').html('<h2>' + q.topic + ' for ' + q.value + '</h2><div id="question-inner">' + q.text + q.options + '</div>' + '<form class="pure-form"><input type="text" id="question-response" autocomplete="off">\n<button id="question-submit" class="pure-button pure-button-primary" qid="' + qid + '">OK</button><div id="answer">Correct response: ' + q.answer + '</div></form>');
    $('#fade').show();
    $('#question-outer').show();
    $('#question-response').focus();
    
    var outnode = document.getElementById("question");
    AMprocessNode(outnode);
    
    $('#question-response').keypress(function(e){
        if (e.which == 13 ) {
            // Enter key = keycode 13
            $('#question-submit').click()
            return false;
        }
    });
    
    $('#question-submit').click(function(e) {
    	// Exit if disabled
        if ($(this).hasClass('pure-button-disabled') == false) {
            var response = document.getElementById('question-response').value;
            if (response.toLowerCase() == q.answer.toLowerCase()) {
                $('#question').animate({backgroundColor: '#4CD964'}, 200);
                TEAMS[currentTeam].score = parseInt(TEAMS[currentTeam].score) + questionValue;
            } else {
                $('#question').animate({backgroundColor: '#FF2D55'}, 200);
                $('#answer').css('display', 'inline-block');
            }
        
            $(this).addClass('pure-button-disabled');
            $('#question-response').attr('disabled', 'disabled');
        
            $('#question').click(function(e) {
                $(qElement).removeClass('question');
                $(qElement).addClass('question-disabled');
                $(qElement).off();
                $(this).off();
    
                currentTeam++;
                if (currentTeam >= TEAMS.length) {
                    currentTeam = 0;
                }
                showTeams();
                $('#fade').fadeOut('fast');
                $('#question-outer').fadeOut('fast', function() {
                    $('#question').css('background-color', 'white');
                })
            });
        }
        return false;
    });
});

$('#level-select').change(function(){
    var valueSelected = this.value;
    if (valueSelected == '1') {
        valueSelected = null;
    }
    window.location.href = updateQueryString('level', valueSelected);
});

$('#teams-edit').on('click',function(){
    showTeams(true);
    return false;
});

$('#teams').on('click','#team-add',function(){
	var Team = {};
    Team.name = 'New Team';
    Team.color = 25;
    Team.score = '0';
    TEAMS.push(Team);
    
	showTeams(true);
	
    return false;
});
    
$('#teams').on('click','#team-done',function(){
	TEAMS = [];
	var nodes = document.querySelectorAll('#teams input[type="text"]');
    for (var i = 0; i < nodes.length; i++) {
    	var Team = {};
    	Team.name = nodes[i].value;
    	Team.color = nodes[i].previousSibling.previousSibling.selectedIndex;
    	//console.log(nodes[i].previousSibling.previousSibling.selectedIndex);
    	Team.score = nodes[i].nextSibling.nextSibling.textContent;
    	TEAMS.push(Team);
    }
    if (currentTeam >= TEAMS.length) {
        currentTeam = 0;
    }
    showTeams();
    return false;
});

$('#teams').on('click','button.team-remove',function(){
	$(this.parentNode).remove();
});