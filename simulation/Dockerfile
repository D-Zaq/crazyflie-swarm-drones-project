FROM ubuntu:18.04
LABEL Maintainer="Pierre-Yves Lajoie <pierre-yves.lajoie@polymtl.ca>"
LABEL argos-example.version="0.1"

# Install common dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    dpkg \ 
    git \
    pkg-config \
    python \
    python-dev \
    python-numpy \
    sudo \
    software-properties-common \
    && rm -rf /var/lib/apt/lists/*

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

COPY ./argos ./root/simulation

ENV PORT=4000

EXPOSE 80
EXPOSE 4000

# Build your code (here examples)
#WORKDIR ./simulation

RUN cd /root/simulation &&\
    mkdir build && cd build &&\
    cmake -DCMAKE_BUILD_TYPE=Debug .. &&\
    make -j $(nproc)

#CMD ["argos3", "-c", "./experiments/crazyflie_sensing.argos"]

# Make ssh dir
#RUN mkdir /root/.ssh/

# Copy over private key, and set permissions
# Warning! Anyone who gets their hands on this image will be able
# to retrieve this private key file from the corresponding image layer
#ADD id_rsa /root/.ssh/id_rsa

# Create known_hosts
#RUN touch /root/.ssh/known_hosts
# Add gitlab key
# RUN ssh-keyscan gitlab.com >> /root/.ssh/known_hosts

# RUN git clone git@gitlab.com:polytechnique-montr-al/inf3995/20221/equipe-103/INF3995-103.git &&\
#     cd simulation &&\
#     git checkout simulation

# RUN cd /root/examples &&\
#     mkdir build && cd build &&\
#     cmake -DCMAKE_BUILD_TYPE=Debug .. &&\
#     make -j $(nproc)


# Clone your repository
# If your repository is private, you will need to use ssh keys, look here: 
# https://stackoverflow.com/a/23411161/8150481
# For now we clone some argos3 examples
# # RUN cd /root &&\
# #     git clone https://github.com/MISTLab/argos3-examples.git examples &&\
# #     cd examples &&\
# #     git checkout inf3995

# # # Build your code (here examples)
# # RUN cd /root/examples &&\
# #     mkdir build && cd build &&\
# #     cmake -DCMAKE_BUILD_TYPE=Debug .. &&\
# #     make -j $(nproc)