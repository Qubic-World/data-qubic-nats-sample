
import { connect, StringCodec } from "nats";

import zlib from 'zlib';

const token = "";
const scores = "qubic.data.scores"; // nats subject 
const revenues = "qubic.data.revenues"; // nats subject 
const ticks = "qubic.data.ticks"; // nats subject 

const test = async function() { //Async Function Expression
    const sc = StringCodec();
    const nc = await connect({
        servers: "65.109.52.116:5432",
        token: token,
      });

    let subject = ticks;

    nc.subscribe(subject, {
        callback: (err, msg) => {
          if (err) {
            console.log(err)
          } else {
            if (subject === revenues) {
                // TODO zlib header error
                zlib.inflate(msg.data, (err, buffer) => {
                    if (!err) {
                        console.log(err, sc.decode(buffer));
                    }
                    else {
                        console.log(err);
                    }
                });
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
