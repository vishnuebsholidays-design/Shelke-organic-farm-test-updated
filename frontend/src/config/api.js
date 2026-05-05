/**
 * Central API configuration for local + Render hosting.
 * Local default: http://localhost:5000
 * Render: set VITE_API_URL=https://your-node-backend.onrender.com
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function getUploadUrl(filePath) {
  if (!filePath) return '';
  if (String(filePath).startsWith('http')) return filePath;
  return `${API_BASE_URL}${filePath}`;
}
