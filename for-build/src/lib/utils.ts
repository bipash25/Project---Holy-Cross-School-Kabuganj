import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type DateFormat = "full" | "short" | "relative" | "time";

export function formatDate(
  date: string | Date,
  formatType: DateFormat = "full",
) {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  switch (formatType) {
    case "full":
      return format(dateObj, "MMMM d, yyyy");
    case "short":
      return format(dateObj, "MMM d, yyyy");
    case "relative":
      return formatDistanceToNow(dateObj, { addSuffix: true });
    case "time":
      return format(dateObj, "h:mm a");
    default:
      return format(dateObj, "MMMM d, yyyy");
  }
}

interface URLValidationOptions {
  allowedProtocols?: string[];
  requireProtocol?: boolean;
  allowLocal?: boolean;
}

export function validateURL(url: string, options: URLValidationOptions = {}) {
  const {
    allowedProtocols = ["http:", "https:"],
    requireProtocol = true,
    allowLocal = false,
  } = options;

  try {
    // Add protocol if missing and required
    const urlToTest =
      !url.includes("://") && requireProtocol ? `https://${url}` : url;

    const urlObj = new URL(urlToTest);

    // Check protocol
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return {
        isValid: false,
        error: `URL must use one of these protocols: ${allowedProtocols.join(", ")}`,
      };
    }

    // Check for local URLs
    if (
      !allowLocal &&
      (urlObj.hostname === "localhost" || urlObj.hostname === "127.0.0.1")
    ) {
      return {
        isValid: false,
        error: "Local URLs are not allowed",
      };
    }

    // Basic format validation
    const urlRegex =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    if (!urlRegex.test(urlToTest)) {
      return {
        isValid: false,
        error: "Invalid URL format",
      };
    }

    return {
      isValid: true,
      normalizedURL: urlObj.href,
    };
  } catch (error) {
    return {
      isValid: false,
      error: "Invalid URL",
    };
  }
}

// Helper function for quick URL validation
export function isValidURL(url: string): boolean {
  return validateURL(url).isValid;
}

interface TruncateOptions {
  length?: number;
  stripHtml?: boolean;
  appendix?: string;
  wordBoundary?: boolean;
}

export function truncateText(text: string, options: TruncateOptions = {}) {
  const {
    length = 100,
    stripHtml = true,
    appendix = "...",
    wordBoundary = true,
  } = options;

  // Return original text if it's shorter than the limit
  if (text.length <= length) return text;

  // Strip HTML if needed
  let processedText = stripHtml ? text.replace(/<[^>]*>/g, "") : text;

  // Basic truncation
  let truncated = processedText.slice(0, length);

  if (wordBoundary) {
    // Find the last space within the length limit
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      truncated = truncated.substr(0, lastSpace);
    }
  }

  // Remove any trailing punctuation
  truncated = truncated.replace(/[,.!?]$/, "");

  // Add appendix
  return `${truncated}${appendix}`;
}

// Helper functions for common use cases
export function truncateTitle(title: string) {
  return truncateText(title, { length: 60, stripHtml: true });
}

export function truncateDescription(description: string) {
  return truncateText(description, { length: 160, stripHtml: true });
}

export function truncateExcerpt(text: string) {
  return truncateText(text, {
    length: 280,
    stripHtml: true,
    wordBoundary: true,
  });
}

interface FileSizeValidationOptions {
  maxSize?: number; // in bytes
  minSize?: number; // in bytes
  allowedTypes?: string[];
}

interface FileSizeValidationResult {
  isValid: boolean;
  error?: string;
  formattedSize?: string;
}

// Common file size limits in bytes
export const FILE_SIZE_LIMITS = {
  IMAGE: 5 * 1024 * 1024, // 5MB
  DOCUMENT: 10 * 1024 * 1024, // 10MB
  VIDEO: 100 * 1024 * 1024, // 100MB
  AVATAR: 2 * 1024 * 1024, // 2MB
} as const;

// Format file size to human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Validate file size and type
export function validateFileSize(
  file: File,
  options: FileSizeValidationOptions = {},
): FileSizeValidationResult {
  const {
    maxSize = FILE_SIZE_LIMITS.IMAGE,
    minSize = 0,
    allowedTypes = [],
  } = options;

  // Check minimum size
  if (file.size < minSize) {
    return {
      isValid: false,
      error: `File size must be at least ${formatFileSize(minSize)}`,
      formattedSize: formatFileSize(file.size),
    };
  }

  // Check maximum size
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size must not exceed ${formatFileSize(maxSize)}`,
      formattedSize: formatFileSize(file.size),
    };
  }

  // Check file type if specified
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type must be: ${allowedTypes.join(", ")}`,
      formattedSize: formatFileSize(file.size),
    };
  }

  return {
    isValid: true,
    formattedSize: formatFileSize(file.size),
  };
}

