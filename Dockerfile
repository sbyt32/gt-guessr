FROM python:3.10

WORKDIR /gtguessr
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENTRYPOINT [ "python3", "-m", "hypercorn", "gtguessr.main:app", "--bind", "0.0.0.0:8000"]
