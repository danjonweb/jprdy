$('#content').on('click','.question',function(){
	var qid = this.getAttribute('id');
	var q = getQuestionWithID(QUESTIONS,qid);
	var qElement = this;
    var questionValue = parseInt(qElement.textContent);
    
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
                teams[currentTeam].score = parseInt(teams[currentTeam].score) + questionValue;
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
                if (currentTeam >= teams.length) {
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

$('#edit-teams').on('click',function(){
	var colorSelectHTML = '<select name="color"><option value="#ac725e">#ac725e</option><option value="#d06b64">#d06b64</option><option value="#f83a22">#f83a22</option><option value="#fa573c">#fa573c</option><option value="#ff7537">#ff7537</option><option value="#ffad46">#ffad46</option><option value="#42d692">#42d692</option><option value="#16a765">#16a765</option><option value="#7bd148">#7bd148</option><option value="#b3dc6c">#b3dc6c</option><option value="#fbe983">#fbe983</option><option value="#fad165">#fad165</option><option value="#92e1c0">#92e1c0</option><option value="#9fe1e7">#9fe1e7</option><option value="#9fc6e7">#9fc6e7</option><option value="#4986e7">#4986e7</option><option value="#9a9cff">#9a9cff</option><option value="#b99aff">#b99aff</option><option value="#c2c2c2">#c2c2c2</option><option value="#cabdbf">#cabdbf</option><option value="#cca6ac">#cca6ac</option><option value="#f691b2">#f691b2</option><option value="#cd74e6">#cd74e6</option><option value="#a47ae2">#a47ae2</option></select>';
    var nodes = document.querySelectorAll('.team-name');
    var firstElement;
    for (var i = 0; i < nodes.length; i++) {
    	var colorNode = nodes[i].previousSibling;
    	var colorPicker = $(colorSelectHTML);
		$(colorNode).replaceWith(colorPicker);
		colorPicker.simplecolorpicker({picker:true});
		
		var e = $('<input type="text" class="edit-team-input" value="' + $(nodes[i]).text() + '"/><button class="button-xsmall pure-button team-remove-button">&#xd7;</button>');
		if (i == 0) {
        	firstElement = e;
    	}
		$(nodes[i]).replaceWith(e);
		
		
    }
    
    $('#teams').append('<button id="team-add" class="pure-button">Add team</button>');
    $('#teams').append('<button id="team-done" class="pure-button">Done</button>');
    $('#team-add').click(function(){
    	var color = Colors.random();
    	// Add a space between words
    	var name = color.name.replace(/([a-z])([A-Z])/g, '$1 $2');
    	var html = $('<li><span class="team-color" style="background-color:'+color.hex+';"></span>');
        var e = $('<input type="text" class="edit-team-input" value="'+name+' Team"/>');
        html.append(e);
        html.append('<button class="button-xsmall pure-button team-remove-button">&#xd7;</button>');
        html.append('<span class="team-score">0</span></li>');
        $('ul#team-list').append(html);
        setTimeout(function(){e.select();}, 50);
        return false;
    });
    
    $('#team-done').click(function(){
    	teams = [];
    	var nodes = document.querySelectorAll('.edit-team-input');
        for (var i = 0; i < nodes.length; i++) {
        	var Team = {};
        	Team.name = nodes[i].value;
        	Team.color = nodes[i].previousSibling.style.backgroundColor;
        	Team.score = nodes[i].nextSibling.nextSibling.textContent;
        	teams.push(Team);
			$(nodes[i]).replaceWith($('<span class="team-name">'+Team.name+'</span>'));
        }
        $('#team-add').remove();
        $('#team-done').remove();
        $('.team-remove-button').remove();
        if (currentTeam >= teams.length) {
	        currentTeam = 0;
        }
        showTeams();
        return false;
    });
    
    setTimeout(function(){firstElement.select();}, 50);
    return false;
});

$('#teams').on('click','.team-remove-button',function(){
	$(this.parentNode).remove();
});