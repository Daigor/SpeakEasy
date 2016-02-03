var Promise = require('bluebird');
var ffmpeg = require('fluent-ffmpeg');
var path = require('path');
var watsonAnalysis = require('./analysis/watsonAnalysis.js');
var alchemy = require('./analysis/alchemyAnalysis.js');
var beyondVerbal = require('./analysis/beyondVerbalAnalysis.js');

/*
  Extract audio from video URL to .wav File.
    wav File is sent for analysis to Beyond Verbal & Watson Speech to Text
      results of both are saved to database
    text from watson speech to text is sent to alchemy api
      to get keyword, sentiment and concept analysis
      results are saved to db
    ??personality insights from text??
    ??erase wav and text file??
*/

var extractAudio = function(videoURL) {
  return new Promise(function(resolve, reject){
    var wavFile = path.join(__dirname + '/wavFiles/' + 'file.wav');
    ffmpeg(videoURL)
      .output(wavFile)
      .on('end', function(){
        console.log('extractAudio resolved');
        resolve(wavFile);
      })
      .on('error', function(err){
        reject(err);
      })
      .run();
  })
};

module.exports.audioAnalysis = function(videoURL){
  var wavFile = path.join(__dirname + '/wavFiles/' + 'file.wav');
  // extractAudio(videoURL)
  // .then(function(wavFile){
    beyondVerbal.beyondVerbalAnalysis(wavFile).then(function(results){
      console.log(results[0], 'beyond verbal data in audioanalysis');
      console.log(results[1], 'upstreamdata')
    });      //save beyondVerbalResults to db
    // watsonAnalysis.watsonSpeechToText(wavFile)       //save watsonResults to db
    //   .then(function(watsonResults){
    //     console.log('would run alchemyAnalysis now');
    //     alchemy.alchemyAnalysis(watsonResults)
    //       .then(function(alchemyResults){
    //         console.log(alchemyResults);
    //       }); //save alchemyResults to db
    //   })
  // });
};

module.exports.audioAnalysis();




