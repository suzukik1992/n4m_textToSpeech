const maxAPI = require('max-api');
const fs = require('fs');
const textToSpeech = require('@google-cloud/text-to-speech');

// Create a client
const client = new textToSpeech.TextToSpeechClient();

// The text to synthesize
const text = 'Hello, world';

// Construct the request
const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'MP3'}
};

// Peforms the Text-to-Speech request
client.synthesizeSpeech(request, (err, response) => {
    if (err) {
        maxAPI.post(`ERROR: ${err}`);
        return;
    }

    // Write the binary audio content to a local file
    fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
        if (err) {
            maxAPI.post(`ERROR: ${err}`);
            return;
        }
        maxAPI('Auio content written to file: output.mp3');
    });
});

