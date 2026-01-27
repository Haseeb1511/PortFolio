Nice work, Haseeb — this is actually a **very solid, industry-grade setup** already 👏
React + FastAPI + LangGraph RAG + Docker + Prometheus/Grafana = 🔥 portfolio material.

Let’s do this **step-by-step**, starting **locally**, clean and simple, no cloud yet.

---

## Big Picture (Local Testing)

You want this running **locally**:

```
┌──────────┐      ┌────────────┐
│ React    │ ---> │ FastAPI    │
│ Frontend │      │ (Docker)   │
└──────────┘      │  /metrics  │
                  └─────┬──────┘
                        │
                ┌───────▼────────┐
                │ Prometheus      │
                │ (scrapes metrics│
                └───────┬────────┘
                        │
                ┌───────▼────────┐
                │ Grafana         │
                │ (visualization) │
                └────────────────┘
```

We’ll do **everything with Docker Compose** so later HuggingFace deploy feels natural.

---

## STEP 1: Add Prometheus metrics to FastAPI

### 1. Install dependency

Inside your FastAPI backend:

```bash
pip install prometheus-fastapi-instrumentator
```

Add it to `requirements.txt`.

---

### 2. Instrument FastAPI app

In `app.py` (or `main.py`):

```python
from fastapi import FastAPI
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()

Instrumentator().instrument(app).expose(app)
```

This automatically exposes:

```
GET /metrics
```

👉 Test locally (without Docker first if you want):

```
http://localhost:8000/metrics
```

If you see **lots of text metrics**, you’re good ✅

---

## STEP 2: Dockerize FastAPI correctly (metrics-friendly)

Make sure your FastAPI runs on **0.0.0.0**

### Dockerfile (important bits)

```dockerfile
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build & run quickly:

```bash
docker build -t fastapi-rag .
docker run -p 8000:8000 fastapi-rag
```

Test again:

```
http://localhost:8000/metrics
```

✅ If works → move on

---

## STEP 3: Prometheus configuration

Create a folder:

```
monitoring/
 └── prometheus.yml
```

### `prometheus.yml`

```yaml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: "fastapi"
    metrics_path: /metrics
    static_configs:
      - targets:
          - fastapi:8000
```

⚠️ `fastapi` here is the **Docker service name**, not localhost.

---

## STEP 4: Docker Compose (the heart of it)

Create `docker-compose.yml` in root:

```yaml
version: "3.9"

services:
  fastapi:
    build: ./backend
    container_name: fastapi
    ports:
      - "8000:8000"

  prometheus:
    image: prom/prometheus
    container_name: prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
    depends_on:
      - fastapi

  grafana:
    image: grafana/grafana
    container_name: grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus
```

Run everything:

```bash
docker compose up --build
```

---

## STEP 5: Verify Prometheus

Open:

```
http://localhost:9090
```

### Check:

* **Status → Targets**
* You should see:

  ```
  fastapi (UP)
  ```

If it’s **DOWN**, tell me — we’ll debug networking.

---

## STEP 6: Grafana setup (visual part)

Open:

```
http://localhost:3000
```

### Login

```
user: admin
pass: admin
```

(You’ll be asked to change password)

---

### Add Prometheus as Data Source

1. ⚙️ → Data Sources → Add
2. Choose **Prometheus**
3. URL:

   ```
   http://prometheus:9090
   ```
4. Save & Test → ✅

---

## STEP 7: Create useful dashboards (important for portfolio)

### Example PromQL queries

**Requests per second**

```promql
rate(http_requests_total[1m])
```
**Panel settings**
* Visualization: Time series
* Title: API Requests / Second
* Unit: req/s

**Request latency**

```promql
histogram_quantile(
  0.95,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)
```
* Visualization: Time series
* Unit: seconds (s)
* Title: P95 Request Latency
📸 This screenshot is chef’s kiss for MLOps roles.

**Panel 2 — RAG Endpoint Traffic (Portfolio gold)**

If your endpoint is /chat or /ask:
```promql
# first we have to hit the endpoint(generate traffic then run the below command)
http_requests_total

rate(http_requests_total{handler="/chat"}[1m])
```
Title
* RAG Chat Endpoint – Requests/sec
💡 This proves:
You know observability
You can isolate RAG load




**Status codes**

```promql
sum by (status) (rate(http_requests_total[1m]))
```

These look 🔥 in screenshots for recruiters.

---

## STEP 8: (Optional but powerful) Label RAG endpoints

If your RAG endpoint is `/chat` or `/ask`:

Prometheus will already expose:

* endpoint path
* method
* status

So you can do:

```promql
rate(http_requests_total{path="/chat"}[1m])
```

Perfect for showing **RAG traffic & load**.

---




# DOCKER COMPOSE FILE

```yml
services:
  fastapi:
    build:
      context: .                  # start building from project root
      dockerfile: backend/Dockerfile
    container_name: fastapi
    env_file:   # env file
      - .env
    ports:
      - "8000:8000"

  prometheus:
    image: prom/prometheus
    container_name: prometheus
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus   #  persistent storage so visalizaiton stay their even after restart
    ports:
      - "9090:9090"
    depends_on:
      - fastapi

  grafana:
    image: grafana/grafana
    container_name: grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus

volumes:
  prometheus_data:


#PROMETEUS
# docker compose up --build
# verify prometheus local:
#http://localhost:9090  #prometeus



# GRAFANA
# http://localhost:3000
# user: admin
# pass: admin

```