# docker build . --tag argos-sim --network host --build-arg UPDATE_CODE=25
sudo x11docker --hostdisplay --hostnet --user=RETAIN -- --privileged -v -- argos-sim