// Helper function for quick image validation
export function validateImage(file: File): FileSizeValidationResult {
  return validateFileSize(file, {
    maxSize: FILE_SIZE_LIMITS.IMAGE,
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  });
}

// Helper function for quick avatar validation
export function validateAvatar(file: File): FileSizeValidationResult {
  return validateFileSize(file, {
    maxSize: FILE_SIZE_LIMITS.AVATAR,
    allowedTypes: ["image/jpeg", "image/png"],
  });
}

interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

interface ImageDimensionValidationOptions {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  exactWidth?: number;
  exactHeight?: number;
  aspectRatio?: number;
  aspectRatioTolerance?: number;
}

interface ImageDimensionValidationResult {
  isValid: boolean;
  error?: string;
  dimensions?: ImageDimensions;
}

// Common dimension presets
export const IMAGE_DIMENSION_PRESETS = {
  THUMBNAIL: { width: 150, height: 150 },
  AVATAR: { width: 200, height: 200 },
  CAROUSEL: { width: 1920, height: 1080 },
  BANNER: { width: 1200, height: 400 },
  CARD: { width: 400, height: 300 },
} as const;

// Get image dimensions from File or Blob
export function getImageDimensions(
  file: File | Blob,
): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src); // Clean up
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src); // Clean up
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);
  });
}

// Validate image dimensions
export async function validateImageDimensions(
  file: File | Blob,
  options: ImageDimensionValidationOptions = {},
): Promise<ImageDimensionValidationResult> {
  try {
    const dimensions = await getImageDimensions(file);
    const {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      exactWidth,
      exactHeight,
      aspectRatio,
      aspectRatioTolerance = 0.01,
    } = options;

    // Check exact dimensions
    if (exactWidth && dimensions.width !== exactWidth) {
      return {
        isValid: false,
        error: `Image width must be exactly ${exactWidth}px`,
        dimensions,
      };
    }
    if (exactHeight && dimensions.height !== exactHeight) {
      return {
        isValid: false,
        error: `Image height must be exactly ${exactHeight}px`,
        dimensions,
      };
    }

    // Check width constraints
    if (minWidth && dimensions.width < minWidth) {
      return {
        isValid: false,
        error: `Image width must be at least ${minWidth}px`,
        dimensions,
      };
    }
    if (maxWidth && dimensions.width > maxWidth) {
      return {
        isValid: false,
        error: `Image width must not exceed ${maxWidth}px`,
        dimensions,
      };
    }

    // Check height constraints
    if (minHeight && dimensions.height < minHeight) {
      return {
        isValid: false,
        error: `Image height must be at least ${minHeight}px`,
        dimensions,
      };
    }
    if (maxHeight && dimensions.height > maxHeight) {
      return {
        isValid: false,
        error: `Image height must not exceed ${maxHeight}px`,
        dimensions,
      };
    }

    // Check aspect ratio
    if (aspectRatio) {
      const actualRatio = dimensions.width / dimensions.height;
      const ratioDiff = Math.abs(actualRatio - aspectRatio);
      if (ratioDiff > aspectRatioTolerance) {
        return {
          isValid: false,
          error: `Image aspect ratio must be ${aspectRatio.toFixed(2)}`,
          dimensions,
        };
      }
    }

    return {
      isValid: true,
      dimensions,
    };
  } catch (error) {
    return {
      isValid: false,
      error: "Failed to validate image dimensions",
    };
  }
}

// Helper functions for common image dimension validations
export async function validateCarouselImage(
  file: File,
): Promise<ImageDimensionValidationResult> {
  return validateImageDimensions(file, {
    minWidth: 1920,
    minHeight: 1080,
    aspectRatio: 16 / 9,
    aspectRatioTolerance: 0.1,
  });
}

export async function validateAvatarDimensions(
  file: File,
): Promise<ImageDimensionValidationResult> {
  return validateImageDimensions(file, {
    minWidth: 200,
    minHeight: 200,
    aspectRatio: 1,
    aspectRatioTolerance: 0.01,
  });
}

export async function validateBannerImage(
  file: File,
): Promise<ImageDimensionValidationResult> {
  return validateImageDimensions(file, {
    minWidth: 1200,
    minHeight: 400,
    aspectRatio: 3,
    aspectRatioTolerance: 0.1,
  });
}

interface PhoneNumberOptions {
  format?: "national" | "international" | "local";
  country?: string;
  separator?: string;
}

interface PhoneValidationResult {
  isValid: boolean;
  formattedNumber?: string;
  error?: string;
}

