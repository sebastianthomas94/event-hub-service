# Event Hub Service with Jodo API Integration

This project manages student creation events, retries failed operations, and interacts with the Jodo API for student account creation.

## Key Features
- **Event-Driven Architecture**: Publishes events to RabbitMQ for asynchronous handling.
- **API Integration**: Sends API requests to Jodo for creating student accounts.
- **Retry Mechanism**: Automatically retries failed API requests using a background service(with mongodb).
- **Modular Design**: Separate modules for `JodoService`, `RetryService`, and `Student` management.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start RabbitMQ and MongoDB.
    ```bash
    docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.13-management
    ```
3. Run the project:
    ```bash
    pnpn start
    ```