# UniFi Device Reset Script

This Node.js script allows you to reset (reconnect) a device on a UniFi network by sending a command to the UniFi Controller's API. It uses `axios` for HTTP requests and expects specific environment variables for authentication and connection details.

## Prerequisites

- Node.js installed on your system.
- Access to a UniFi Controller with API capabilities.
- A UniFi local account with no SSO enabled
- The `axios` and `dotenv` Node.js modules.
- Network device's MAC address to be reset.

## Installation

1. Clone this repository or copy the script into a local directory.

2. Navigate to the directory in your terminal:

    ```bash
    cd /path/to/your/directory
    ```

3. Install the required dependencies:

    ```bash
    npm install axios dotenv
    ```

4. Create a `.env` file in the root directory of the project with the following variables:

    ```env
    CONTROLLER_URL=https://your-controller-url
    USERNAME=your-username
    PASSWORD=your-password
    SITE=default
    DEVICE_MAC=00:11:22:33:44:55
    ```

    - **`CONTROLLER_URL`**: URL of the UniFi Controller (e.g., `https://192.168.1.1:8443`).
    - **`USERNAME`**: Username to log in to the UniFi Controller.
    - **`PASSWORD`**: Password for the specified username.
    - **`SITE`**: The site name on the UniFi Controller. Default is "default". Replace it if your site name is different.
    - **`DEVICE_MAC`**: The MAC address of the device you want to reset.

5. Save the `.env` file.

## Usage

1. Run the script using Node.js:

    ```bash
    node main.js
    ```

2. The script will:
    1. Log in to the UniFi Controller using the provided credentials.
    2. Send a command to reconnect the device with the specified MAC address.
    3. Log out of the UniFi Controller.

## Script Breakdown

- **`login()`**: Authenticates with the UniFi Controller using the provided username and password. Saves the session cookie for subsequent API requests.
- **`reconnectClient()`**: Sends the command to reset (reconnect) the device using its MAC address.
- **`logout()`**: Logs out from the UniFi Controller.
- **`main()`**: Orchestrates the login, device reset, and logout workflow.

## Notes

- The script uses `httpsAgent` with `rejectUnauthorized: false` to ignore SSL certificate warnings if you are using a self-signed certificate on the UniFi Controller. Modify this setting as needed for production use.
- Ensure the provided credentials have sufficient permissions to execute the device reset command on the specified UniFi Controller.
- The `axios` instance is configured to include session cookies automatically for authenticated requests.

## Error Handling

- The script includes basic error handling for login, device reset, and logout operations. Errors are logged to the console with relevant messages.

## License

This project is licensed under the MIT License.
