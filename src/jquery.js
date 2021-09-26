window.$ =window.jQuery = function (selectorOrArrayOrTemplate){
    let elements;//const 不能赋空值
    if (typeof selectorOrArrayOrTemplate==='string') {//如果接受的是选择器
        if(selectorOrArrayOrTemplate[0] === '<'){// 创建 div
            elements=[createElement(selectorOrArrayOrTemplate)]
        }
        else{// 查找 div
            elements =document.querySelectorAll(selectorOrArrayOrTemplate)
        }     
    }else if(selectorOrArray instanceof Array){//如果接受的是数组
        elements =selectorOrArray
    }
    function createElement(string){
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
    }
        // api 可以操作elements
    const api = Object.create(jQuery.prototype) // 创建一个对象，这个对象的 __proto__ 为括号里面的东西
    // const api = {__proto__: jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })
    // api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi
    return api
    };
    jQuery.fn = jQuery.prototype ={//避免浪费内存，把相同方法都放在原型对象中
    //闭包：函数访问外部的变量
        constructor: jQuery,
        jquery: true,
        elements: elements,
        get(index) {
            return this.elements[index];
        },
        appendTo(node) {
            if (node instanceof Element) {
                // 遍历 elements，对每个 el 进行 node.appendChild 操作
                this.each(el => node.appendChild(el));
            } else if (node.jquery === true) {
                // 遍历 elements，对每个 el 进行 node.get(0).appendChild(el))  操作
                this.each(el => node.get(0).appendChild(el));
            }
        },
        append(children) {
            if (children instanceof Element) {
                this.get(0).appendChild(children);
            } else if (children instanceof HTMLCollection) {
                for (let i = 0; i < children.length; i++) {
                    this.get(0).appendChild(children[i]);
                    }
                } else if (children.jquery === true) {
                    children.each(node => this.get(0).appendChild(node));
                }
        },
        prepend(children){
            if (children instanceof Element) {
                this.get(0).prepend(children);
            } else if (children instanceof HTMLCollection) {
                for (let i = 0; i < children.length; i++) {
                    this.get(0).prepend(children[i]);
                    }
                } else if (children.jquery === true) {
                    children.each(node => this.get(0).prepend(node));
                }
        },
        after(node){
            if (node instanceof Element) {
                this.get(0).after(node[i]);
            } else if (node instanceof HTMLCollection) {
                for (let i = 0; i < node.length; i++) {
                    this.get(0).after(node[i]);
                    }
                } else if (node.jquery === true) {
                    node.each(node => this.get(0).after(node));
                }
        },
        before(node){
            if (node instanceof Element) {
                this.get(0).before(node[i]);
            } else if (node instanceof HTMLCollection) {
                for (let i = 0; i < node.length; i++) {
                    this.get(0).before(node[i]);
                    }
                } else if (node.jquery === true) {
                    node.each(node => this.get(0).before(node));
                }
        },
        addClass(className){
            for(let i =0;i<elements.length;i++){
                elements[i].classList.add(className);
            }
          return this
        },
        find(selector) {
            let array = [];
            for (let i = 0; i < elements.length; i++) {
            const elements2 = Array.from(elements[i].querySelectorAll(selector));
            array = array.concat(elements2);
            }
            //return arr //返回arr就无法进行链式操作
            //记录上一个上下文环境（api） 调用jquery函数的对象（this）会组成一个上下文环境，
            array.oldApi = this; // this 是旧 api
            return jQuery(array);
        },
        end(){
            //返回上一个环境
            return this.oldApi;//this 是新api
        },
        each(fn){
            for (let i=0;i<elements.length;i++){
                fn.call(null,elements[i],i)
            }
            return this
        },
        parent() {
            const array = [];
            this.each(node => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode);
                }
            });
            return jQuery(array);
        },
        children(){
            const array=[]
            this.each((node)=>{
                if(array.indexOf(node.childNode) === -1){
                    array.push(...node.children)
                }
            })
            return jQuery(array)
        },
        print(){
            console.log(elements)//可以直接打出要查的元素
        },
        on(eventType, fn) {
        this.each((node) => {
            node.addEventListener(eventType, fn)
        })

        }
    }
