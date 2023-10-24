const http = require('http')
const cluster = require('cluster')

//Pegando a quantidade de cpus disponíveis do computador.
const cpus = require('os').cpus().length
//Imprimindo a quantidade de cpus.
console.log("Total de núcleos de CPUs: " + cpus);

//Verificando se é a primeira instância (esta vai gerenciar as demais).
if(cluster.isPrimary){
    console.log('Iniciando instância primária com PID: ' + process.pid);
    for (let i = 0; i < cpus-1; i++) {
        //fork (bifurcar) = cria um clone do processo, ou seja, um processo filho.
        cluster.fork();
        
    }
} else {
    //PID = Process ID
    console.log('Iniciando instância secundária com PID: ' + process.pid);
    iniciarServidor();
}


//Criando uma função para iniciar o servidor
    function  iniciarServidor(){
    const app = http.createServer((req, res) => res.end('Página Inicial'))
    const PORT = 8080
    app.listen(PORT, () => console.log("Servidor iniciado na porta " + PORT))
}