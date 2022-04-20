FROM ubuntu:18.04
ARG DEBIAN_FRONTEND=noninteractive
LABEL Maintainer="Sanmar SIMON <sanmar-yared.simon@polymtl.ca>"
LABEL INF3995.version="1.0"
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

# Install common dependencies
RUN apt-get update && apt-get install -y \   
    build-essential \
    dpkg \ 
    git \
    pkg-config \
    # python3 \
    # python3-pip \
    # python3-dev \
    # python3-numpy \
    # python-pandas \
    # python-sklearn \
    # python-matplotlib \
    make gcc-arm-none-eabi \
    wget \
    curl \
    sudo \
    software-properties-common \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y \
    build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev &&\
    wget https://www.python.org/ftp/python/3.8.10/Python-3.8.10.tgz &&\
    tar -xf Python-3.8.10.tgz &&\
    cd Python-3.8.10 &&\
    ./configure --enable-optimizations &&\
    make -j $(nproc) &&\
    make install

# Different usefull ports (Angular, Flask, Postgresql)
EXPOSE 80 4200 5000 5432

# Add dummy argument to force rebuild starting from that point
ARG UPDATE_ARGOS=unknown

#################################
#          YOUR CODE            #
#################################

# Add dummy argument to force rebuild starting from that point
ARG UPDATE_CODE=unknown

COPY ./ /root/INF3995-103/server
#WORKDIR /root/INF3995-103

# Install python server packages
RUN cd ../root/INF3995-103/server &&\
    pip3 install pipenv &&\
    /usr/local/bin/python3.8 -m pip install --upgrade pip &&\
    # virtualenv serverDev &&\
    # python3 -m serverDev /opt/serverDev &&\
    # source serverDev/bin/activate &&\
    # pipenv --python 3.9 install &&\
    # pipenv install --dev &&\
    # source tutorial-env/bin/activate &&\
    pip3 install flask &&\
    pip3 install flask-cors &&\
    pip3 install -r requirements.txt

RUN cd ../root/INF3995-103/server/src &&\
    python3 main.py

    
