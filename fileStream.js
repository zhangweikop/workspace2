 require('./objs/vireo.js');
var fs= require('fs')
var runTime = NationalInstruments.Vireo;
var resultFolder = "result";
runTime.viaFinished = false;
runTime.waitList = [];
runTime.reloadVia = function(text){
	this.viaFinished =false;
	this.core.v_delete( this.core.v_shell);
    this.core.v_shell = this.core.v_create(0);
    this.loadVia(text);
}
var Original = process.stdout.write;
var newIO = null;
	process.stdout.write = function(write) {
		if (!newIO){
			Original.apply( process.stdout  ,[new Buffer(write)]);
			return;
		}
		newIO(write);     	
	}

runTime.vireoRunSync = function () {
        // Run a chunk of code. if there is more pending
        // Then restart soon, else restart when it makes sense.
 		var x;
 		if(!this.viaFinished)
        {
        	x = this.executeSlices(10000);
        	if(x<=0)
        	{
        		this.viaFinished = true;
    	    }
    	}

 };
var totalNumber = 0;
var passedTest = 0;
var newCreatedTest = 0; 
	var message = fs.createReadStream('message.txt');
		var message2 = fs.createReadStream('message2.txt');
				var message3 = fs.createReadStream('message3.txt');


	message2.on('readable', function(){
		var chunk;
		var size = -1000;
		message2.read(0);
 
		 function continueR ()
		 {
		 //	message2.emit('readable');
			 process.nextTick(function() {message2.emit('readable');
 			 console.log("inside message2");
 		  
		 })
}  ;
		 //continueR();


		 	
	})
	message.on('Finished', function(){console.log("message Finished")});
	message.on('readable', function(){
		var chunk;
		var size = 1000;
		chunk = message.read();

 		console.log("read result:"+chunk)
		 function continueR ()
		 {
			process.nextTick(function() {message.emit('Finished');
 		  
			})}  ;
		  console.log("inside message1");

		  continueR();
		 	
	})
