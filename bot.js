//var urban;
//var lookup;
var cmdcount = 1; // do NOT edit this variable.
var PlugAPI = require("./plugapi"),
    botAuth = "", // use your own bot auth!
    botAdmin = "",
    botUPDATECODE = 'h90', // IMPORTANT: you must change this everytime when plug.dj changes!
    botCommands = [], // do not touch
    botJoinRoom = "", // bot will need to join a room!
    botName,
    args = "", // DO NOT TOUCH!
    who, wordToDefine, theme;
//    commandIfCalled; // These will not be touched also...



/*
function lookup(query, callback) {
  var response = urban(query);
  response.first(function(json) {
    var entry = {}
    if(json.definition && query.length > 0){
      entry['definition'] = json.definition;
    }
    else {
      entry['definition'] = "";
    }
    if(json.example && query.length > 0){
      entry['example'] = json.example;
    }
    else {
      entry['example'] = "";
    }
    callback(entry);
  });
}
*/
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

createBotCommand(".say", function () {
    this.isArg = true;
    if(botAdmin === who)
        botAPI.chat(args);
});

createBotCommand(".announcement", function () {
    botAPI.chat("EVERYBODY LISTEN TO "+who+" for AN ANNOUNCEMENT!");
});

createBotCommand(".welcome", function () {
    if(botAdmin === who)
        botAPI.chat('Welcome to LaLa Land!');
})

createBotCommand(".settheme", function () {
    this.isArg = true;
    if(botAdmin === who)
        botAPI.chat('Theme is set to: '+args);
        theme = args;
})
/*
createBotCommand(".define", function () {
    urban = require("urban");
    this.isArg = true;
    lookup(args, function (entry) {
        botAPI.chat("["+args+"]: "+entry['definition']);
        entry = {}
         urban = null;
        //break;
    })
})

createBotCommand(".example", function () {
    urban = require("urban");
    this.isArg = true;
    lookup(args, function (entry) {
        botAPI.chat("["+args+"]: "+entry['example']);
        entry = {}
        urban = null;
        //break;
    })
})

*/
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
                //args = "";
                return;
            } else if(botCommands[i].command === data.message.split(' ')[0] && botCommands[i].isArg === false) {
                botCommands[i].action();
                //args = "";
                return;
            }

        }

    } catch(err) {
        console.log(err);
    }
    args = "";
    return;
})