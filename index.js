const http = require("http");
const { NlpManager } = require("node-nlp");

const manager = new NlpManager();
manager.load();

const listener = async (request, response) => {
    const buffer = [];
    for await (const chunk of request) {
        buffer.push(chunk);
    }
    const data = Buffer.concat(buffer).toString();
    const result = await manager.process(data);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.writeHead(200);
    response.end(result.answer);
};

const server = http.createServer(listener);
server.listen(8080);