function compare2(resultFolder, fileName)
{}
function compare(resultFolder, fileName, textCode)
{

    Original.apply( process.stdout  ,[new Buffer("Comparing test result:"+ fileName+'\n')])

 	var different = false;
 	var remaining = null;
	var lastResult = fs.createReadStream(resultFolder+'/'+fileName);
	var runFinished = 0;
	process.nextTick(function() {lastResult.emit('readable');});
 		  
 	lastResult.on('end' , function(){
 		newIO = null;
 		runTime.loadedVia = null;
 		runTime.viaFinished = true;
 		for(var i =0;i<runTime.waitList.length;i++)
 		{
 			var wakeupItem = runTime.waitList[i];
		 function wakeUP ()
		 {
			process.nextTick(function() {
 		 		wakeupItem.emit('readable');
 		 	  		  
		})}  
			wakeUP();
 		 	
 			
 		}
 		if (!runTime.viaFinished){ 
 			different= true;
 		}

 		if (!different) {
			var message = 'testing passed :'+ fileName + '\n';
			Original.apply( process.stdout  ,[new Buffer(message)]) 

		} else {
			var message = 'testing failed :'+ fileName + '\n';
			Original.apply( process.stdout  ,[new Buffer(message)]) 
		}
		passedTest ++;
 	})
	lastResult.on('readable', function() {
  		var chunk;   
  		  		//			Original.apply( process.stdout  ,[new Buffer("\nreadable:"+fileName+" ||||||||||||||||||\n")]) 
  			//		Original.apply( process.stdout  ,[new Buffer("\nqueue length:"+runTime.waitList.length+" ||||||||||||||||||\n")]) 
  				//	Original.apply( process.stdout  ,[new Buffer("\nruntime loaded :"+runTime.loadedVia+" ||||||||||||||||||\n")]) 

  		if(!runTime.loadedVia )
  		{
  			// code hasn't been loaded
  			var i = runTime.waitList.indexOf(lastResult);
  			if (i>=0)
  			{
  				runTime.waitList.splice(i,1);

  			} 
  			runTime.loadedVia = fileName;

  			runTime.reloadVia(textCode);

  		} else {
  			 if(runTime.loadedVia  === fileName )
  			 {

  			 	// if the current code is loaded
  			 } else {
  			 	  		var i = runTime.waitList.indexOf(lastResult);
						if (i<0)
  						{
  							runTime.waitList.push(lastResult);
  						} 
 			 	return;
  			 }
  		}
  		runTime.viaFinished = false;

  	 	newIO = function (write){

  	 		if(!different)
     		{
     			var writeData = new Buffer(write);
     		//	Original.apply( process.stdout  ,[new Buffer("\n~~~~~~~~~~")])
     		//	Original.apply( process.stdout  ,[writeData])
     		//	Original.apply( process.stdout  ,[new Buffer("~~~~~~~~~~\n")])

     			writeData = new Buffer(writeData);

     			 if(remaining) {
      		 		writeData = Buffer.concat([remaining,writeData]);
      			 } 
      		//	Original.apply( process.stdout  ,[new Buffer("\n`````````` ")])

      		    chunk = lastResult.read(writeData.length);

      		//    Original.apply( process.stdout  ,[new Buffer(chunk)])
      		//    Original.apply( process.stdout  ,[new Buffer(" `````````\n")])


      		    if(chunk === null)
      		    {
      		    	chunk === lastResult.read();
      		    }
      		    if (chunk === null) { 
      		    	 
      		    }
      		 	else if(chunk.length>writeData.length) {
      		 		var subChunk = chunk.slice(0,writeData.length);
      		 		different = different || !subChunk.equals(writeData);
      		 		stream.unshift(buf.slice(writeData.length));
      		 		remaining = null;
      		 	} else if (chunk.length<writeData.length) {
      		 		var subData = writeData.slice(0,chunk.length);
      		 		different = different || !chunk.equals(subData);
      		 		remaining = writeData.slice(chunk.length);
      		 	} else {
      		 		different = different || !chunk.equals(writeData);
      		 		remaining = null;
      		 	}
      		} else {
      			  		  		//			Original.apply( process.stdout  ,[new Buffer("\nDIFFERENTDIFFERENT    DIFFERENT\n")]) 

      			different = true; 
      		 
      		}
  	 	}
  	
 	
 		var chunk ;
		while (!runTime.viaFinished &&(chunk =lastResult.read(1)) !=null)
		{	
			  // Original.apply( process.stdout  ,[new Buffer("\ncan running this time ?????????????\n")]) 

			lastResult.unshift(chunk);
			runTime.vireoRunSync();
		}

		if (runTime.viaFinished){
		//	process.stdout.write = Original;

			chunk = lastResult.read();
 			if(chunk != null)
			{
				different = true;
			} else 
			if(remaining)
			{
				different = true;
			} else {
				different = false;
			}
		}
		else {
			different = true;
		}


	});
	 
//	lastResult.close();
}

function runVIA(fileName)
{
	totalNumber++;
	console.log("Processing via file:"+fileName);
	fs.readFile(fileName, function (err, data) {
  	if (err) throw err;
  	var text = data.toString('utf8');


  //	console.log(text);
    var resultFile = fileName.replace(/\.via$/i,'.vtr');

    if (!fs.existsSync(resultFolder)) {
    	fs.mkdirSync(resultFolder);
    }
    if (fs.existsSync(resultFolder+'/'+resultFile))
    {
    	compare(resultFolder, resultFile ,text);
    	return;
    }
    newCreatedTest ++;
    var writeFinished =  null;
    var testResult = fs.createWriteStream(resultFolder+'/'+resultFile);
    Original.apply( process.stdout  ,[new Buffer('Generating test result :'+resultFile+'\n')]) 
   process.stdout.write = function(write) {
   		reWrite();
   		function reWrite(){
   			var ok = testResult.write(write);
     	   if(!ok){
      		  	testResult.once('drain',reWrite);
     	   } else {
     	   	if(writeFinished) {
     	   		testResult.end();
     	   		newIO = null;
     	   	}
     	   }
  	  };
	}

  	runTime.vireoRunSync(runTime);
  	writeFinished = true;
 
	});
}
 
fs.readdir('.', function(err, files){
	if(!err) {
		for (var i=0;i< files.length ; i++)
		{
			var file = files[i];
			if (file.match(/.+\.via$/i))
			{
				runVIA(file);
			}
		}
	}
})

