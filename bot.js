const Discord = require("discord.js");
const client = new Discord.Client();
        
var prefix = "R"

    client.on("message", function(message) {
    const messagea = message.content
    try {
        if (message.channel.type === "dm") return;
        if (message.author === client.user)
        
            if (message.guild === undefined) {
                message.channel.send("Le bot ne fonctionne que sur des serveurs !")

                return;
            }


  
        if (message.content.startsWith(prefix +'play')) {
            if(message.channel.name != 'musique'){
            return message.reply("Veuillez faire ces commandes dans <#396358820017733642>");
}

            if (!message.guild.voiceConnection) {
                
                if (!message.member.voiceChannel) return message.channel.send(':x: Vous devez être connecté à un channel vocal')
                
                message.member.voiceChannel.join()
            }
            let suffix = messagea.split(" ").slice(1).join(" ")
            
            if (!suffix) return message.channel.send(':x: Vous devez spécifier un titre ou un lien youtube')
            

            play(message, getQueue(message.guild.id), suffix)
        }
        if (message.content.startsWith(prefix +'stop')) {
            if(message.channel.name != 'musique'){
            return message.reply("Veuillez faire ces commandes dans <#396358820017733642>");
}

            console.log('leave');
            if (!message.guild.voiceConnection) {
               
                if (!message.member.voiceChannel) return message.channel.send(':x: Vous devez être connecté à un channel vocal')
                
}
                var chan = message.member.voiceChannel;
               message.member.voiceChannel.leave();
                let queue = getQueue(message.guild.id);
                
                if (queue.length == 0) return message.channel.send(`Plus de musique dans la playlist`).then(response => { response.delete(5000) });
                for (var i = queue.length - 1; i >= 0; i--) {
                    queue.splice(i, 1);
                }
                message.channel.send(`playlist vide\n\nDeconnexion ...`).then(response => { response.delete(5000) });

                
            
        }
        
        if (message.content.startsWith(prefix +"clearQ")) {
            if(message.channel.name != 'musique'){
            return message.reply("Veuillez faire ces commandes dans <#396358820017733642>");
}
         
                let queue = getQueue(message.guild.id);
                
                if (queue.length == 0) return message.channel.send(`Plus de musique dans la playlist`).then(response => { response.delete(5000) });
                
                for (var i = queue.length - 1; i >= 0; i--) {
                    queue.splice(i, 1);
                }
                
                message.channel.send(":wastebasket: playlist vidée !").then(response => { response.delete(5000) })
                
            }
        if (message.content.startsWith(prefix +'skip')) {
            if(message.channel.name != 'musique'){
            return message.reply("Veuillez faire ces commandes dans <#396358820017733642>");
}
          
        if (!message.member.voiceChannel) return message.channel.send(':x: Vous devez être connecté à un channel vocal')
                let player = message.guild.voiceConnection.player.dispatcher
                if (!player || player.paused) return message.channel.send(":x: Le bot ne joue pas").then(response => { response.delete(5000) });
                message.channel.send(':fast_forward: Skip').then(response => { response.delete(5000) });
                player.end()
            

        }

        if (message.content.startsWith(prefix +'pause')) {
            if(message.channel.name != 'musique'){
            return message.reply("Veuillez faire ces commandes dans <#396358820017733642>");
}
          
                
                    if (!message.member.voiceChannel) return message.channel.send(':x: Vous devez être connecté à un channel vocal').then(response => { response.delete(5000) });
                    let player = message.guild.voiceConnection.player.dispatcher
                    if (!player || player.paused) return message.channel.send(":x: Le bot ne joue pas").then(response => { response.delete(5000) });
                    player.pause();
                    const embed = new Discord.RichEmbed()
  .setTitle("**Pause** ")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(3447003)
  .setDescription(":pause_button:")
  .setThumbnail("https://media.giphy.com/media/ihAzpzQNrjKZa/giphy.gif")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()



  message.channel.send({embed}).then(response => { response.delete(5000) });
                
               
            } 
        if (message.content.startsWith(prefix +'volume')) {
            if(message.channel.name != 'musique'){
            return message.reply("Veuillez faire ces commandes dans <#396358820017733642>");
}
         let suffix = message.content.split(" ")[1];
                        
            var player = message.guild.voiceConnection.player.dispatcher
            if (!player || player.paused) return message.channel.send(':x: Le bot ne joue pas');
            
            if (!suffix) {
var player = message.guild.voiceConnection.player.dispatcher
                
                message.channel.send(`Le volume actuel est ${(player.volume * 100)}`).then(response => { response.delete(5000) });
                
            } var player = message.guild.voiceConnection.player.dispatcher
                let volumeBefore = player.volume
                let volume = parseInt(suffix);
                
                if (volume > 100) return message.channel.send("Le volume ne peux pas atteindre plus de **100**").then(response => { response.delete(5000) });
                player.setVolume((volume / 100));
                 const embed = new Discord.RichEmbed()
  .setTitle("**Changement de volume ** ")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(3447003)
  .setDescription(":speaker: `"+ volume + "`")
  .setThumbnail("https://www.emojimantra.com/wp-content/uploads/2015/12/Speaker-with-One-Sound-Wave1.jpg")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()



  message.channel.send({embed}).then(response => { response.delete(5000) });
                
            }
        

        if (message.content.startsWith(prefix +'resume')) {
            if(message.channel.name != 'musique'){
            return message.reply("Veuillez faire ces commandes dans <#396358820017733642>");
}
          
                
                if (!message.member.voiceChannel) return message.channel.send(':x: Vous devez être connecté à un channel vocal').then(response => { response.delete(5000) });
                let players = message.guild.voiceConnection.player.dispatcher
                if (!players) return message.channel.send(':x: Le bot ne joue pas').then(response => { response.delete(5000) });
                if (players.playing) return message.channel.send(':x: La musique est déjà en lecture').then(response => { response.delete(5000) });
                
                var queue = getQueue(message.guild.id);
           
                players.resume();
                
                const embed = new Discord.RichEmbed()
  .setTitle("**Lecture** ")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(3447003)
  .setDescription(":arrow_forward:")
  .setThumbnail("https://media.giphy.com/media/ihAzpzQNrjKZa/giphy.gif")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()



  message.channel.send({embed}).then(response => { response.delete(5000) });
                
            } 
      

        if (message.content.startsWith(prefix +'queue')) {
            if(message.channel.name != 'musique'){
            return message.reply("Veuillez faire ces commandes dans <#396358820017733642>");
}
          let queue = getQueue(message.guild.id);
            
            if (queue.length == 0) return message.channel.send("Pas de musique dans la playlist");
            let text = '';
            for (let i = 0; i < queue.length; i++) {
                text += `${(i + 1)}. ${queue[i].title} | demandé par ${queue[i].requested}\n`
            };
            const embed = new Discord.RichEmbed()
  .setTitle("**:globe_with_meridians: playlist :** ")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
  .setColor(3447003)
  .setDescription("`" + text +"`")
  .setThumbnail("http://www.playzer.fr/images/loading_27.gif")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()



  message.channel.send({embed}).then(response => { response.delete(50000) });
            
        }
    } catch (err) {
        
        console.log("Error\n\n\n" + err.stack)
        errorlog[String(Object.keys(errorlog).length)] = {
            "code": err.code,
            "error": err,
            "stack": err.stack
        }
        fs.writeFile("./errors.json", JSON.stringify(errorlog), function(err) {
            if (err) return console.log("Error");
        })
        
if(message.author.bot)return;

}

});

client.login(process.env.BOT_TOKEN);  //اياكككك تلعب هنا لا تحط توكنك هنا 
