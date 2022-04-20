FROM ubuntu:18.04
ARG DEBIAN_FRONTEND=noninteractive
LABEL Maintainer="Sanmar SIMON <sanmar-yared.simon@polymtl.ca>"
LABEL INF3995.version="1.0"
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_APP=src/main.py
ENV FLASK_ENV=development
ENV PORT=5000

# Install common dependencies
RUN apt-get update && apt-get install -y \   
    build-essential \
    dpkg \ 
    git \
    pkg-config \
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

EXPOSE 5000

# Add dummy argument to force rebuild starting from that point
ARG UPDATE_ARGOS=unknown


# Add dummy argument to force rebuild starting from that point
ARG UPDATE_CODE=unknown

COPY ./ /root/INF3995-103/server

# Install python server packages
RUN cd ../root/INF3995-103/server &&\
    pip3 install pipenv &&\
    /usr/local/bin/python3.8 -m pip install --upgrade pip &&\
    pip3 install flask &&\
    pip3 install flask-cors &&\
    pip3 install -r requirements.txt

WORKDIR /root/INF3995-103/server/src

ENTRYPOINT [ "python3", "main.py"]

EXPOSE 5000

    
