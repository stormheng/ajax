
let n = 1;//默认第一页
// 用JS请求CSS

getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET','/style.css') //request.readyState=1
    request.onreadystatechange = () => {
        console.log(request.readyState)
        //下载完成，但不知道是成功还是失败 2xx是成功，4xx 5xx 失败
        if(request.readyState === 4){
            if(request.status >= 200 && request.status <= 300){
                //创建style标签
                const style = document.createElement('style');
                //将响应内容放入style标签中
                style.innerHTML = request.response;
                //将style标签插入head中
                document.head.appendChild(style);
            }else {
                alert('加载CSS失败')
            }
            
        }
        
    }
    
    /* 不要使用，因为onerror无效
    // request.onload = () => {
    //     console.log(request.response) //打印请求的响应内容
        
    //     //创建style标签
    //     const style = document.createElement('style');
    //     //将响应内容放入style标签中
    //     style.innerHTML = request.response;
    //     //将style标签插入head中
    //     document.head.appendChild(style);
    // }
    // request.onerror = () => {
    //     console.log('失败了')
    // }*/
    request.send() //request.readyState=2
};

getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET','/test.js')  //要与响应的路径对应
    request.onload = () => {
        console.log(request.response)
        const script = document.createElement('script')
        script.src = '/test.js'  //要与响应的路径对应
        //或者：script.innerHTML = request.response
        document.body.appendChild(script)
    }
    request.onerror = () => {  //请求失败不会触发onerror
        console.log('失败了')
    }
    request.send()
};

getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET','/test.html')
    request.onload = () => {
        console.log(request.response)
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()
};

getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET','/test.xml')
    request.onreadystatechange = () => {
        console.log(request.readyState)
        //下载完成，但不知道是成功还是失败 2xx是成功，4xx 5xx 失败
        if(request.readyState === 4){
            if(request.status >= 200 && request.status <= 300){
                //console.log(request.responseXML)
                const dom = request.responseXML;
                const text = dom.getElementsByTagName('warning')[0].textContent
                console.log(text.trim())
            }else {
                alert('加载XML失败')
            }
        }
    }
    request.send()
};

getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET','/test.json')
    request.onreadystatechange = () => {
        console.log( typeof request.response) //string
        if(request.readyState === 4){
            if(request.status >= 200 && request.status < 300){
                const object = JSON.parse(request.response)
                console.log(object)
                myName.textContent = object.name
            }else {
                alert('失败了')
            }
        }
    }
    request.send()
};

getPage.onclick = () => {  //分页功能
    const request = new XMLHttpRequest()
    request.open('GET',`/page${n+1}`)
    request.onreadystatechange = () => {
        if(request.readyState === 4 && request.status === 200){
            // console.log(request.response)
            const array = JSON.parse(request.response)
            array.forEach(element => {
                const li = document.createElement('li')
                li.textContent = element.id
                xxx.appendChild(li)
            });
            n+=1;
        }//else{
        //     alert('请求失败')
        // }
    }
    request.send()
};