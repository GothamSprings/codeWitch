const express = require('express')
var cors = require('cors')
const app = express()
var bodyParser = require('body-parser');

const Sandbox = require("./scripts/node_modules/sandbox")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let box = new Sandbox();

let witchObj = "let witch = { moveRight: () => console.log('right'), moveLeft: () => console.log('left'), moveUp: () => console.log('up'), moveDown: () => console.log('down'), pickUp: () => console.log('pickup'), castSpell: () => console.log('castspell')}; "

// Takes in raw code string
//let ex = "witch.moveDown();\nwitch.moveLeft()\nlet x = 0;\nlet y = 1;\nwhile(x < 3){\n    witch.moveRight()\n    x++\n}\n\nif(y){\n    witch.moveUp()\n}"
app.options('/api/coderunner', cors())
app.post('/api/coderunner', cors(), (req, res, next) => {
  let str = witchObj + "try {" + req.body.code + "}catch(error){console.log(error)}"

  //console.log(witchObj + req.body.code);
  box.run((witchObj + req.body.code), (output) => {
    res.send(output)
  })
})

app.listen(8080, () => console.log('Witch is flying on port 8080!'))

