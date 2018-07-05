'use strict';

const Provider = require('react-redux').Provider;
const React = require('react');
const reactRouterDom = require('react-router-dom');
const StaticRouter = reactRouterDom.StaticRouter;
const Route = reactRouterDom.Route;

const reactRouterConfig = require('react-router-config');
const renderRoutes = reactRouterConfig.renderRoutes;
const renderToString = require('react-dom/server').renderToString;
// import createHistory from 'history/createMemoryHistory';
var _createMemoryHistory = require('history/createMemoryHistory');

var createHistory = _interopRequireDefault(_createMemoryHistory).default;

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

let SSR = (ctx, routesconfig, configureStore, initialState, cb) => {
    // let path = (ctx.path === '/' + appName) ? '/' : ctx.path.replace('/' + appName, '');
    let path = ctx.path;
    let history = createHistory();
    let store = configureStore(initialState, history);
    let context = {};

    let renderHtml = renderToString(React.createElement(
        Provider,
        { store: store },
        React.createElement(
            StaticRouter,
            {
                location: { pathname: path },
                context: context },
            renderRoutes(routesconfig)
        )
    ));
    if (context.status === 404) {
        // 获取状态码并响应；
        ctx.status = 404;
        ctx.body = '404 NOT FOUND';
    } else if (context.status === 302) {
        // 获取状态码并响应；
        ctx.status = 302;
        ctx.redirect(context.url);
    }
    cb(renderHtml);
};
module.exports = SSR;