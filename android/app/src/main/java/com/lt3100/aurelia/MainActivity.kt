package com.lt3100.aurelia

import android.content.Context
import android.net.http.SslError
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.SslErrorHandler
import android.webkit.WebChromeClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.lt3100.aurelia.ui.theme.AureliaTheme

// The built in Android WebView
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.viewinterop.AndroidView

// Import the WebViewAssetLoader
// This is part of the AndroidX WebKit library
// The gradle dependency is `androidx.webkit:webkit:1.9.0`
// See the gradle file for more details
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewAssetLoader.AssetsPathHandler

class BetrClient : WebChromeClient() {
    override fun onConsoleMessage(consoleMessage: ConsoleMessage): Boolean {
        Log.e("lt3100", consoleMessage.message() + " -- From line "
                + consoleMessage.lineNumber() + " of "
                + consoleMessage.sourceId());
        return super.onConsoleMessage(consoleMessage);
    }
}

@Suppress("unused")
class WebAppInterface(private val mContext: Context, private val webView: WebView) {
    @JavascriptInterface
    fun showToast(toast: String) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun clearCache() {
        webView.clearCache(true)
    }
}

@Composable
fun ComposeWrappedWebView() {
    AndroidView(
        factory = { context ->
            val assetLoader = WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", AssetsPathHandler(context))
                .setDomain("algaebot.team3100.aurelia")
                .build()

            WebView(context).apply {
                overScrollMode = View.OVER_SCROLL_NEVER
                layoutParams = ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
                addJavascriptInterface(WebAppInterface(context, this), "Android1")

                settings.loadWithOverviewMode = true
                settings.useWideViewPort = true

                /**
                 * Enable JavaScript in the WebView
                 * This is required to load JS in the WebView
                 * The compiler will warn you that this can cause XSS security issues
                 * but since we are loading our own assets, this is not a concern
                 * hence the `@Suppress("SetJavaScriptEnabled")` annotation
                 */
                @Suppress("SetJavaScriptEnabled")
                settings.javaScriptEnabled = true
                settings.javaScriptCanOpenWindowsAutomatically = true

                webViewClient = object : WebViewClient() {

                    override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                        //return true load with system-default-browser or other browsers, false with your webView
                        return false;
                    }
                    override fun shouldInterceptRequest(
                        view: WebView,
                        request: WebResourceRequest
                    ): WebResourceResponse? {
                        return assetLoader.shouldInterceptRequest(request.url)
                    }
                }
//                setWebChromeClient(BetrClient())
                webChromeClient = BetrClient()
                settings.setDomStorageEnabled(true);
                /**
                 * This is the URL that will be loaded when the WebView is first
                 * The assets directory is served by a domain `https://appassets.androidplatform.net`
                 * Learn more about the WebViewAssetLoader here:
                 * https://developer.android.com/reference/androidx/webkit/WebViewAssetLoader
                 */
                loadUrl("https://algaebot.team3100.aurelia/assets/dist/index.html")
            }
        },
        update = {}
    )
}



class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        baseContext
        setContent {
            AureliaTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    ComposeWrappedWebView()
                }
            }
        }
    }
}

//@Composable
//fun Greeting(name: String, modifier: Modifier = Modifier) {
//    Text(
//        text = "Hello $name!",
//        modifier = modifier
//    )
//}
//
//@Preview(showBackground = true)
//@Composable
//fun GreetingPreview() {
//    AureliaTheme {
//        Greeting("Android")
//    }
//}