const Provider = require('react-redux').Provider;
const React = require('react');
const reactRouterDom = require('react-router-dom');
const StaticRouter = reactRouterDom.StaticRouter;
const Route = reactRouterDom.Route;

const reactRouterConfig = require('react-router-config');
const renderRoutes = reactRouterConfig.renderRoutes;
const renderToString = require('react-dom/server').renderToString;
// import createHistory from 'history/createMemoryHistory';
const _createMemoryHistory = require("history").createMemoryHistory;

const createHistory = _interopRequireDefault(_createMemoryHistory).default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SSR = ({ctx, serverRenderPath, initialState}, cb) => {
    // let path = (ctx.path === '/' + appName) ? '/' : ctx.path.replace('/' + appName, '');
    let path = ctx.path;
    let history=createHistory();
    let base = require(serverRenderPath);
    let routesConfig = base.routesConfig;
    let configureStore = base.configureStore;
    let store = configureStore(initialState, history);
    let context={};

    let renderHtml = renderToString(
        <Provider store={store}>
            <StaticRouter
                location={{ pathname: path }}
                context={context}>{renderRoutes(routesConfig)}</StaticRouter>
        </Provider>
    );
    if(context.status === 404) { // 获取状态码并响应；
        ctx.status = 404;
        ctx.body = `404 client router ${ctx.path} NOT FOUND`;
    } else if (context.status === 302) { // 获取状态码并响应；
        ctx.status = 302;
        ctx.redirect(context.url);
    }
    cb(renderHtml);
}
module.exports = SSR;