docker build . --tag argos-sim --network host --build-arg UPDATE_CODE=24
sudo x11docker --hostdisplay --hostnet --user=RETAIN -- --privileged -v -- argos-sim