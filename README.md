### Welcome to HISD3 Base Framework

 This app during development is divided into 2 server components

 1. Backend Server

   * Please open the app folder in your preferred ide.
 This is a gradle project so import it as a Gradle Module
   * Set your IDE Run/Debug configuration to run Application.main method.
   * We recommend IntelliJ as your Java IDE


 2. Client Side server for debugging
   * Please install Ruby, Python and Saas Ruby Gem
   * Open terminal and go to frontend folder `cd frontend`
   * Install node module dependencies `npm install`
   * Run the client server debugging mode `npm start`
   * It will help during dev to install Redux Dev Tools and ReactJS Tools from Google Chrome Store

 3. To deploy app with optimized resources
   * go to source root
   * execute `./gradlew -Pprofile=prod   build`

