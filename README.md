# bun-reactssr-plugin
bunkoa框架react项目ssr插件，基于react-router4.x

##用法：
SSR方法接受5个参数：
ctx: koa传递的上下文
routesConfig：react-router-config对应的router配置文件
configureStore：生成store的方法
initialState：初始数据
callback: ssr执行完成的回调，参数是后端渲染后的html

```
import SSR from 'bun-reactssr-plugin'
SSR(ctx, routesConfig, configureStore, initialState, (renderHtml) => {
            
    if (renderHtml) {
         ctc.body = renderHtml;      
    } else {
         ctx.status = 404;
         ctx.body = 'Not found';
    }
            
});
```
