const http = require('http');
console.log("A");
const server = http.createServer((req, res) => {
    console.log("B")

    req.on('data', (cuerpo) => {
        console.log("C");
    })

    req.on('end', () => {
        console.log("D");
        res.end()
    });

    console.log("E");
});

console.log("F");
server.listen(8000);
console.log('G');