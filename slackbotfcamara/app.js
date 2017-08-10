var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 1337;

var perg = new Array("qual seu nome","qual sua idade","oi");
var resp = new Array("Meu nome é slack Bot","Por ser uma maquina eu não possui idade","Ola tudo bom");

var virgula;
var abre;
var fecha;

var newpergunta;
var newresposta;

var resposta;


var botPayload ;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// test route
app.get('/', function (req, res) { res.status(200).send('Host ON'); });

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

app.post('/hello', function (req, res, next) {

  var userName = req.body.user_name;
  var message = req.body.text;
  
  
  
  if (userName !== 'slackbot') {

    resposta='Não compreendi oque você quis dizer, caso precise de ajuda digite help';

    
    if(message === 'help'){

      resposta = 'Essas são as perguntas que eu sou capaz de responder: \n ' + perg.toString() +  '. \nMas caso você queira me ensinar mais algum comando basta digitar newcommand(PERGUNTA,RESPOSTA) , ou para excluir digite delete';
    }

    if(message.substring(0,10)==='newcommand'){


      for(i = 0 ; i < message.length ; i++){
        if(message.substr(i,1) === ',')
        {
          virgula = i;
        }
        if(message.substr(i,1) === '(')
        {
          abre = i;
        }
        if(message.substr(i,1) === ')')
        {
          fecha = i;
        }

      }

      newpergunta = message.substr(abre+1, virgula-(abre+1));
      newresposta = message.substr(virgula+1,fecha-(virgula+1)); 

      perg.push(newpergunta);
      resp.push(newresposta);

      resposta='Comando inserido!';
    }


    if(message.substring(0,6) === 'delete')
    {
      resposta = 'delete';

      if(message === 'delete')
      {
        resposta = 'Para deletar um comando digite delete <pergunta>';
      }
      var ultimo = perg.length;
      var delpergunta = message.substr(6,ultimo-6);
      if(message.length > 6)
      {

        for(i = 0 ; i < perg.length ; i ++)
        {
          if(perg[i] === message.substr(7,(message.length-7)))
          {
            var copo = perg[perg.length-1];
            perg[perg.length-1] = message.substr(7,(message.length-7));
            perg[i] = copo;
            perg.pop();
          }
        }


        resposta = 'Comando Excluso: ' + message.substr(7,(message.length-7));
      }        

    }


    for (i = 0; i < perg.length; i++) {

      if(message === perg[i])
      {
        resposta = resp[i];
      }

    }


    botPayload = {text : resposta};
    return res.status(200).json(botPayload);
  } else {
    return res.status(200).end();
  }
});

