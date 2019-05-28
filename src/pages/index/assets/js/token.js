var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var uid = null,token=null;
export function getToken(callback){
    // console.log("UA++++"+u);
    // console.log("isAndroid++++"+isAndroid);
    // console.log("uidObj.get_value()++++"+uidObj.get_value());
    if (isAndroid) {
        // console.log(uidObj);
        token = tokenObj.get_value();

        callback(token)
    } else if (isiOS) {
       function setupWebViewJavascriptBridge(callback) {
          if (window.WebViewJavascriptBridge) {
              return callback(WebViewJavascriptBridge);
          }
          if (window.WVJBCallbacks) {
              return window.WVJBCallbacks.push(callback);
          }
          window.WVJBCallbacks = [callback];
          var WVJBIframe = document.createElement('iframe');
          WVJBIframe.style.display = 'none';
          WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
          document.documentElement.appendChild(WVJBIframe);
          setTimeout(function () {
              document.documentElement.removeChild(WVJBIframe)
          }, 0)
       }
       setupWebViewJavascriptBridge(function (bridge) {
         bridge.callHandler('getToken', null, function (response) {
            token=response;
            callback(token);
            console.log('call+'+token);
          })
        })
    }
}
