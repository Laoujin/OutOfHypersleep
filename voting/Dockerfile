FROM node:22-alpine
WORKDIR /app/voting
COPY voting/package.json voting/package-lock.json ./
RUN npm ci --omit=dev
COPY voting/ ./
COPY pods.yaml /app/pods.yaml
ENV PORT=3000 DATA_DIR=/data NODE_ENV=production
VOLUME /data
EXPOSE 3000
CMD ["node", "server.js"]
