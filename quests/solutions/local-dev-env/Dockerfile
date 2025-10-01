# Use Ubuntu as the base image for a familiar development environment
FROM ubuntu:24.04

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install essential development tools and languages
RUN apt-get update && apt-get install -y \
    # Version control
    git \
    # Code editor
    vim \
    nano \
    # Networking tools
    curl \
    wget \
    # Build essentials
    build-essential \
    # Python and pip
    python3 \
    python3-pip \
    # Additional utilities
    zip \
    unzip \
    # Clean up to reduce image size
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install nvm (Node Version Manager)
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=20.18.0

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash \
    && . "$NVM_DIR/nvm.sh" \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# Add node and npm to PATH
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install common global npm packages for web development
RUN npm install -g \
    # Development servers
    live-server \
    http-server \
    # Build tools
    typescript \
    # Linters and formatters
    eslint \
    prettier

# Set working directory
WORKDIR /workspace

# Default command - start a bash shell
CMD ["/bin/bash"]