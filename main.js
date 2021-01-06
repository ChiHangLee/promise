class Promise2 {
    queue1 = [] // queue1 为了容纳成功之后的函数们
    queue2 = [] // queue2 为了容纳失败之后的函数们
    constructor(fn) { // new Promise2(fn)
        const resolve = (data) => { // fn 接受 resolve 并在成功的时候调用
            setTimeout(() => { // 要等一会，否则 queue1 和 queue2 为空
                for (let i = 0; i < this.queue1.length; i++) {
                    this.queue1[i](data)
                }
            })
        }
        const reject = (reason) => {
            setTimeout(() => {
                for (let i = 0; i < this.queue2.length; i++) {
                    this.queue2[i](reason)
                }
            })
        }

        fn(resolve, reject)
    }
    then(s, e) {
        this.queue1.push(s)
        this.queue2.push(e)
        return this
    }
}
p1 = new Promise2((resolve, reject) => {
    console.log('hi2');
    if (Math.random() > 0.5) {
        resolve('大')
    } else {
        reject('小')
    }
})
p1.then((data) => { console.log('成功') }, (reason) => { console.log('失败') })
    .then(() => { console.log('成功2') }, () => { console.log('失败2') })
    .then(() => { console.log('成功3') }, () => { console.log('失败3') })


