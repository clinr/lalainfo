//var urban = require('urban');
var cmdcount = 1; // do NOT edit this variable.
var PlugAPI = require("./plugapi"),
    botAuth = "" // use your own bot auth!
    botAdmin = "", // add your name into here.
    botUPDATECODE = 'h90', // IMPORTANT: you must use this everytime when plug.dj changes!
    botCommands = [], // do not touch
    botJoinRoom = "lala-land-3", // bot will need to join a room!
    botName,
    args = "", // DO NOT TOUCH!
    who, wordToDefine, theme;
//    commandIfCalled; // These will not be touched also...


var botAPI = new PlugAPI(botAuth, botUPDATECODE); 

var reconnect = function() { botAPI.connect(botJoinRoom); };

botAPI.on('close', reconnect);
botAPI.on('error', reconnect);

global.createBotCommand = function (Command, Action) { // use this to create a command for your bot

    
    botCommands[cmdcount] = {
    
        
        command: Command,
    
        action: Action,
        
        isArg: false
        
    }
    cmdcount++;
}

botAPI.connect(botJoinRoom);

botAPI.on('roomJoin', function (data) {
 
    botName = data.user.profile.username;
    
})

/* list of bot commands! Feel free to create your own! */

createBotCommand(".test", function () {
    botAPI.chat("Test success! @" + who);
});

createBotCommand(".lalawelcome", function () {
    if(botAdmin === who)
        botAPI.chat('Welcome to LaLa Land!');
})

createBotCommand(".settheme", function () {
    this.isArg = true;
    if(botAdmin === who)
        botAPI.chat('Theme is set to: '+args);
        theme = args;
})

createBotCommand(".theme", function () {
    botAPI.chat('@'+who+' the theme was set to: '+theme);
})

botAPI.on('chat', function (data) {
    who = data.from;
    try {
        for(var i = 1; i < data.message.split(' ').length; i++) {
                args += data.message.split(' ')[i]+" ";
        }

        for(var i = 1; i < cmdcount; i++) {

            if(botCommands[i].command === data.message.split(' ')[0] && botCommands[i].isArg === true){
                botCommands[i].action();
                args = "";
                return;
            } else if(botCommands[i].command === data.message.split(' ')[0] && botCommands[i].isArg === false) {
                botCommands[i].action();
                args = "";
                return;
            }

        }

    } catch(err) {
        console.log(err);
    }
    args = "";
})