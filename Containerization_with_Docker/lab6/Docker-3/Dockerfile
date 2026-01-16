FROM python:3.15.0a3-alpine3.23
WORKDIR /app
COPY . .
ENV APP_MODE=production
ENV APP_REGION=canada-west
RUN apk add --no-cache gcc musl-dev python3-dev libffi-dev
RUN pip install --upgrade pip setuptools wheel
RUN pip install flask 
EXPOSE 8080
CMD ["python","app.py"]

