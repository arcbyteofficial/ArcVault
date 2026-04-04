import { useState, useEffect } from 'react';

// Basic wrapper around Web Crypto API for client-side AES-GCM encryption
export const encryptData = async (text, password) => {
    try {
        const enc = new TextEncoder();
        const pwHash = await crypto.subtle.digest('SHA-256', enc.encode(password));
        const key = await crypto.subtle.importKey('raw', pwHash, { name: 'AES-GCM' }, false, ['encrypt']);
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, enc.encode(text));
        
        // Return base64 of iv + encrypted
        const buffer = new Uint8Array(iv.length + encrypted.byteLength);
        buffer.set(iv, 0);
        buffer.set(new Uint8Array(encrypted), iv.length);
        return btoa(String.fromCharCode.apply(null, buffer));
    } catch (e) {
        console.error('Encryption failed', e);
        return null;
    }
};

export const decryptData = async (ciphertextBase64, password) => {
    try {
        const enc = new TextEncoder();
        const buffer = new Uint8Array(atob(ciphertextBase64).split('').map(c => c.charCodeAt(0)));
        const iv = buffer.slice(0, 12);
        const data = buffer.slice(12);
        
        const pwHash = await crypto.subtle.digest('SHA-256', enc.encode(password));
        const key = await crypto.subtle.importKey('raw', pwHash, { name: 'AES-GCM' }, false, ['decrypt']);
        
        const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, data);
        return new TextDecoder().decode(decrypted);
    } catch (e) {
        console.error('Decryption failed', e);
        return null;
    }
};

export const useSecureStore = (keyName) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(keyName);
        if (stored) {
             // In a real app we would prompt for master password to trigger decryptData
             // For UI mockup we'll load mock
        }
    }, [keyName]);

    const saveSecureItem = async (item, masterPassword) => {
        // e.g. encryptData(JSON.stringify(item), masterPassword)
    };

    return { data, saveSecureItem };
};
