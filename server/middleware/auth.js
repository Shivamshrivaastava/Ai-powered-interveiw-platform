import jwt from 'jsonwebtoken';
import { User } from '../models.js';
export async function auth(req, res, next) { try { const token = req.headers.authorization?.replace('Bearer ', ''); if (!token) throw Error('Missing token'); const { id } = jwt.verify(token, process.env.JWT_SECRET); req.user = await User.findById(id).select('-password'); if (!req.user) throw Error('User unavailable'); next(); } catch { res.status(401).json({ success: false, message: 'Authentication required or token expired.' }); } }
export function admin(req, res, next) { if (req.user?.role !== 'admin') return res.status(403).json({ success: false, message: 'Admin access required.' }); next(); }
