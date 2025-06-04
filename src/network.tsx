import { Peer } from 'peerjs'
import { useQRScoutState } from './store/store';
import { Input } from './components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

function genstr(length: number) {
  let result = '';
  const characters = 'acefghjklmorstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// enum NetState {
//   LMHead,
//   FMClient
// }

// var stat = NetState.LMHead;
// var id = "test";
var peer = new Peer('test11111');//, {'config': { 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }], 'sdpSemantics': 'unified-plan' }});

// export function setid(newid: string) {
//   id = newid;
// }

// function z() {
//   console.log(id);
// }

// window.z = z;

export function Netman() {
  // var bestie: string = '';
  const [password, setPassword] = useState<string>('');
  const { betrpass } = useQRScoutState(state => ({
    // teamNumber: state.formData.teamNumber,
    betrpass: state.id
  }));

  if (betrpass == '') {
    const oldState = useQRScoutState.getState();
    useQRScoutState.setState({ ...oldState , id: genstr(6)});
  }

  // function test1() {
  //   console.log(teamNumber);
  //   console.log(password);
  //   var tpeer = new Peer(password);
  //   tpeer.connect('test');
  //   // const oldState = useQRScoutState.getState();
  //   // useQRScoutState.setState({ ...oldState , id: password});
  //   // var tpeer = new Peer();
  //   // tpeer.connect();
  //   // tpeer.on('connection', function(dc) {
  //   //   console.log(dc);
  //   // })
  //   // tpeer.on('error', function(e) {
  //   //   console.log(e);
  //   // })
  // }

  return (
    <div>
    <div className='flex items-center justify-center gap-1'>
      <div className='px-2 py-1.6 text-sm font-semibold'>{betrpass}</div>
      <Input
        type="text"
        placeholder="Enter password"
        value={password}
        onChange={e=>setPassword(e.target.value)}//setnewPassword(e.target.value)}
        className="w-full"
      />
    </div>

    <div className='flex items-center justify-center gap-1'>
      <Button 
        className='w-full'
        onClick={function() {
          if (password != '') {
            useQRScoutState.setState({ ...useQRScoutState.getState(), id: password});
          }
        }}
      >
        Set
      </Button>
      <Button 
        className='w-full'
        onClick={function() {
          //test1();
          peer.connect('test');
          console.log(peer.id)
        }}
      >
        Connect
      </Button>
    </div>

    </div>
  )
}

// var conn = peer.connect('another-peers-id');
// // on open will be launch when you successfully connect to PeerServer
// conn.on('open', function(){
// // here you have conn.id
// conn.send('hi!');
// console.log("BAd");
// });



// peer.on('connection', function(conn) {
//     conn.on('data', function(data){
//         // Will print 'hi!'
//         console.log(data);
//     });
// });

