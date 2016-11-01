# quick script to start and stop mamp 

#! /usr/bin/env bash

Stop ()
{
    #logger -t "Stopping the mamp server"
    /Applications/MAMP/Library/bin/apachectl stop
    
}
Start ()
{
    #logger -t "Starting the mamp server"
    /Applications/MAMP/Library/bin/apachectl start
}
Restart ()
{
    Stop
    Start
}
OpenEverything ()
{
    echo "open everything"
    open /Applications/MAMP/MAMP.app
    open http://localhost:8887/website
    open /Applications/Transmission.app
    open /Applications/Sublime\ Text.app
    open /Applications/Mail.app
    open /Applications/Sequel\ Pro.app
    open /Applications/DisableMonitor.app
    echo "everything open"
}
CloseEverything ()
{
    echo "close everything"
    osascript -e 'quit app "MAMP"'
    osascript -e 'quit app "Chrome"'
    osascript -e 'quit app "Sublime Text"'
    osascript -e 'quit app "Mail"'
    osascript -e 'quit app "Sequel Pro"'
    osascript -e 'quit app "Terminal"'
    echo "close everything closed"
}

if [ $1 == 'start' ]; then Start 
elif [ $1 == 'stop' ]; then Stop
elif [ $1 == 'restart' ]; then Restart 
elif [ $1 == 'openAll' ]; then OpenEverything
elif [ $1 == 'closeAll' ]; then CloseEverything
fi
