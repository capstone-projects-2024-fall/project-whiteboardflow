# Use a Python base image (Python 3.11)
FROM python:3.11-slim

# Install system dependencies for PyAudio
RUN apt-get update && apt-get install -y portaudio19-dev && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy all project files into the container
COPY . /app

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port for FastAPI (default is 8080)
EXPOSE 8080

# Command to run the FastAPI app with uvicorn
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]
# Use a Python base image (Python 3.11)
FROM python:3.11-slim

# Install system dependencies for PyAudio
RUN apt-get update && apt-get install -y portaudio19-dev && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy all project files into the container
COPY . /app

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port for FastAPI (default is 8080)
EXPOSE 8080

# Command to run the FastAPI app with uvicorn
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]
