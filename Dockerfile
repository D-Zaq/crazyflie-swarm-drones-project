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
    nodejs \
    npm \
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

# RUN apt-get update && \
#     apt-get install --no-install-recommends -y \
#     python3.8.10 python3-pip python3.8.10-dev


#Install POSTGRESQL
RUN apt-get install -y wget ca-certificates &&\
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - &&\
    sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' &&\
    apt-get update &&\
    apt-get install -y postgresql postgresql-contrib

# Install ARGoS dependencies
RUN apt-get update && apt-get install -y \
    wget \
    freeglut3-dev \
    qt5-default \
    libxi-dev \
    libxmu-dev \
    libfreeimage-dev \
    libfreeimageplus-dev \
    liblua5.2-dev \
    lua5.2 \
    liblua5.3-dev \
    lua5.3 \
    libboost-filesystem-dev \
    cmake \
    && rm -rf /var/lib/apt/lists/*

# Different usefull ports (Angular, Flask, Postgresql)
EXPOSE 80 4200 5000 5432

# Add dummy argument to force rebuild starting from that point
ARG UPDATE_ARGOS=unknown

# Install Argos from source
RUN cd /root/ &&\
    git clone https://github.com/MISTLab/argos3.git &&\
    cd argos3 &&\
    git checkout inf3995 &&\
    mkdir build_simulator &&\
    cd build_simulator &&\
    cmake ../src -DCMAKE_BUILD_TYPE=Debug \
     -DARGOS_BUILD_FOR=simulator \
     -DARGOS_THREADSAFE_LOG=ON \
     -DARGOS_DYNAMIC_LOADING=ON &&\
    make -j $(nproc)
RUN touch /root/argos3/build_simulator/argos3.1.gz &&\
    touch /root/argos3/build_simulator/README.html &&\
    cd /root/argos3/build_simulator &&\
    make install
RUN chmod +x /root/argos3/build_simulator/argos_post_install.sh &&\
    ./root/argos3/build_simulator/argos_post_install.sh &&\
    echo "\nsource /root/argos3/build_simulator/setup_env.sh\n" >> /.bashrc

#################################
#          YOUR CODE            #
#################################

# Add dummy argument to force rebuild starting from that point
ARG UPDATE_CODE=unknown

# Clone your repository
# If your repository is private, you will need to use ssh keys, look here: 
# https://stackoverflow.com/a/23411161/8150481
# For now we clone some argos3 examples
RUN cd /root &&\
    git clone https://github.com/MISTLab/argos3-examples.git examples &&\
    cd examples &&\
    git checkout inf3995

# Build your code (here examples)
RUN cd /root/examples &&\
    mkdir build && cd build &&\
    cmake -DCMAKE_BUILD_TYPE=Debug .. &&\
    make -j $(nproc)

# RUN \
# adduser --system --disabled-password myuser \
# && \
# usermod -a -G sudo myuser

# USER myuser


COPY INF3995-103 /root/INF3995-103
#WORKDIR /root/INF3995-103
    
# Install python server packages
RUN cd /root/INF3995-103/server/ &&\
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
    pip3 install sqlalchemy psycopg2-binary &&\
    pip3 install flask marshmallow &&\
    pip3 install -r requirements.txt

# Install Angular packages
RUN curl -sL https://deb.nodesource.com/setup_16.x | sudo bash - &&\
    apt-get install -y nodejs &&\
    cd /root/INF3995-103/Interface/ &&\
    npm install &&\
    # Install Angular CLI
    npm install -g @angular/cli &&\
    # Install Angular Material
    npm install -g @angular/material
    
