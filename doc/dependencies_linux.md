## Linux

### Node and Watchman

##### Ubuntu

-   Install Curl
    ```
    sudo apt-get install curl python-software-properties
    ```
-   Add PPA to your system
    ```
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    ```
-   Install Nodejs
    ```
    sudo apt-get install nodejs
    ```
-   Install Watchman

    ```
    git clone https://github.com/facebook/watchman.git
    cd watchman
    git checkout v4.9.0  # the latest stable release
    ./autogen.sh
    ./configure
    make
    sudo make install
    ```

##### For installation in other Linux Distros

-   [Read instructions](https://nodejs.org/en/download/package-manager/) for installing Node.js via package manager.
-   [Read offical docs](https://facebook.github.io/watchman/docs/install.html) for watchman installation.


### React Native CLI

Install React Native CLI globally.

```
npm install -g react-native-cli
```