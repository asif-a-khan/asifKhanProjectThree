// Declare app
const ak = {
    // Counter for 'Winning Streak'
    counter: 0,
    // Counter for 'High Score'
    hCounter: 0,
    // Initialize vital info.
    init() {
        // Variable property declarations
        ak.door = $('.door');
        ak.button1 = $('#btn1')
        ak.button2 = $('#btn2')
        ak.button3 = $('#btn3');
        ak.centerM = $('#cM');
        ak.clock = $('.clockWrap');
        ak.clock2 = $('.clockWrap2');
        ak.count = 15;
        ak.gameSpace = $('.gameSection');
        ak.colors = ['red', 'cornFlowerBlue', 'seagreen', 'purple', 'yellow'];
        ak.playing = true;
        ak.doorTally = 3;
        ak.door.css('background-color', 'black');
    },

    // Method Declarations

    // Check if the door selected is red by matching bgc to rgb(255, 0, 0);
    isRed(door) {
        if (door.css('background-color') === 'rgb(255, 0, 0)'){
            return true;
        } else {
            return false;
        };
    },

    // Literally the same thing as isRed but, for black.
    isClosed(door) {
        if (door.css('background-color') === 'rgb(0, 0, 0)') {
            return true;
        } else {
            return false;
        }
    },

    // This method creates 2 scenarios for the player. If, the player wins: Increment counter and display it within #btn1.
    gameOver(status) {
        if (status === 'win') {
            ak.counter++;
            ak.button1.html(`<h3>Streak: ${ak.counter}</h3>`);
            // If, counter is greater than hCounter then, increment hCounter and display it within #btn3.
            if (ak.counter > ak.hCounter) {
                ak.hCounter++;
                ak.button3.html(`<h3>High Score: ${ak.hCounter}</h3>`);
            }
            // Wait 1.5 seconds and run the init method to reset crucial values and change the doors to closed. Display the default message in #btn2.
            setTimeout(function() {
                ak.init();
                ak.door.fadeIn();
                ak.centerM.html(`Good Luck!`);
            }, 1500)
        // If, the player loses: Reset counter to 0 whilst displaying counter within #btn1. Keep hCounter the same.
        } else {
            ak.counter = 0;
            ak.doorTally = 3;
            ak.button1.html(`<h3>Streak: ${ak.counter}</h3>`);
            ak.hCounter = ak.hCounter;
            // Same thing as the previous timeout.
            setTimeout(function() {
                ak.init();
                ak.door.fadeIn();
                ak.centerM.html(`Good Luck!`);
            }, 1500)

        }
    }, 

    // Everytime a door opens, decrement doorTally. the player wins the game if, doorTally goes down to 0 and there are no red doors.
    tallyDoor(x) {
        ak.doorTally--;
        if (ak.doorTally === 0 && !ak.isRed(x)) {
            ak.centerM.html('You Win! Restarting');
            // This runs the win scenario in the gameOver method.
            ak.gameOver('win');
        // If, the door is red at any point, the player has lost.
        } else if (ak.isRed(x)){
            ak.centerM.html('Game Over! Restarting');
            // This runs the lose scenario in the gameOver method.
            ak.gameOver();
        };
    },
    
    // This is the countdown that was specifically requested by Ana. I thought it was going to be much harder at first but, it worked out well.
    timer() {
        let x = 15;
        const cd = setInterval(() => {
            if (x <= 1){
                setTimeout(function() {
                    ak.centerM.html('Time is up! Restarting');
                    ak.clock.html(`<h2>Click to start timer</h2>`)
                    ak.gameOver();
                    clearInterval(cd);
                }, 1500)
            }
            
            ak.clock.html(`<h2>Time Left: ${x}</h2>`)
            x--;
        }, 1000);
    },

    // The main game loop.
    startGame() {
        // Once the timer button is pressed, start the timer.
        ak.clock.click(function() {
            ak.timer();
        });
        
        // If clicked, reveal the game and get out of here.
        ak.clock2.click(function() {
            ak.gameSpace.css('display', 'block');
            ak.gameSpace.addClass('animate__fadeInDown');
            ak.clock2.unbind('click');
        });

        // Everytime a door is clicked the game randomly selects a color from RGB and assigns the clicked door a random color.
        ak.door.click(function() {
            // Caching '$(this)'
            const currentSquare = $(this);
            const random = Math.floor(Math.random() * 5);
            currentSquare.css('background-color', ak.colors[random]);
            // Once the door is assigned a color, check if it's red;
            ak.tallyDoor(currentSquare);
            setTimeout(function() {
                currentSquare.fadeOut();
            }, 100);
        });
    }
    
};

// Load jQuery before running any code.
$(function(){
    ak.init();
    ak.startGame();
});

// Live