jprdy
=====

A math jeopardy game. Check it out here: http://projects.nullcreature.com/jprdy/index.html

The content is mostly placeholder, but you can add you own questions to a text file and change line 168 to load your file. Obiously that part's a work in progress.

The format of the text file is:

    Question text goes here
    (Category goes here in parens)
    ===
    Option 1
    *Option 2 w/ an asterisk to indicate it's the correct answer
    `Option 3 in backticks to get rendered as a math expression`
    `Option 4`

The standard board can hold 5 questions per category. Any number of questions beyond 5 in the text file get put into the next level, which is selectable at the bottom of the screen. I never really finished the level system.

Feel free to submit pull requests for question banks or anything else.
