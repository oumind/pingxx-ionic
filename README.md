#Using
1. clone pingxx plugin

        $git clone git@github.com:oumind/cordova-plugin-pingxx.git
    
2. clone this project

        $git clone git@github.com:oumind/pingxx-ionic.git

3. add ios platform

        ionic platform add ios
        
4. Install the plugin

        $cd cordova-pingxx-demo
        $cordova plugin add ../cordova-plugin-pingxx/ --variable URL_SCHEME=YOUR-URL-SCHEME
        
    URL_SCHEME is your app URL_SCHEME,about URL_SCHEME,you can see this project
    [EddyVerbruggen/Custom-URL-scheme](https://github.com/EddyVerbruggen/Custom-URL-scheme)

5. install bower dependencies
        
        bower install
        
6. change code www/js/app.js
                
              api_url: 'http://YOUR-IP:8010'//TODO YOUR-IP like 192.168.10.10
                
              cordovaPingxx.createPayment(charge, 'YOUR-URL-SCHEME');//TODO YOUR-URL-SCHEME is what in this command you hava specified
                                                                        // $cordova plugin add ../cordova-plugin-pingxx/ --variable URL_SCHEME=YOUR-URL-SCHEME

7. run the code

        $ionic emulate
        
#URL Scheme hints
##Please choose a URL_SCHEME which which complies to these restrictions:
- Don't use an already registered scheme (like `fb`, `twitter`, `comgooglemaps`, etc).
- Use only lowercase characters.
- Don't use a dash `-` because on Android it will become underscore `_`.
- Use only 1 word (no spaces).

TIP: test your scheme by installing the app on a device or simulator and typing yourscheme:// in the browser URL bar, or create a test HTML page with a link to your app to impress your buddies.
        
    