// Common phone number formats
export const PHONE_FORMATS = {
  IN: {
    pattern: /^(\+91|0)?[6789]\d{9}$/,
    example: "+91 98765 43210",
    length: 10,
  },
  US: {
    pattern: /^(\+1|1)?[2-9]\d{9}$/,
    example: "+1 (555) 123-4567",
    length: 10,
  },
  UK: {
    pattern: /^(\+44|0)?[1-9]\d{9}$/,
    example: "+44 7911 123456",
    length: 10,
  },
} as const;

// Format phone number
export function formatPhoneNumber(
  phoneNumber: string,
  options: PhoneNumberOptions = {},
): string {
  const { format = "national", country = "IN", separator = " " } = options;

  // Remove all non-digit characters
  let cleaned = phoneNumber.replace(/\D/g, "");

  // Handle different country formats
  switch (country) {
    case "IN":
      if (format === "international") {
        if (cleaned.length === 10) {
          return `+91${separator}${cleaned.slice(0, 5)}${separator}${cleaned.slice(5)}`;
        }
        if (cleaned.length === 12 && cleaned.startsWith("91")) {
          return `+${cleaned.slice(0, 2)}${separator}${cleaned.slice(2, 7)}${separator}${cleaned.slice(7)}`;
        }
      } else {
        if (cleaned.length === 10) {
          return `${cleaned.slice(0, 5)}${separator}${cleaned.slice(5)}`;
        }
      }
      break;

    case "US":
      if (format === "international") {
        if (cleaned.length === 10) {
          return `+1${separator}(${cleaned.slice(0, 3)})${separator}${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        if (cleaned.length === 11 && cleaned.startsWith("1")) {
          return `+${cleaned.slice(0, 1)}${separator}(${cleaned.slice(1, 4)})${separator}${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        }
      } else {
        if (cleaned.length === 10) {
          return `(${cleaned.slice(0, 3)})${separator}${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
      }
      break;

    case "UK":
      if (format === "international") {
        if (cleaned.length === 10) {
          return `+44${separator}${cleaned.slice(0, 4)}${separator}${cleaned.slice(4)}`;
        }
        if (cleaned.length === 12 && cleaned.startsWith("44")) {
          return `+${cleaned.slice(0, 2)}${separator}${cleaned.slice(2, 6)}${separator}${cleaned.slice(6)}`;
        }
      } else {
        if (cleaned.length === 10) {
          return `${cleaned.slice(0, 4)}${separator}${cleaned.slice(4)}`;
        }
      }
      break;
  }

  // Return original number if no formatting applied
  return phoneNumber;
}

// Validate phone number
export function validatePhoneNumber(
  phoneNumber: string,
  country: keyof typeof PHONE_FORMATS = "IN",
): PhoneValidationResult {
  // Remove all non-digit characters for validation
  const cleaned = phoneNumber.replace(/\D/g, "");
  const format = PHONE_FORMATS[country];

  if (!format.pattern.test(cleaned)) {
    return {
      isValid: false,
      error: `Invalid phone number format. Example: ${format.example}`,
    };
  }

  if (
    cleaned.length !== format.length &&
    cleaned.length !== format.length + 2
  ) {
    // +country code
    return {
      isValid: false,
      error: `Phone number must be ${format.length} digits (excluding country code)`,
    };
  }

  return {
    isValid: true,
    formattedNumber: formatPhoneNumber(cleaned, {
      country,
      format: "international",
    }),
  };
}

// Helper functions for common phone number formats
export function formatIndianPhoneNumber(phoneNumber: string): string {
  return formatPhoneNumber(phoneNumber, {
    country: "IN",
    format: "international",
  });
}

export function formatUSPhoneNumber(phoneNumber: string): string {
  return formatPhoneNumber(phoneNumber, {
    country: "US",
    format: "international",
  });
}

export function formatUKPhoneNumber(phoneNumber: string): string {
  return formatPhoneNumber(phoneNumber, {
    country: "UK",
    format: "international",
  });
}

interface EmailValidationOptions {
  allowedDomains?: string[];
  blockDisposable?: boolean;
  requireSchoolDomain?: boolean;
}

interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  normalizedEmail?: string;
}

// Common email patterns
export const EMAIL_PATTERNS = {
  // Basic email pattern
  BASIC: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Strict pattern with more validation
  STRICT:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  // School email pattern (ends with .edu or .ac.in)
  SCHOOL: /^[^\s@]+@[^\s@]+\.(edu|ac\.in)$/,
} as const;

// List of common disposable email domains
const DISPOSABLE_DOMAINS = [
  "tempmail.com",
  "throwawaymail.com",
  "mailinator.com",
  "guerrillamail.com",
  "temp-mail.org",
  "yopmail.com",
] as const;

// School domain for this application
const SCHOOL_DOMAIN = "hcsk.edu.in";

// Validate email
export function validateEmail(
  email: string,
  options: EmailValidationOptions = {},
): EmailValidationResult {
  const {
    allowedDomains = [],
    blockDisposable = true,
    requireSchoolDomain = false,
  } = options;

  // Basic format validation
  if (!EMAIL_PATTERNS.BASIC.test(email)) {
    return {
      isValid: false,
      error: "Invalid email format",
    };
  }

  // Normalize email (convert to lowercase)
  const normalizedEmail = email.toLowerCase().trim();
  const [localPart, domain] = normalizedEmail.split("@");

  // Check local part length
  if (localPart.length > 64) {
    return {
      isValid: false,
      error: "Local part of email is too long",
    };
  }

  // Check domain length
  if (domain.length > 255) {
    return {
      isValid: false,
      error: "Domain part of email is too long",
    };
  }

  // Check for disposable email domains
  if (blockDisposable && DISPOSABLE_DOMAINS.some((d) => domain.includes(d))) {
    return {
      isValid: false,
      error: "Disposable email addresses are not allowed",
    };
  }

  // Check for allowed domains
  if (allowedDomains.length > 0 && !allowedDomains.includes(domain)) {
    return {
      isValid: false,
      error: `Email domain must be one of: ${allowedDomains.join(", ")}`,
    };
  }

  // Check for school domain requirement
  if (requireSchoolDomain && domain !== SCHOOL_DOMAIN) {
    return {
      isValid: false,
      error: `Email must use the school domain: ${SCHOOL_DOMAIN}`,
    };
  }

  return {
    isValid: true,
    normalizedEmail,
  };
}

// Helper functions for common email validations
export function isValidEmail(email: string): boolean {
  return validateEmail(email).isValid;
}

export function validateSchoolEmail(email: string): EmailValidationResult {
  return validateEmail(email, {
    requireSchoolDomain: true,
    blockDisposable: true,
  });
}

export function validateStaffEmail(email: string): EmailValidationResult {
  return validateEmail(email, {
    allowedDomains: [SCHOOL_DOMAIN],
    blockDisposable: true,
  });
}

interface CurrencyFormatOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  notation?: 'standard' | 'compact';
  displaySymbol?: boolean;
}

// Common currency configurations
export const CURRENCY_CONFIGS = {
  INR: {
    symbol: '₹',
    locale: 'en-IN',
    decimals: 2
  },
  USD: {
    symbol: ',
    locale: 'en-US',
    decimals: 2
  },
  GBP: {
    symbol: '£',
    locale: 'en-GB',
    decimals: 2
  }
} as const;

// Format currency
export function formatCurrency(amount: number, options: CurrencyFormatOptions = {}): string {
  const {
    currency = 'INR',
    locale = CURRENCY_CONFIGS[currency as keyof typeof CURRENCY_CONFIGS]?.locale || 'en-IN',
    minimumFractionDigits = CURRENCY_CONFIGS[currency as keyof typeof CURRENCY_CONFIGS]?.decimals || 2,
    maximumFractionDigits = CURRENCY_CONFIGS[currency as keyof typeof CURRENCY_CONFIGS]?.decimals || 2,
    notation = 'standard',
    displaySymbol = true
  } = options;

  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
      notation
    }).format(amount);

    // Handle symbol display preference
    if (!displaySymbol) {
      const symbol = CURRENCY_CONFIGS[currency as keyof typeof CURRENCY_CONFIGS]?.symbol || '';
      return formatted.replace(symbol, '').trim();
    }

    return formatted;
  } catch (error) {
    // Fallback formatting
    const symbol = displaySymbol ? (CURRENCY_CONFIGS[currency as keyof typeof CURRENCY_CONFIGS]?.symbol || '') : '';
    return `${symbol}${amount.toFixed(minimumFractionDigits)}`;
  }
}

// Format currency in compact notation (e.g., 1K, 1M)
export function formatCompactCurrency(amount: number, currency: keyof typeof CURRENCY_CONFIGS = 'INR'): string {
  return formatCurrency(amount, {
    currency,
    notation: 'compact'
  });
}

// Helper functions for common currency formats
export function formatINR(amount: number, displaySymbol = true): string {
  return formatCurrency(amount, {
    currency: 'INR',
    displaySymbol
  });
}

export function formatUSD(amount: number, displaySymbol = true): string {
  return formatCurrency(amount, {
    currency: 'USD',
    displaySymbol
  });
}

export function formatGBP(amount: number, displaySymbol = true): string {
  return formatCurrency(amount, {
    currency: 'GBP',
    displaySymbol
  });
}

// Parse currency string back to number
export function parseCurrencyString(value: string): number {
  // Remove currency symbols and separators
  const cleaned = value.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
}
