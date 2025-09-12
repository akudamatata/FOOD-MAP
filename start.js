const { exec } = require('child_process');
 
// 启动Node.js 服务器 
const nodeServer = exec('node server.js',  { windowsHide: true });
nodeServer.stdout.on('data',  (data) => {
    console.log(`[Node]  ${data}`);
});
nodeServer.stderr.on('data',  (data) => {
    console.error(`[Node  Error] ${data}`);
});
 
// 注意：Windows路径中的反斜杠需要转义或使用正斜杠 
const pythonPath = 'C:\\Users\\LTZ\\AppData\\Local\\Programs\\Python\\Python313\\python.exe'; 
// 或者使用正斜杠（在Windows中也能正常工作）：
// const pythonPath = 'C:/Users/LTZ/AppData/Local/Programs/Python/Python313/python.exe'; 
 
// 启动Python HTTP服务器 
const pythonServer = exec(`"${pythonPath}" -m http.server  8000`, { windowsHide: true });
pythonServer.stdout.on('data',  (data) => {
    console.log(`[Python]  ${data}`);
});
pythonServer.stderr.on('data',  (data) => {
    console.error(`[Python  Error] ${data}`);
});
 
// 添加进程退出处理 
[nodeServer, pythonServer].forEach(proc => {
    proc.on('exit',  (code) => {
        console.log(` 子进程退出，退出码 ${code}`); 
    });
});
 
console.log(' 已启动所有服务 - Node.js 后端和Python HTTP服务器');
console.log(`Node.js 后端运行中`);
console.log(`Python  HTTP服务器访问: http://localhost:8000`);