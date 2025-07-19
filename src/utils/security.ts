import DOMPurify from 'dompurify';
import validator from 'validator';

// XSS Protection
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove dangerous characters and patterns
  let sanitized = input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/['"]/g, '') // Remove quotes
    .replace(/[*]/g, '') // Remove asterisk
    .replace(/[~]/g, '') // Remove tilde
    .replace(/[{}[\]]/g, '') // Remove brackets
    .replace(/[:]/g, '') // Remove colon
    .replace(/[_]/g, '') // Remove underscore
    .trim();

  // Use DOMPurify for additional sanitization
  sanitized = DOMPurify.sanitize(sanitized, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });

  return sanitized;
};

// SQL Injection Protection
export const sanitizeForDatabase = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove SQL injection patterns
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
    /(--|\/\*|\*\/|;|'|"|`)/g,
    /(\bOR\b|\bAND\b).*?=/gi
  ];

  let sanitized = input;
  sqlPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });

  return sanitized.trim();
};

// Email validation
export const validateEmail = (email: string): boolean => {
  return validator.isEmail(sanitizeInput(email));
};

// URL validation
export const validateURL = (url: string): boolean => {
  const sanitized = sanitizeInput(url);
  return validator.isURL(sanitized) || sanitized === '';
};

// General input validation
export const validateInput = (input: string, maxLength: number = 1000): boolean => {
  if (!input || typeof input !== 'string') return false;
  
  const sanitized = sanitizeInput(input);
  return sanitized.length > 0 && sanitized.length <= maxLength;
};

// Phone number validation
export const validatePhone = (phone: string): boolean => {
  const sanitized = sanitizeInput(phone);
  return validator.isMobilePhone(sanitized) || /^\+?[\d\s\-\(\)]{10,}$/.test(sanitized);
};

// Comprehensive form data sanitization
export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  Object.keys(data).forEach(key => {
    const value = data[key];
    
    if (typeof value === 'string') {
      sanitized[key] = sanitizeForDatabase(sanitizeInput(value));
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeFormData(value);
    } else {
      sanitized[key] = value;
    }
  });
  
  return sanitized;
};