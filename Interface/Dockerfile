FROM node:latest

# Different usefull ports (Angular, Flask, Postgresql)
EXPOSE 4200

#################################
#          YOUR CODE            #
#################################

# Add dummy argument to force rebuild starting from that point
ARG UPDATE_CODE=unknown

COPY ./ /root/INF3995-103/Interface

# Install Angular packages
RUN cd ../root/INF3995-103/Interface &&\
    npm install &&\
    # Install Angular CLI
    npm install -g @angular/cli &&\
    # Install Angular Material
    npm install -g @angular/material &&\
    #Install Firebase
    npm install firebase @angular/fire --save &&\
    #Install Duration
    npm install duration &&\
    ng serve --open

#ENTRYPOINT ["ng","serve","--open"]
#CMD ["ng","serve","--open"]
#ENTRYPOINT ["npm","start"]

    
