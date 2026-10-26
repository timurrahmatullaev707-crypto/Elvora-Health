// Vercel Serverless Function: /api/telegram/link
// Secure Telegram Account Linking with temporary single-use cryptographic token

import { randomBytes } from 'crypto';

// In-memory / process-level linking token store with 15-minute TTL
interface LinkingEntry {
  token: string;
  patientPhone: string;
  patientName: string;
  patientId?: string;
  expiresAt: number;
  linkedChatId?: string;
  linkedUsername?: string;
  linkedAt?: number;
  status: 'pending' | 'linked' | 'expired';
}

// Global registry shared across invocations in serverless warm instance
declare global {
  // eslint-disable-next-line no-var
  var __telegramLinkingStore: Map<string, LinkingEntry> | undefined;
}

if (!global.__telegramLinkingStore) {
  global.__telegramLinkingStore = new Map<string, LinkingEntry>();
}

const linkingStore = global.__telegramLinkingStore;

export function getLinkingStore() {
  return linkingStore;
}

export function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [key, entry] of linkingStore.entries()) {
    if (entry.expiresAt < now && entry.status === 'pending') {
      linkingStore.delete(key);
    }
  }
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  cleanupExpiredTokens();

  // GET: Check linking status for a token or phone
  if (req.method === 'GET') {
    const token = req.query?.token;
    const phone = req.query?.phone;

    if (token) {
      const entry = linkingStore.get(String(token));
      if (!entry) {
        return res.status(404).json({ success: false, error: 'Havola topilmadi yoki muddati tugagan.' });
      }
      if (entry.expiresAt < Date.now() && entry.status === 'pending') {
        entry.status = 'expired';
        return res.status(200).json({ success: false, status: 'expired', error: 'Havola muddati o\'tgan.' });
      }
      return res.status(200).json({
        success: true,
        status: entry.status,
        patientName: entry.patientName,
        linkedChatId: entry.linkedChatId,
        linkedUsername: entry.linkedUsername,
      });
    }

    if (phone) {
      const cleanPhone = String(phone).replace(/\D/g, '');
      // Find latest linked entry for this phone
      for (const entry of Array.from(linkingStore.values()).reverse()) {
        const entryPhone = entry.patientPhone.replace(/\D/g, '');
        if (entryPhone === cleanPhone && entry.status === 'linked') {
          return res.status(200).json({
            success: true,
            status: 'linked',
            linkedChatId: entry.linkedChatId,
            linkedUsername: entry.linkedUsername,
          });
        }
      }
      return res.status(200).json({ success: true, status: 'not_linked' });
    }

    return res.status(400).json({ error: 'token yoki phone parametri kiritilishi lozim.' });
  }

  // POST: Create a new single-use linking token
  if (req.method === 'POST') {
    const { patientPhone, patientName, patientId } = req.body || {};

    if (!patientPhone) {
      return res.status(400).json({ error: 'Bemor telefon raqami talab qilinadi.' });
    }

    // Generate secure 16-byte random token
    const rawToken = randomBytes(12).toString('hex');
    const token = `elv_${rawToken}`;
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    const botUsername =
      process.env.TELEGRAM_BOT_USERNAME?.replace('@', '') ||
      process.env.VITE_TELEGRAM_BOT_USERNAME?.replace('@', '') ||
      'ElvoraHealthBot';

    const deepLink = `https://t.me/${botUsername}?start=link_${token}`;

    const newEntry: LinkingEntry = {
      token,
      patientPhone: String(patientPhone),
      patientName: String(patientName || 'Bemor'),
      patientId: patientId ? String(patientId) : undefined,
      expiresAt,
      status: 'pending',
    };

    linkingStore.set(token, newEntry);

    return res.status(200).json({
      success: true,
      token,
      deepLink,
      botUsername,
      expiresAt,
      expiresInSeconds: 900,
    });
  }

  return res.status(405).json({ error: 'Faqat GET yoki POST so\'rovlari qabul qilinadi.' });
}
