function getQuestionWithID(questionsObj, qid) {
	for (var topic in questionsObj) {
		if (questionsObj.hasOwnProperty(topic)) {
			var questionArray = questionsObj[topic];
			for (var i = 0; i < questionArray.length; i++) {
				var q = questionArray[i];
				if (q.qid == qid) {
					return q;
				}
			}
		}
	}
	return null;
}
function parseQuestions(data) {
    var questions = {};
    var questionArray = data.split('\n\n')
    var i;
    for (i = 0; i < questionArray.length; i++) {
        var q = questionArray[i];
        var qParts = q.split('\n===\n');
        var questionText = qParts[0];
        var optionsText = qParts[1];
        // Extract topic
        var lines = questionText.split('\n');
        var lastLine = lines[lines.length-1];
        if (lastLine.slice(0, 1) == '(' && lastLine.slice(-1) == ')') {
            // Parens on last line of question. Do not include topic in question text.
            questionText = lines.slice(0, lines.length-1).join('\n');
            // Topic is the last line.
            var topic = lastLine.slice(1, -1);
            // Set question text and topic.
            var Question = {};
            Question.text = questionText;
            Question.topic = topic;
            // Find answer choices.
            var aParts = optionsText.split('\n');
            var options = '<ol type="A">';
            if (aParts.length > 1) {
                // This is a multiple choice question.
                var j;
                for (j = 0; j < aParts.length; j++) {
                    options += '<li>' + strippedAnswerOption(aParts[j]) + '</li>';
                }
                Question.answer = correctOption(aParts);
            } else {
                Question.answer = aParts;
            }
            options += '</ol>';
            Question.options = options;
            Question.qid = 'q' + i;
            
            if (questions[topic]) {
                questions[topic].push(Question);
            } else {
                questions[topic] = [Question];
            }
        }
    }
    return questions;
}