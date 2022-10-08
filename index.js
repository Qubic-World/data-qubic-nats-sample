
import { connect, StringCodec } from "nats";

const token = "";
const scores = "qubic.data.scores"; // nats subject 
const revenues = "qubic.data.revenues"; // nats subject 
const ticks = "qubic.data.ticks"; // nats subject 

import pkg from 'zstddec';
const { ZSTDDecoder } = pkg;
 
const decoder = new ZSTDDecoder();
 
await decoder.init();

const test = async function() { //Async Function Expression
    const sc = StringCodec();
    const nc = await connect({
        servers: "65.109.52.116:5432",
        token: token,
      });

    let subject = revenues;

    nc.subscribe(subject, {
        callback: (err, msg) => {
          if (err) {
            console.log(err)
          } else {
            if (subject === revenues) {
                console.log(sc.decode(decoder.decode( msg.data )));
            }
            else { 
                console.log(sc.decode(msg.data));
            }
          }
        },
        max: 1,
      });
}

test();

