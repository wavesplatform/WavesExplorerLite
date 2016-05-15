FROM    ubuntu

# Install python3
RUN     apt-get update
RUN     apt-get install -y python3

# Copy html
ADD src/ /src
RUN cd /src

# Run http server on port 8080
EXPOSE  8080
CMD ["python3", "-m", "http.server", "8080"]
