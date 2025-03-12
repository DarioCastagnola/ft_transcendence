# ft\_transcendence

## Overview

**ft\_transcendence** is the final Common Core project of **42 École**, aiming to create a web application based on the famous Pong game. This project required adherence to strict prerequisites, which can be found in the project [subject](./backend/en.subject.pdf), and the selection of various features/modules to implement. Our implementation includes a modern tech stack and advanced functionalities to provide an engaging user experience.

## Features Implemented

We selected and implemented the following features:

- **Backend Framework:** Built with Django for robustness and scalability.
- **Frontend Framework:** Developed using Bootstrap for a responsive and modern UI.
- **Database:** PostgreSQL for efficient data management.
- **User Management & Authentication:** Standard user authentication, tournament-based user tracking.
- **AI Opponent:** A challenging AI to play against.
- **User & Game Stats Dashboards:** Real-time tracking of user and game statistics.
- **Security Enhancements:** Implementation of Two-Factor Authentication (2FA) and JWT for secure authentication.
- **Remote Authentication:** Allowing users to authenticate remotely.
- **Microservices Architecture:** The backend is designed using microservices principles for better scalability and maintainability.
- **Advanced 3D Techniques:** Enhancing gameplay with 3D visual effects.
- **Browser Compatibility:** Ensuring support across various modern browsers.

## Getting Started

### Prerequisites

To run the application, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- (Optional) **Makefile** (for simplified execution)

### Installation & Running

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/ft_transcendence.git
   cd ft_transcendence
   ```
2. Run the application using either:
   - **Makefile** (if installed):
     ```sh
     make
     ```
   - **Docker Compose**:
     ```sh
     docker compose -f docker-compose.yml up --build
     ```
3. The application will be accessible at:
   ```
   https://<defined_nginx_host>:<defined_nginx_port>
   ```

### Configuration

- All configurations can be set in:
  - `docker-compose.yml`
  - `.env` files
  - Nginx configuration files

## Technologies Used

- **Backend:** Django
- **Frontend:** Bootstrap
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose
- **Security:** 2FA, JWT Authentication
- **Microservices Architecture**
- **Game AI & 3D Rendering**
- **Remote Authentication & User Management**

