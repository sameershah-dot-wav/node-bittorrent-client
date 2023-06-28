'use strict';
const fs = require('fs');
const bencode = require('bencode');


const dgram = require('dgram');
const Buffer = require('buffer').Buffer;
const urlParse = require('url').parse;

const torrent = bencode.decode(fs.readFileSync('puppy.torrent'));

//parse url of tracker
const url = urlParse(torrent.announce.toString('utf8'));

//create new socket instance, pass udp4 for IPv4 address format
const socket = dgram.createSocket('udp4');

//convert message from string to buffer
const myMsg = Buffer.from('hello?', 'utf8');

//send message
socket.send(myMsg, 0, myMsg.length, url.port, url.host, () => {});

//Tell socket how to handle incoming message
socket.on('message', msg => {
    console.log('message is', msg);
});

console.log(torrent.announce.toString('utf8'));