## Access From: https://workoutapp-frontend-j4ve.onrender.com
# Workout App Backend

This is the backend service for the Workout App, hosted on Render.

## Important Notes

- The backend is currently hosted on Render’s free tier.  
- Free-tier instances automatically spin down after periods of inactivity.  
- If the backend seems unresponsive (e.g., requests time out or the frontend cannot connect), you may need to manually wake it up by visiting the Render link in your browser:

https://workoutapp-backend-0dpw.onrender.com/

After the first request, the server may take 15–30 seconds to boot up before responding to API requests.

---

## Running Locally

If you prefer to run the backend locally (recommended for development), follow these steps (you may have to alter some environment variables since the code is only built to support production):

### 1. Clone the repository
```bash
git clone https://github.com/your-username/workoutapp-backend.git
```
### 2. Install dependencies
```bash
npm install
```

### 3. Navigate into the backend and run it
```bash
cd backend
npm run dev
```

### 4. Navigate into the frontend and run it
```bash
cd frontend
npm start
```


