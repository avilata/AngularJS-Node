<h2>Creating a web FORM</h2>
<b>WHAT IS IT -</b> The platforms main aim is to create new candidates and save them into your DB given that they can later on have their profiles edited or erased. In order to do this there are two views.<br>
The first view (player.html) shows the form-to-complete. Once it is saved, all the existing candidates are shown in a list the second view (playerList.html) where there are links to the editing process or to deleting the candidate.
<br><br>
<b>HOW IS IT DONE -</b> The stucture is divided into two: <b>SERVER</b> and <b>CLIENT</b>. <br><br>
<b>Setting up a SERVER:</b> Using express + nodeJS + mongoDB<br>
To build the Node.js skeleton, the most commlonly used is Express.js. You should have Node.js and NPM installed in order to proceed.<br>
First, open a terminal window and write the following commands: <br>&nbsp;&nbsp;&nbsp; npm install -g express <br> &nbsp;&nbsp;&nbsp; npm install -g express-generator<br>

To generate a new app project folder with its skeleton, rute the terminal to the directory where you want to build the new app and write this command: express nameOfyourApp<br>
To create a new data base, using mongoDB (which you should install), only two steps are needed:<br>
1. Run MongoDB server. Click over the mongodb.exe or go to your mongo folder with your terminal and type mongod. <br>
2. Open a new terminal and type mongo, to create the new data base, type use nameOfYourDB. <br>
You should now create a folder to place your DB's connections. Create this folder inside your new App directory. Call it model. <br>
Inside model, create a file called db.js and add the following lines:<br>
var mongoose = require('mongoose'); <br>
mongoose.connect('mongodb://localhost/nodewebappdb'); <br>

Now open app.js and add the line: var db = require('./model/db');. This will add the variables created at db.js. <br>
Final step is to install dependencies, for which you should type (from a terminal window open in your App directory):<br>
npm install<br>
npm install mongoose --save<br>
npm install body-parser --save<br>
npm install method-override --save<br>

To test it is working, type npm start, and open your navigator and search localhost:3000, which should welcome you to Express.<br>

To finish building up the server part, a file with the objects of the App should be created. In my case, the candidates are called players, so => model->players.js <br>
!!!Every object file you create in model, must be called in app.js using objectFile = require('./model/objectFile')

