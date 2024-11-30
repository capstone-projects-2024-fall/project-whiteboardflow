# Use a Python base image
FROM python:3.11-slim

# Install system dependencies for PyAudio and GCC
RUN apt-get update && apt-get install -y \
    portaudio19-dev \
    build-essential \
    gcc \
    python3-dev \
    && apt-get clean

# Set working directory
WORKDIR /app

# Copy all project files into the container
COPY . /app

# Install Python dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port (FastAPI default is 8080)
EXPOSE 8080

# Command to run the FastAPI app
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8080"]