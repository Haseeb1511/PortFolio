FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1


WORKDIR /app


COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt


COPY backend/src/ ./src
COPY backend/app.py .

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]




# docker build image(or rebuild) from the root folder(best way)
#docker build -t fastapi-backend -f backend/Dockerfile .

# to run
#docker run -p 8000:8000 fastapi-backend
#to run with .env
#docker run -p 8000:8000 --env-file .env fastapi-backend


# to check locally if monitoring is working or not
# http://localhost:8000/metrics
