FROM node:latest

EXPOSE 4200

# Add dummy argument to force rebuild starting from that point
ARG UPDATE_CODE=unknown

COPY ./ /root/INF3995-103/Interface

WORKDIR /root/INF3995-103/Interface
# Install Angular packages
RUN npm install
    # Install Angular Material
RUN npm install -g @angular/material
    #Install Firebase
RUN npm install firebase @angular/fire --save
    #Install Duration
RUN npm install duration

CMD [ "npm","start" ]

EXPOSE 4200
    
