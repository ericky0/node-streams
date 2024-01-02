import { createServer, IncomingMessage, ServerResponse } from 'http'
import { Readable } from 'stream'
import { randomUUID } from 'crypto'

function * run () {
  for (let index = 0; index <= 99; index ++) {
    const data = { 
      id: randomUUID(),
      name: `Erick-${index}`
    }

    yield data
  }
}

const handler = (request: IncomingMessage, response: ServerResponse) => {
  const readable = new Readable({ 
    read() {  
      for (const data of run()) {
        console.log(`sending`, data)
        this.push(JSON.stringify(data) + '\n')
      }
      
      this.push(null)
    }
   })
   readable.pipe(response)
}

createServer(handler)
  .listen(3000)
  .on('listening', () => console.log('server running at 3000 🚀'))