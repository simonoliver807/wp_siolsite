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
    open http://localhost:8887/website/oimo-demo/
    open /Applications/Transmission.app
    open /Applications/Brackets.app
    open /Applications/Mail.app
    echo "everything open"
}

if [ $1 == 'start' ]; then Start 
elif [ $1 == 'stop' ]; then Stop
elif [ $1 == 'restart' ]; then Restart 
elif [ $1 == 'openAll' ]; then OpenEverything
fi
