clear
export NODE_ENV=production
npm run build
firebase deploy
# firebase deploy --only functions
# firebase functions:log