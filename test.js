let p = new Promise((resolve , reject)=>{
    let a = 1+1
    if (a == 2){
        resolve('success')
    }else {
        reject('fail')
    }
})




p.then((message)=>{
    console.log(message)
}).catch((message)=>{
    console.log('failed message')
})