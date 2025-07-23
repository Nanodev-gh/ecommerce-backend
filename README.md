# ecommerce-backend
ecommerce backend with node.js
Ecommerce Backend
This project is an ecommerce backend built using Node.js. It provides the core server-side functionality required for managing an ecommerce platform, including handling products, users, orders, authentication, and more.

## Features
- RESTful API for managing products, orders, and users
- User authentication and authorization
- Integration with payment gateways
- Database support with MongoDB
- Environment configuration with dotenv

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ecommerce-backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ecommerce-backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file and configure your environment variables.
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Usage
To start the server, run:
```bash
npm start
```
The API will be available at `http://localhost:5000`.

## License
This project is licensed under the MIT License.
