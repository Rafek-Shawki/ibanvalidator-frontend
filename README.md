# IBAN Validator - Frontend

This project is a frontend application for validating IBANs using React, Redux Toolkit, and Material UI. It interacts
with a backend service for IBAN validation, supporting multiple languages and light/dark themes.

## Core Features

### 1. **IBAN Validation with Redux Toolkit**

- **API Service**: `ibanValidationAPI` utilizes Redux Toolkit's `createApi` to handle requests.
- **Endpoint**: The `/iban/validate` endpoint sends the IBAN for validation and returns detailed results.
- **Response Handling**: Uses `IResponse` and `IValidationResult` interfaces to process validation responses.

### 2. **Multilingual Support (i18n)**

- Uses `react-i18next` for language support.
- **Languages**: Currently supports English (`en`) and German (`de`).
- **Translation Setup**: Resources for each language are defined in `resources` within the `i18n` configuration,
  covering various labels, instructions, and messages displayed in the app.

### 3. **UI Components and Theme Management**

- **Light/Dark Theme**: Users can toggle between light and dark modes using Material UI’s theme provider.
- **Material UI Components**: Includes styled components like `TextField`, `Button`, `Select`, and `Tooltip` for an
  intuitive user experience.
- **Toasts for Notifications**: Uses `react-toastify` to show success, warning, and error messages for different
  validation states.

### 4. **State Management**

- **Redux Store Setup**: Combines reducers, includes middleware for the API, and enables logging with `redux-logger`.
- **State Types**: Custom types for `RootState`, `AppStore`, and `AppDispatch` to ensure type safety across the app.

### 5. **Language and Theme Toggle**

- **Language Selector**: Users can switch languages through a `Select` dropdown menu.
- **Theme Toggle**: Allows users to switch between light and dark modes using an icon button, adjusting the entire UI to
  match the selected theme.

## Example Usage

### IBAN Validation Request Flow

1. **User Action**: Enter an IBAN and click "Verify."
2. **API Request**: `ibanValidationAPI` sends the IBAN to `/iban/validate`.
3. **Response Handling**: Displays validation results, showing if the IBAN is valid or not, along with bank details if
   available.

### Sample Translation Structure

The translations cover labels, messages, and errors:

```json
{
	"welcome": "Welcome to the IBAN Validator",
	"ibanLabel": "Enter IBAN",
	"ibanValid": "IBAN is valid!",
	"ibanInvalid": "IBAN is invalid.",
	"invalidityCode1": "That was not a german IBAN",
	"invalidityCode2": "IBAN is invalid."
}
```

## Quick Start Guide

### Prerequisites

- Node.js and npm installed.

### Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run the Development Server**:
   ```bash
   npm run dev
   ```

### Folder Structure Overview

- **src/localization**: i18n configuration and language resources.
- **src/services**: API services for IBAN validation and toast notifications.
- **src/models**: Type definitions for API responses.
- **src/store**: Redux setup for managing the application state.

This frontend provides a seamless experience for IBAN validation with robust state management, multilingual support, and
customizable theming.